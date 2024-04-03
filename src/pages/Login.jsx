import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom"; // Import Link component
import { Context, server } from "../main";
import toast from "react-hot-toast";
import axios from "axios";

function Login() {
  // Define state variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Update email state
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Update password state
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { isAuthenticated, setAuth, loader, setLoader} = useContext(Context);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);
    try {
      const { data } = await axios.post(
        `https://devfinds-backend.onrender.com/api/v1/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setAuth(true);
      setLoader(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoader(false);
      setAuth(false);
    }
  };
  if (isAuthenticated) return <Navigate to={"/viewposts"} />;
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-violet-100 to-emerald-100 text-white">
      <div className="p-8 rounded-lg bg-gray-700 w-[450px] h-[400px] z--50">
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Email:
              <input
                type="text"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter Email"
                className="block mt-2 p-2 px-3 w-full border  border-gray-300 rounded text-black bg-white"
              />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter Password"
                className="block mt-2 p-2 px-3 w-full border border-gray-300 rounded text-black bg-white"
              />
            </label>
            <br />
          </div>
          <button
            type="submit"
            className="mt-4 bg-gradient-to-r from-indigo-400 to-cyan-400 hover:from-indigo-200 hover:to-cyan-200 text-white rounded-lg p-2 w-full"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          <p className="text-center">
            <Link to="/register" className="text-white">
              or Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
