import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import Logo from "../../Images/logo.png";

function Footer() {
  return (
    <div className="footer-cont">
      <div className="cont-1 d-flex cont">
        <div className="footer-logo d-flex align-items-end">
          <img src={Logo} alt="" style={{ filter: "drop-shadow(0 0 0.75rem rgb(92,181,72))" }}/>
          <h2>
            Vege<span style={{ color: "rgb(92,181,72)" }}>ty</span>
          </h2>
        </div>
        <div className="middle-section" style={{color : 'rgb(92, 92, 92)', marginTop : '1.5rem'}}>
          Champ de Mars, 5 Avenue <br />
          Anatole France, 75007 Paris, <br />
          France
        </div>

        <div className="icons-cont">
          <FacebookIcon className="icon"/>
          <InstagramIcon className="icon"/>
          <TwitterIcon className="icon"/>
        </div>
      </div>
      <div className="cont-2 cont">
        <h6>Information</h6>
        <span>About Us</span>
        <span>More Search</span>
        <span>Testinomials</span>
        <span>Events</span>
      </div>
      <div className="cont-3 cont">
        <h6>Helpful Links</h6>
        <span>Service</span>
        <span>Support</span>
        <span>Terms & Conditions</span>
        <span>Privacy</span>
      </div>
      <div className="cont-4 cont">
        <h6>Our Menu</h6>
        <span>Special</span>
        <span>Popular</span>
        <span>Categories</span>
        
      </div>
    </div>
  );
}

export default Footer;
