import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom"; // Import Link component
import { Context, auth, server } from "../main";
import toast from "react-hot-toast";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import l from '../assets/ggg.png';
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
        `${server}users/login`,
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
  const handleClickGoogleSignIn = async (event) => {
    event.preventDefault();
  
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user; 
  
      const response = await axios.post(`${server}users/google-login`, {
        token: user.accessToken, 
      });
  
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        toast.success(response.data.message);
        setAuth(true); // Assuming setAuth is a state setter for authentication status
      } else {
        toast.error(response.data.error);
        setAuth(false);
      }
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      toast.error('Login failed. Please try again.');
    }
  };
  
  if (isAuthenticated) return <Navigate to={"/app/viewposts"} />;
  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <div className="p-8 rounded-lg bg-gray-700 w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">
              Email:
              <input
                type="text"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter Email"
                className="block mt-2 p-2 w-full border border-gray-300 rounded text-black bg-white focus:outline-none focus:border-gray-500"
              />
            </label>
          </div>
          <div>
            <label className="block">
              Password:
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter Password"
                className="block mt-2 p-2 w-full border border-gray-300 rounded text-black bg-white focus:outline-none focus:border-gray-500"
              />
            </label>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-400 to-cyan-400 hover:from-indigo-200 hover:to-cyan-200 text-white rounded-lg p-2 w-full"
          >
            Login
          </button>
          <button className="mx-auto mt-4" onClick={handleClickGoogleSignIn}>
          <div className="border-2 bg-white border-gray-700 font-semibold px-5 py-2 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out">
            <img
              className="h-7 w-7 rounded-full mr-2"
              src={l}
              alt=""
            />
            <span className="text-black">Sign In with Google</span>
          </div>
        </button>
        </form>
        <span className="pt-3">Don't have an account</span>
        <p className="text-blue-400 pt-3"> Create Account ?</p>
        <div className="flex flex-row mt-4 text-center mx-5 space-x-8 ">
        
          <p>
            <Link to="/app/register" className="text-white">
              or Sign Up
            </Link>
          </p> 
          <Link  to='/app/register/google'>
          <span className="underline">Google Registration -- </span>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;
