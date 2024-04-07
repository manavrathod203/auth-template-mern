import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // functions
  async function registerUser(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/register", { name, email, password });
      if (data.error) {
        toast.error(data.error);
      } else {
        setName("");
        setEmail("");
        setPassword("");
        toast.success("User registered sucessfully");
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
    }
  }

  // other hooks, code

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-5 px-5">
      <div className="flex  gap-5">
        <Link
          to="/"
          className="bg-indigo-600 text-white font-semibold rounded-md px-4 py-2 text-lg sm:text-xl"
        >
          Home
        </Link>{" "}
        
        <Link
          to="/login"
          className="bg-indigo-600 text-white font-semibold rounded-md px-4 py-2 text-lg sm:text-xl"
        >
          Login
        </Link>{" "}
        
        <Link
          to="/register"
          className="bg-indigo-600 text-white font-semibold rounded-md px-4 py-2 text-lg sm:text-xl"
        >
          Register
        </Link>
      </div>

      <h1 className="text-3xl font-semibold">Register</h1>
      <form
        onSubmit={registerUser}
        className="border-2 border-zinc-300 rounded-md w-full sm:w-[60vw] lg:w-[40vw] px-5 sm:px-10  py-5 flex flex-col items-center gap-4"
      >
        <input
          type="text"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          className="border-2 border-zinc-300 px-3 py-2 text-lg sm:text-xl  w-full rounded-md"
          placeholder="name"
        />{" "}
        
        <input
          type="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          className="border-2 border-zinc-300 px-3 py-2 text-lg sm:text-xl  w-full rounded-md"
          placeholder="email"
        />{" "}
        
        <input
          type="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          className="border-2 border-zinc-300 px-3 py-2 text-lg sm:text-xl  w-full rounded-md"
          placeholder="password"
        />{" "}
        
        <input
          type="submit"
          className="bg-indigo-600 text-white font-semibold rounded-md px-4 py-2 text-lg sm:text-xl"
          value="Register"
        />
      </form>
    </div>
  );
}

export default Register;
