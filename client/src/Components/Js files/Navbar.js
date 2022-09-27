import * as React from "react";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Logo from "../../Images/logo.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const drawerWidth = 240;
const navItems = [
  { Home: "/" },
  { About: "/aboutus" },
  { Plans: "/allPlans" },
  { Login_Signup: "/loginSignup" },
];

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [display, setDisplay] = useState(false);
  const [message, setMessage] = useState(null);
  const [displayProp, setDisplayProp] = useState("none");
  let [currEle, setCurrEle] = useState("HOME");
  const [enable, setEnable] = useState(false);

  const data = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const history = useHistory();

  React.useEffect(() => {
    if (data.name) {
      setEnable(true);
    }
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    setDisplay(!display);
    const response = await axios.get("/user/logout");
    setMessage(response.data.message);
    setDisplayProp("block");
    setTimeout(() => {
      setDisplayProp("none");
    }, 2000);

    const dis = () => dispatch({ type: "logout", payload: "Guest" });
    dis();

    history.push("/");
    setEnable(false);
  };

  const handleProfile = () => {
    setDisplay(!display);
    history.push("/profile");
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", background: "#f6fbf8" }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        <img src={Logo} alt="Vegety" />
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              sx={{
                textAlign: "center",
                backgroundColor:
                  currEle == Object.keys(item).toString().toUpperCase()
                    ? "rgb(92,181,72)"
                    : "transparent",
              }}
            >
              <ListItemText
                primary={Object.keys(item).toString()}
                onClick={(e) => {
                  history.push(Object.values(item).toString());
                  setCurrEle(e.currentTarget.innerText);
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}

        <Button
          key="User"
          sx={{ color: "rgb(92,181,72)" }}
          onClick={() => {
            data.name ? setDisplay(!display) : setDisplay(false);
          }}
        >
          {data.name ? data.name : data}
        </Button>

        <div style={{ display: data.name ? "block" : "none" }}>
          <div
            className="profile menu-item justify-content-center"
            onClick={handleProfile}
          >
            <AccountCircleIcon />
            Profile
          </div>
          <div
            className="logout menu-item justify-content-center"
            onClick={handleLogout}
          >
            <LogoutIcon />
            Logout
          </div>
        </div>

        <br />
        <Button
          sx={{ background: "rgb(92,181,72)", color: "black" }}
          onClick={() => {
            data.name
              ? alert("User is already logged in, First logout user")
              : history.push("/loginSignup");
          }}
        >
          Admin
        </Button>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" sx={{ background: "#f6fbf8", color: "black" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex", md: "flex" },
              alignItems: "flex-end",
            }}
          >
            <img src={Logo} alt="" />
            <h2>
              Vege<span style={{ color: "rgb(92,181,72)" }}>ty</span>
            </h2>
          </Typography>
          <Box
            sx={{
              display: { xs: "none", sm: "block", md: "flex" },
              color: "black",
            }}
          >
            {navItems.map((item, index) => (
              <Button
                key={index}
                sx={{
                  color: "black",
                  backgroundColor:
                    currEle == Object.keys(item).toString().toUpperCase()
                      ? "rgb(92,181,72)"
                      : "transparent",
                }}
                onClick={(e) => {
                  history.push(Object.values(item).toString());
                  setCurrEle(e.currentTarget.innerText);
                }}
              >
                {Object.keys(item).toString()}
              </Button>
            ))}

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
              className="menu-cont"
              style={{ display: display === true ? "block" : "none" }}
            >
              <div className="profile menu-item" onClick={handleProfile}>
                <AccountCircleIcon />
                Profile
              </div>
              <div className="logout menu-item" onClick={handleLogout}>
                <LogoutIcon />
                Logout
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
            >
              Admin
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none", md: "flex" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <div
        className="alert alert-success text-center"
        role="alert"
        style={{
          width: "30%",
          position: "absolute",
          top: "6rem",
          left: "calc((100% - 30%)/2)",
          display: displayProp,
        }}
      >
        {message}
      </div>
    </Box>
  );
}

Navbar.propTypes = {
  window: PropTypes.func,
};

export default Navbar;
