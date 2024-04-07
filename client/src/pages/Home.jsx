import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-5 px-5">
      <div className="flex items-center justify-center gap-4">
        <Link to="/login" className="bg-indigo-600 text-white font-semibold rounded-md px-4 py-2 text-lg sm:text-xl">Login</Link> <br />
        <Link to="/register" className="bg-indigo-600 text-white font-semibold rounded-md px-4 py-2 text-lg sm:text-xl">Register</Link>
      </div>
      <h1 className=" text-center text-3xl font-semibold">Basic Authentication - MERN stack</h1>
      <p className="text-center text-md sm:text-xl w-full sm:w-[80vw] md:w-[70vw] lg:w-[55vw]">Utilized Bcrypt for password hashing, JWT for signing cookie and tracking the user throughout the website and lastly utilized react-hot-toast to notify status of the action performed.</p>
    
    </div>
  );
}

export default Home;
