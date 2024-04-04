import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context, server } from "./main";
import Posts from "./pages/Posts";
import Feed from "./pages/Feed";
import PostDetail from "./components/PostDetail";
import Userprofile from "./components/Userprofile";
import Notifications from "./components/Notifications";
import { io } from "socket.io-client";
import Dm from "./pages/Dm";
import Bottom from "./components/Bottom";
import Proske from "./components/Proske";
import Googleregister from "./pages/Googleregister";

const socket = io("https://devfinds-backend.onrender.com/", {
  reconnection: true,
});



function App(props) {
  const { isAuthenticated, setUser, setAuth, setLoader } = useContext(Context);
  const [notifications, setNotifications] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  useEffect(() => {
    setLoader(true);
    axios
      .get(`https://devfinds-backend.onrender.com/api/v1/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setAuth(true);
        setLoader(false);
      })
      .catch((error) => {
        setUser({});
        setAuth(false);
        setLoader(false);
      });
  }, [isAuthenticated]);
  return (
    <Router>
      <Nav toggleTheme={toggleTheme}/>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/viewposts" element={<Feed />} />
        <Route path="/posts/:postId" element={<PostDetail />} />
        <Route path="/userprofile/:userid" element={<Userprofile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/message" element={<Dm />} />
        <Route path="/register/google" element={<Googleregister />} />
        
      </Routes>
      <Bottom className="md:hidden" />
      <Toaster />
    </Router>
  );
}

export default App;
