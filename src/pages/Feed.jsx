import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { GoComment } from "react-icons/go";
import { FaUserCircle, FaShare } from "react-icons/fa";
import { SlGraph } from "react-icons/sl";
import { FcLike } from "react-icons/fc";
import { CiHeart } from "react-icons/ci";
import { RiFireFill } from "react-icons/ri";
import { IoTrendingUp } from "react-icons/io5";
import ReactPlayer from "react-player";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import moment from "moment";
import UserList from "../components/UserList";
import { Context } from "../main";
import { FaHistory } from "react-icons/fa";
import Skeletonfeed from "../components/Skeletonfeed";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [tof, setTof] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(Context);
  const [postsFetched, setPostsFetched] = useState(false);

  const [trendingSearches, setTrendingSearches] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    // Fetch trending searches
    axios
      .get(
        "https://devfinds-backend.onrender.com/api/v1/users/trendingsearches",
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setTrendingSearches(response.data);
      })
      .catch((error) => {
        console.error("Error fetching trending searches:", error);
      });

    // Fetch search history
    axios
      .get("https://devfinds-backend.onrender.com/api/v1/users/searchhistory", {
        withCredentials: true,
      })
      .then((response) => {
        setSearchHistory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching search history:", error);
      });
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://devfinds-backend.onrender.com/api/v1/users/viewposts",
          {
            withCredentials: true, // Include credentials in the request
          }
        );

        setPosts(response.data);
        setFilteredPosts(response.data);
        console.log(response.data);
        setPostsFetched(true);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [postsFetched]);

  const handleSearchChange = (e) => {
    const query = e.target.value;

    console.log(query);
    setSearchQuery(query);
    filterPosts(query);
    filterUsers(query);
  };

  const filterPosts = (query) => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };
  const filterUsers = async (query) => {
    try {
      const usersResponse = await axios.get(
        "https://devfinds-backend.onrender.com/api/v1/users/findusers",
        {
          withCredentials: true, // Include credentials in the request
          params: { query }, // Send the search query as a query parameter
        }
      );
      const users = usersResponse.data;
      console.log(users);
      setFilteredUsers(users);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleButtonClick = (content) => {
    setSearchQuery(content);
    filterPosts(content);
  };

  const viewPost = async (postId) => {
    navigate(`/posts/${postId}`);
  };
  // Function to extract file name from URL
  const getPostFileName = (url) => {
    const segments = url.split("/");
    const lastSegment = segments[segments.length - 1];
    const fileName = decodeURIComponent(lastSegment.split("?")[0]);
    return fileName;
  };
  console.log(filteredUsers);
  console.log(searchHistory);
  console.log(trendingSearches);
  if (posts.length === 0) {
    return <Skeletonfeed />;
  }
  console.log(searchQuery.length);
  return (
    <div className="relative flex items-center justify-center min-h-screen  bg-gray-100 bg-gradient-to-br from-puk via-slate-400 to-puk">
      <div className="container p-4 mx-auto md:p-8 ">
        <div className="grid gap-4 md:grid-cols-3 ">
          <div className="md:col-span-1 h-auto md:h-[5in] lg:max-h-[5in] flex flex-col items-center backdrop-blur-lg bg-gray-700 rounded-xl sm:sticky top-0">
            <div className="bg-white rounded-full flex ml-3 mt-3 items-center sm:w-full md:w-[190px] md:m-3 lg:w-[350px]">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full py-2 px-3 bg-transparent cursor-pointer focus:outline-none text-black"
              />
              <IoSearch size={25} className="cursor-pointer text-black" />
            </div>
            <div className="flex w-full">
              {/* Left side for Trending Search */}
              <div className="w-1/2 border-r border-gray-600">
                <div className="p-4 text-white">
                  <div className="flex flex-row">
                    <RiFireFill size={25} className="mr-2 text-orange-500" />
                    <p className="text-sm lg:text-lg text-white">
                      Trending Search
                    </p>
                  </div>
                  {/* Display Trending Search here */}
                  {trendingSearches.map((item, index) => (
                    <p
                      key={index}
                      className="flex items-center mb-2 text-sm lg:text-lg rounded-lg hover:bg-slate-500"
                    >
                      <IoTrendingUp size={25} className="mr-2" />
                      <button onClick={() => handleButtonClick(item)}>
                        {item}
                      </button>
                    </p>
                  ))}
                </div>
              </div>

              <div className="w-1/2">
                <div className="p-4 text-white">
                  <div className="flex flex-row">
                    <FaHistory size={25} className="mr-2 text-green-500" />
                    <p className="text-sm md:text-lg text-white ">
                      Search History
                    </p>
                  </div>
                  {/* Display Search History here */}
                  {searchHistory.map((item, index) => (
                    <p
                      key={index}
                      className="flex items-center mb-2 rounded-lg hover:bg-slate-500 px-3"
                    >
                      <button onClick={() => handleButtonClick(item)}>
                        {item}
                      </button>
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-auto mb-9 flex justify-center">
              <button
                className="py-2 px-10 md:px-16 lg:px-36 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none"
                onClick={() => navigate("/posts")}
              >
                + Post
              </button>
            </footer>
          </div>

          <div className="p-4 rounded-xl shadow md:col-span-2  ">
            <h1 className="mb-4 text-2xl font-bold text-black">For You</h1>
            <UserList users={filteredUsers} />
            <div className="grid grid-cols-1 gap-4 text-sm md:text-xl ">
              {filteredPosts.map((post) => (
                <div
                  key={post._id}
                  className=" p-6 rounded-xl shadow-xl cursor-pointer bg-white"
                  onClick={() => viewPost(post._id)}
                >
                  <div className="flex items-center mb-2">
                    {post.user.image ? (
                      <img
                        src={post.user.image}
                        alt={post.user.name}
                        className="h-14 w-14 mr-2 rounded-full object-cover"
                      />
                    ) : (
                      <FaUserCircle className="h-14 w-14 mr-2" />
                    )}
                    <p className="text-black text-lg font-semibold">
                      {post.user.name}
                    </p>
                    <p className="text-gray-500 text-sm ml-auto">
                      {moment(post.createdAt).fromNow()}
                    </p>
                  </div>
                  <h2 className="text-lg font-semibold mb-2 text-black">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{post.description}</p>
                  {post.tof == "pic" && post.image && (
                    <div className="aspect-auto w-full mb-4 border border-solid rounded-lg border-gray-400  md:overflow-hidden">
                      <div className="">
                        <img
                          src={post.image}
                          alt="Post Image"
                          className="object-cover  mx-auto rounded-lg object-center"
                          width={400}
                          height={225}
                        />
                      </div>
                    </div>
                  )}
                  {post.tof === "vid" && post.image && (
                    <ReactPlayer
                      url={post.image}
                      controls={true}
                      width="100%"
                      height="full"
                      className="mb-4 rounded-lg overflow-hidden"
                      playing={false} // Auto play the video
                      loop={true} // Loop the video
                      muted={true} // Mute the video
                      pip={true} // Picture-in-Picture mode
                      config={{
                        youtube: {
                          playerVars: { showinfo: 1 }, // YouTube player options
                        },
                      }}
                    />
                  )}
                  {(post.tof === "pdf" || post.tof === "doc") && post.image && (
                    <a
                      href={post.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 hover:bg-slate-300 rounded mb-4 "
                    >
                      <img
                        src="https://static-00.iconduck.com/assets.00/folder-icon-512x410-jvths5l6.png"
                        alt="Folder Icon"
                        className="w-6 h-6"
                      />
                      <span>{getPostFileName(post.image)}</span>
                    </a>
                  )}

                  <div className="flex items-center justify-around">
                    <div className="flex items-center">
                      <CiHeart size={20} className="cursor-pointer mr-2" />
                      <p className="text-gray-500">{post.likes.length}</p>
                    </div>
                    <div className="flex items-center">
                      <GoComment
                        size={20}
                        className="text-blue-500 cursor-pointer hover:text-green-500 mr-2"
                      />
                      <p className="text-gray-500">{post.comments.length}</p>
                    </div>
                    <FaShare
                      size={20}
                      className="text-blue-500 cursor-pointer"
                      onClick={() => {}}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="h-20 md:h-0"></div>
      </div>
    </div>
  );
};

export default Feed;
