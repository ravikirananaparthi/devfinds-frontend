import React, { useContext, useEffect, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { FaRegBell, FaUserCircle } from "react-icons/fa";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import axios from "axios"; // Import axios for making HTTP requests
import { Link, Navigate } from "react-router-dom";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import logoImage from "../assets/logo2.png";
import Image from "../assets/logo.png";
import { TiHome } from 'react-icons/ti';
import { FaRegMessage } from "react-icons/fa6";

const Navbar = (props) => {
  const { user, isAuthenticated, setAuth, loader, setLoader } =
    useContext(Context);
  const [isOpen, setIsOpen] = useState(false);

  const logOutHandler = async () => {
    setLoader(true);
    try {
      await axios.get(`${server}users/logout`, {
        withCredentials: true,
      });
      toast.success("Logged Out Successfully");
      setAuth(false);
      setLoader(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setAuth(false);
      setLoader(false);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-gradient-to-r from-guv/60 to-jagaur/90 bg-opacity-30 backdrop-filter backdrop-blur-lg p-3">
      <div className="mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to={"/app/viewposts"}>
                <img src={logoImage} alt="Logo" className="h-10 w-24" />
            </Link>
          </div>
          <label className="md:hidden btn btn-circle swap swap-rotate bg-gray-700/10 hover:bg-black/10 border-none text-white z-20">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" onClick={toggleMenu} />

            {/* hamburger icon */}
            <svg
              className="swap-off fill-current z-20"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>

            {/* close icon */}
            <svg
              className="swap-on fill-current z-20"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </label>



          <div className="hidden md:flex justify-between items-center space-x-10">
            {isAuthenticated && (
              <>
                <Link to="/app/viewposts">
                  <button className="text-white hover:bg-gradient-to-r hover:from-amber-200 hover:to-yellow-500 rounded px-4 py-2 hover:text-black transition duration-300">
                    Home
                  </button>
                </Link>
                <Link to={"/app/notifications"}>
                  <button className="text-amber-600 hover:bg-gradient-to-r hover:from-amber-200 hover:to-yellow-500 hover:text-white flex items-center rounded-full p-2">
                    <FaRegBell size={20} />
                  </button>
                </Link>
                <Link to="/app/message">
                  <button className="text-white hover:bg-gradient-to-r hover:from-amber-200 hover:to-yellow-500 rounded px-4 py-2 hover:text-black  transition duration-300">
                    <BiSolidMessageSquareDetail size={30} />
                  </button>
                </Link>
              </>
            )}

            {isAuthenticated ? (
              <button
                onClick={logOutHandler}
                className="bg-gradient-to-r from-amber-200 to-yellow-500 text-black rounded-md px-4 py-2 transition duration-300 ease-in-out hover:from-amber-100 hover:to-yellow-300"
              >
                Logout
              </button>
            ) : (
              <Link to={"/app/login"}>
                <button className="bg-gradient-to-r from-amber-200 to-yellow-500 text-black rounded-md px-4 py-2 transition duration-300 ease-in-out hover:from-amber-200 hover:to-yellow-500">
                  Login
                </button>
              </Link>
            )}

            {isAuthenticated && (
              <Link to="/app/profile" className="">
                {user.image ? (
                  <img
                    src={user.image}
                    className="rounded-full object-cover "
                    alt="User Profile"
                    style={{ width: "40px", height: "40px" }}
                  />
                ) : (
                  <FaUserCircle className="icon" size={40} />
                )}
              </Link>
            )}
          </div>
        </div>
        {/*large screens*/}


        {/* Mobile menu */}

        <div className={`md:hidden fixed right-0 top-0 bottom-0 h-screen w-[300px] bg-black border-b transition-transform duration-400 ${isOpen ? 'transform translate-x-0' :'transform translate-x-full'}`}>
          <img src={Image} alt="Logo" className="object-cover" />
          <div className="flex flex-col items-center space-y-5">
            <Link to="/app/viewposts" onClick={closeSidebar} className="mr-7">
            <button className="text-white flex items-center">
                <TiHome size={25}/> <span className="ml-1">Home</span>
            </button>
            </Link>
            <Link to="/app/profile" className="nav-profile flex flex-row" onClick={closeSidebar}>
              {user.image ? (
                <img
                  src={user.image}
                  className="rounded-full object-cover"
                  alt="User Profile"
                  style={{ width: "40px", height: "40px" }}
                />
              ) : (
                <FaUserCircle size={25} />
              )}
              <span className="text-white ml-1">My Profile</span>
            </Link>
            <Link to="/app/notifications" onClick={closeSidebar} className="ml-4">
              <button className="text-white flex items-center">
                <FaRegBell size={23}/> <span className="ml-1">Notifications</span>
              </button>
            </Link>
            <Link to="/app/message" onClick={closeSidebar } className="">
              <button className="text-white flex items-center">
              <FaRegMessage size={20}/><span className="ml-1">Messages</span>
              </button>
            </Link>

            {isAuthenticated && (
              <button
                onClick={logOutHandler}
                className="bg-lime-400 hover:bg-lime-500 text-gray-900 rounded-md px-4 py-2 transition duration-300 ease-in-out"
              >
                Logout
              </button>
            )}
            {!isAuthenticated && (
              <Link to={"/app/login"} onClick={closeSidebar}>
                <button className="bg-lime-400 hover:bg-lime-500 text-gray-900 rounded-md px-4 py-2 transition duration-300 ease-in-out">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      
      </div>
    </nav>
  );
};

export default Navbar;
