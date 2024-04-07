// imports
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const User = require('./models/User.js');
const cookieParser = require('cookie-parser');


const app = express();
const PORT = process.env.PORT || 5000;


// middleware -----------------------------------------
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));



// mongoose code --------------------------------------
mongoose.connect(process.env.MONGO_URL);




// endpoints ------------------------------------------
app.get('/', (req, res) => {
    res.json('server is working');
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // check if user exist
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ error: 'No user found' });
        }

        // check password
        const passMatch = await bcrypt.compare(password, user.password);
        if (passMatch) {
            jwt.sign({ email: user.email, id: user._id, name: user.name }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(user);
            });
        } else {
            res.json({ error: 'Wrong password' })

        }
    } catch (e) {
        console.log(e);
    }

});

app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check name (optional)
        if (!name) {
            return res.json({ error: 'Name is required' })
        }
        // check password (optional)
        if (!password || password.length < 6) {
            return res.json({ error: 'Password is required and should be at least characters long' })
        }
        // check if email already exists
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({ error: 'User already exist' })
        }

        // create user in database
        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
        });

        return res.json(user);
    } catch (e) {
        console.log(e);
    }
});

// Logout
app.get('/logout', (req, res) => {
    try {
        res.clearCookie('token').sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: "Unable to logout" });
    }});


app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user);
        })
    } else {
        res.json(null);
    }
});


// helper functions -----------------------------------

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            })
        })
    })
}

function comparePasswords(password, hashed) {
    return bcrypt.compare(password, hashed)
}




// start server ----------------------------------------
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
