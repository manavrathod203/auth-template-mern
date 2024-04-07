import React from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function Dashboard() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  async function logout(){
    try {
      const { data } = await axios.get("/logout");
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Logout Sucessfull");
        navigate("/login");
        // window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  }

  return <div className="flex flex-col items-center justify-center w-full min-h-screen">
    <h1 className="text-xl sm:text-3xl font-semibold">Dashboard</h1>
    <div className="flex flex-col "></div>
    {!!user && (
      <>
      
      <h2 className="text-4xl sm:text-6xl font-semibold mt-8 capitalize">Hello, {user.name}</h2>
      <p className="mt-5 text-md sm:text-xl">Your registered email id is</p>
      <p className="mt-2 text-md sm:text-xl bg-indigo-600 text-white px-3 py-1">{user.email}</p>
      <button onClick={logout} className="mt-10 bg-red-600 text-white font-semibold rounded-md px-4 py-2 text-lg sm:text-xl">Logout</button>
      </>
    )}
  </div>;
}

export default Dashboard;
