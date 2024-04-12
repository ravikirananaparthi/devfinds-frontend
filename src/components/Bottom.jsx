import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { GoHomeFill } from "react-icons/go";
import { BsBellFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../main";

export default function Bottom() {
  const { isAuthenticated } = React.useContext(Context);
  const [value, setValue] = React.useState("Home");
  const location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="fixed bottom-0 w-full z-10  md:hidden ">
      {/* Display only on mobile screens */}
      <BottomNavigation
        sx={{ width: "100%" }}
        value={value}
        onChange={handleChange}
        style={{ justifyContent: "space-around" }}
        className="bg-gradient-to-r from-slate-900 to-slate-700" // Apply flex space around between icons
      >
        <Link to={"/app/viewposts"}>
          <BottomNavigationAction
            label="Home"
            value="Home"
            icon={
              <GoHomeFill
                size={25}
                className={
                  location.pathname === "/viewposts"
                    ? "text-blue-500"
                    : "text-white"
                }
              />
            }
          />
        </Link>
        <Link to={"/app/notifications"}>
          <BottomNavigationAction
            label="Notifications"
            value="Bell"
            icon={
              <BsBellFill
                size={25}
                className={
                  location.pathname === "/notifications"
                    ? "text-blue-500"
                    : "text-white"
                }
              />
            }
          />
        </Link>
        <Link to={"/app/message"}>
          <BottomNavigationAction
            label="Messages"
            value="Messages"
            icon={
              <IoMail
                size={25}
                className={
                  location.pathname === "/message"
                    ? "text-blue-500"
                    : "text-white"
                }
              />
            }
          />
        </Link>
      </BottomNavigation>
    </div>
  );
}
