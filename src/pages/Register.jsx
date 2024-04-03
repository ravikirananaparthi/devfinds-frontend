import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaUser } from "react-icons/fa";
import { Context } from "../main";
import { RxCross1 } from "react-icons/rx";
function Registration() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(programmingExperience);
    try {
      const response = await axios.post(
        `https://devfinds-backend.onrender.com/api/v1/users/new`,
        {
          name: fullName,
          email,
          password,
          programmingExperience,
          learnedTechnologies,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
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
      console.error(error); // Log the error object
      toast.error("Registration failed. Please try again.");
      setAuth(false);
    }
  };

  const handleRemoveTechnology = (indexToRemove) => {
    setLearnedTechnologies((prevTechnologies) => {
      // Create a new array excluding the technology at the specified index
      const updatedTechnologies = prevTechnologies.filter(
        (_, index) => index !== indexToRemove
      );
      return updatedTechnologies;
    });
  };
  console.log(programmingExperience, learnedTechnologies);
  if (isAuthenticated) return <Navigate to={"/viewposts"} />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-violet-100 to-emerald-100">
      <div className="p-8 rounded-lg bg-gray-700 max-w-md w-full">
        <FaUser size={50} className="bg-sul rounded-full p-1 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-center mb-4">Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-white">
              Full Name:
              <input
                type="text"
                value={fullName}
                onChange={handleFullNameChange}
                placeholder="Enter Full Name"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white text-black"
              />
            </label>
            <label className="block text-white">
              Email:
              <input
                type="text"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter Email"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white text-black"
              />
            </label>
            <label className="block text-white">
             Set Password:
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter Password"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white text-black"
              />
            </label>
          </div>
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
          <button
            type="submit"
            className="w-full p-2 text-white rounded-lg bg-gradient-to-r from-indigo-400 to-cyan-400 hover:from-indigo-200 hover:to-cyan-200"
          >
            Register
          </button>
          <p className="text-center">
            <Link to="/login" className="text-white">
              or Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;
