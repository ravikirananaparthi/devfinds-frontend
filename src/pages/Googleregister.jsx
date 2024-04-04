import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import toast from "react-hot-toast";
import { Context, auth, googleProvider } from "../main";
import { signInWithPopup } from "firebase/auth";

function Googleregister() {
  const [programmingExperience, setProgrammingExperience] = useState("");
  const [learnedTechnologies, setLearnedTechnologies] = useState([]);
  const [newTechnology, setNewTechnology] = useState("");
  const { isAuthenticated, setAuth } = useContext(Context);
  const programmingExperienceOptions = [
    "0 years",
    "1 year",
    "2 years",
    "3 years",
    "4+ years",
  ];

  const handleProgrammingExperienceChange = (event) => {
    setProgrammingExperience(event.target.value);
  };

  const handleLearnedTechnologiesChange = (event) => {
    setNewTechnology(event.target.value);
  };

  const handleAddTechnology = () => {
    if (newTechnology.trim() !== "") {
      setLearnedTechnologies([...learnedTechnologies, newTechnology]);
      setNewTechnology("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response1 = await signInWithPopup(auth, googleProvider);
        const user = response1.user;
        console.log(user);
      const response = await axios.post(
        "https://devfinds-backend.onrender.com/api/v1/users/new",
        {
            name: user.displayName,
            email:user.email,
            password:"ravikiran456",
            image:user.photoURL,
          programmingExperience,
          learnedTechnologies,
        }
      );

      if (response.data) {
        toast.success(response.data.message);
        setAuth(true);
      } else {
        toast.error("Registration failed. Please try again.");
        setAuth(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Registration failed. Please try again.");
    }
  };

  const handleRemoveTechnology = (indexToRemove) => {
    setLearnedTechnologies((prevTechnologies) =>
      prevTechnologies.filter((_, index) => index !== indexToRemove)
    );
  };
  if (isAuthenticated) return <Navigate to={"/viewposts"} />;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-violet-100 to-emerald-100">
      <div className="p-8 rounded-lg bg-gray-700 max-w-md w-full">
        <FaUser size={50} className="bg-sul rounded-full p-1 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-center mb-4">Google Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-white">
              Programming Experience:
              <select
                value={programmingExperience}
                onChange={handleProgrammingExperienceChange}
                className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white text-black"
              >
                <option value="">Select</option>
                {programmingExperienceOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-white">
              Learned Technologies:
              <div className="flex items-center">
                <input
                  type="text"
                  value={newTechnology}
                  onChange={handleLearnedTechnologiesChange}
                  placeholder="Enter Learned Technologies"
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white text-black"
                />
                <button
                  type="button"
                  onClick={handleAddTechnology}
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
              <ul className="mt-2 flex flex-wrap">
                {learnedTechnologies.map((tech, index) => (
                  <li
                    key={index}
                    className="text-white flex items-center mr-2 mb-2 bg-gray-500 rounded-full px-3 py-1"
                  >
                    <span>{tech}</span>
                    <button
                      onClick={() => handleRemoveTechnology(index)}
                      className="ml-1 focus:outline-none"
                    >
                      <RxCross1 size={20} />
                    </button>
                  </li>
                ))}
              </ul>
            </label>
          </div>
          <button className="mx-16" type='submit'>
          <div className="border-2 bg-white border-gray-700 font-semibold px-5 py-2 rounded-lg flex items-center justify-center hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out">
            <img
              className="h-7 w-7 rounded-full border border-solid border-gray-500 mr-2"
              src="https://www.transparentpng.com/thumb/google-logo/google-logo-png-icon-free-download-SUF63j.png"
              alt=""
            />
            <span className="text-gray-700">Sign up with Google</span>
          </div>
        </button>
          <p className="text-center">
            <p className="text-blue-400">Already have an Account ?</p>
            <Link to="/login" className="text-white hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
      <div className="h-20 md:h-0"></div>
    </div>
  );
}

export default Googleregister;
