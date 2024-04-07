import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // functions
  async function loginUser(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", { email, password });
      if (data.error) {
        toast.error(data.error);
      } else {
        setEmail("");
        setPassword("");
        toast.success("Login Sucessfull");
        navigate("/dashboard");
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  }

  // other code, hooks

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
      <h1 className="text-3xl font-semibold">Login</h1>

      <form
        onSubmit={loginUser}
        className="border-2 border-zinc-300 rounded-md w-full sm:w-[60vw] lg:w-[40vw] px-5 sm:px-10  py-5 flex flex-col items-center gap-4"
      >
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
          value="Login"
        />
      </form>
    </div>
  );
}

export default Login;
