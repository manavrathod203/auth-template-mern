import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { UserContextProvider } from "../context/UserContext";
import Dashboard from "./pages/Dashboard";

axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <UserContextProvider>
        <BrowserRouter>
          <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/dashboard" Component={Dashboard} />

          </Routes>
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
