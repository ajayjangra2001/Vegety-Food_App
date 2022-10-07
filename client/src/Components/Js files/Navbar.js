import React from "react";
import Logo from "../../Images/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";

function Navbar() {
  const [display, setDisplay] = useState(false);
  const [enable, setEnable] = useState(false);
  const [slideDisplay, setSlideDisplay] = useState(false);

  const data = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const history = useHistory();

  React.useEffect(() => {
    if (data.name) {
      setEnable(true);
    }
  });

  const handleLogout = async () => {
    setDisplay(!display);
    const response = await axios.get("/user/logout");
    alert(response.data.message);
    const dis = () => dispatch({ type: "logout", payload: "Guest" });
    dis();
    history.push("/");
    setEnable(false);
  };

  const handleProfile = () => {
    setDisplay(!display);
    history.push("/profile");
  };

  return (
    <div className="nav-bar-cont">
      <div className="nav-left-part">
        <img
          src={Logo}
          alt="Logo"
          style={{ filter: "drop-shadow(0 0 0.75rem rgb(92,181,72))" }}
        />
        <h2>
          Vege<span style={{ color: "rgb(92,181,72)" }}>ty</span>
        </h2>
      </div>
      <div className="nav-middle-part">
        <NavLink exact to="/" className="link" activeClassName="active-class">
          HOME
        </NavLink>
        <NavLink
          exact
          to="/aboutus"
          className="link"
          activeClassName="active-class"
        >
          ABOUT
        </NavLink>
        <NavLink
          exact
          to="/plan/allPlans"
          className="link"
          activeClassName="active-class"
        >
          PLANS
        </NavLink>
        <NavLink
          exact
          to="/loginSignup"
          className="link"
          activeClassName="active-class"
        >
          LOGIN/SIGNUP
        </NavLink>

        <div className="user-dropdownItems">
          <Button
            key="User"
            sx={{ color: "rgb(92,181,72)" }}
            onClick={() => {
              data.name ? setDisplay(!display) : setDisplay(false);
            }}
          >
            {data.name ? data.name : data}
          </Button>

          <div
            style={{ display: display ? "flex" : "none" }}
            className="user-menu-items"
          >
            <div className="user-menu-item" onClick={handleProfile}>
              <AccountCircleIcon />
              Profile
            </div>
            <div className="user-menu-item" onClick={handleLogout}>
              <LogoutIcon />
              Logout
            </div>
          </div>
        </div>

        <Button
          sx={{
            background: "rgb(92,181,72)",
            color: "black",
            marginLeft: "0.8rem",
          }}
          onClick={() => {
            data.name
              ? alert("User is already logged in, First logout user")
              : history.push("/loginSignup");
          }}
          disabled={enable}
          className="adminBtn"
        >
          Admin
        </Button>
      </div>
      <div className="nav-right-part">
        <MenuIcon
          sx={{ fontSize: "2.5rem", cursor: "pointer" }}
          onClick={() => setSlideDisplay(!slideDisplay)}
        />
      </div>

      {/* Slider */}

      <div
        className="nav-bar-slider-cont"
        style={{ display: slideDisplay ? "flex" : "none" }}
      >
        <div className="nav-bar-slider-cont-top-part">
          <div className="slider-left-part">
            <img
              src={Logo}
              alt="Logo"
              style={{ filter: "drop-shadow(0 0 0.75rem rgb(92,181,72))" }}
            />
            <h2>
              Vege<span style={{ color: "rgb(92,181,72)" }}>ty</span>
            </h2>
          </div>
          <div className="slider-right-part">
            <CloseIcon
              sx={{ fontSize: "2rem", cursor: "pointer" }}
              onClick={() => setSlideDisplay(!slideDisplay)}
            />
          </div>
        </div>

        <div className="nav-bar-slider-cont-bottom-part">
          <NavLink exact to="/" className="link" activeClassName="active-class">
            HOME
          </NavLink>
          <NavLink
            exact
            to="/aboutus"
            className="link"
            activeClassName="active-class"
          >
            ABOUT
          </NavLink>
          <NavLink
            exact
            to="/plan/allPlans"
            className="link"
            activeClassName="active-class"
          >
            PLANS
          </NavLink>
          <NavLink
            exact
            to="/loginSignup"
            className="link"
            activeClassName="active-class"
          >
            LOGIN/SIGNUP
          </NavLink>

          <div className="user-dropdownItems">
            <Button
              key="User"
              sx={{ color: "rgb(92,181,72)" }}
              onClick={() => {
                data.name ? setDisplay(!display) : setDisplay(false);
              }}
            >
              {data.name ? data.name : data}
            </Button>

            <div
              style={{ display: display ? "flex" : "none" }}
              className="user-menu-items"
            >
              <div className="user-menu-item" onClick={handleProfile}>
                <AccountCircleIcon />
                Profile
              </div>
              <div className="user-menu-item" onClick={handleLogout}>
                <LogoutIcon />
                Logout
              </div>
            </div>
          </div>

          <Button
            sx={{
              background: "rgb(92,181,72)",
              color: "black",
              marginLeft: "0.8rem",
            }}
            className="adminBtn"
            onClick={() => {
              data.name
                ? alert("User is already logged in, First logout user")
                : history.push("/loginSignup");
            }}
            disabled={enable}
          >
            Admin
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
