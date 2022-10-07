import React from "react";
import Video from "../../Images/video.mp4";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SoupKitchenIcon from "@mui/icons-material/SoupKitchen";
import Typography from "@mui/material/Typography";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import CallIcon from "@mui/icons-material/Call";
import RoomServiceIcon from "@mui/icons-material/RoomService";

function AboutUs() {
  return (
    <div className="about-us-main-cont">
      <div className="about-top-part">
        <video autoPlay className="video" loop>
          <source src={Video} type="video/mp4" />
        </video>
        <div className="video-overlay">
          <h1>Vegety</h1>
        </div>
      </div>
      <div className="about-middile-part">
    
        <div className="aboutus-middle-left-cont">
          <h3>ABOUT US</h3>
        </div>
        <div className="aboutus-middle-right-cont">
        <div className="paragraph-cont mt-3">
          <h3>Vegety</h3>
          <p>
            “We ought to be about something beyond moving chicken. We ought to
            be a piece of our client's lives and the networks in which we
            serve.”
          </p>
          <p>
            Our originator, settled on the choice to close on Sundays in 1946
            when he opened his first eatery in Hapeville, Georgia. Having worked
            seven days in eateries open 24 hours, Truett saw the significance of
            shutting on Sundays with the goal that he and his representatives
            could set aside one day to rest and love whether they pick - a
            training we maintain today.
          </p>
        </div>
        <div className="paragraph-cont mt-3">
          <h3>At the core of Atlanta</h3>
          <p>Building up a positive heritage in our very own lawn</p>

          <p>
            We're glad for our Georgia legacy, and all the more explicitly that
            we consider Atlanta the place where we grew up. Our central command,
            referred to inside the organization as the Support Center for eatery
            Operators, is found only outside of downtown.
          </p>

          <p>
            We are accomplices with the more prominent Atlanta business network
            in generous undertakings, attempting to animate the neighborhood
            economy through employment creation, just as driving stewardship
            activities planned to leave Georgia superior to anything we
            discovered it.
          </p>
        </div>

        <div className="paragraph-cont mt-3">
          <h3>Visit us</h3>
          <p>
            The 'Vegety' Backstage Tour offers a genuine narrating background
            roused by the entrancing history, culture, and estimations of the
            organization.
          </p>

          <p>
            From our neighborly individuals and delightful food to the
            irresistible “Eat Mor Chikin” Cows, you can investigate the
            remarkable 'Vegety' story with our guided strolling visit.
          </p>
        </div>
        </div>
        
      </div>

      <div className="about-awasome-features-part">

        <div className="awasome-left-cont">
          <Card
            sx={{
              width: "20vw",
              boxShadow:
                "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              minWidth: 275,
              margin : '0.5rem'
              
            }}
            className="awasome-card"
          >
            <CardContent>
              <EventAvailableIcon
                sx={{ fontSize: 50, color: "rgb(92,181,72)" }}
              
              />
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
                fontWeight="bold"
              >
                365 DAYS/YEAR
              </Typography>
              <Typography sx={{ fontSize: 12 }}>
                Never cook again! We really mean that. Our subscription plans
                include up to 365 days/year of coverage and you can also choose
                to order more flexbility if that is your style.
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              width: "20vw",
              boxShadow:
                "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              minWidth: 275,
            }}
            className="awasome-card"
          >
            <CardContent>
              <LocalShippingIcon
                sx={{ fontSize: 50, color: "rgb(92,181,72)" }}
              />
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
                fontWeight="bold"
              >
                30 MINUTES OR FREE
              </Typography>
              <Typography sx={{ fontSize: 12 }}>
                You're only twenty minutes away from your delicious and super
                healthy meals delievered right to your home. We work with the
                best chefs in each town to ensure that you're 100% happy.
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              width: "20vw",
              boxShadow:
                "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              minWidth: 275,
            
            }}
            className="awasome-card"
          >
            <CardContent>
              <SoupKitchenIcon sx={{ fontSize: 50, color: "rgb(92,181,72)" }} />
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
                fontWeight="bold"
              >
                100% ORGANIC
              </Typography>
              <Typography sx={{ fontSize: 12 }}>
                All our vegetables are fresh, organic and local. Animals are
                raised without added hormones or antibiotics. Good for your
                health, the environmnet, and it also tastes better!
              </Typography>
            </CardContent>
          </Card>

        </div>
        <div className="awasome-right-cont">
           <h3 className="text-center">AWESOME FEATURES</h3>
        </div>
      </div>

      <div className="howItWorks-cont">
        <div className="heading">
          <h3 className="text-center" style={{color : 'white'}}>HOW IT WORKS</h3>
        </div>
        <div className="instructions">
          <div className="card text-center my-aboutus-card " style={{width: "18rem", padding : '1rem'}}>
         
            <SubscriptionsIcon sx={{ fontSize: 70, color: "rgb(92,181,72)", display : 'flex', alignSelf : 'center'}}/>
            <div className="card-body">
              <h5 className="card-title">Login/Signup</h5>
              <p className="card-text" style={{ fontSize: 12 }}>
                Choose the subscription plan that fits your needs and sign up today.
              </p>
           
            </div>
          </div>

          <div className="card text-center my-aboutus-card aboutus-middle-card " style={{width: "18rem", padding : '1rem'}}>
        
            <CallIcon sx={{ fontSize: 70, color: "rgb(92,181,72)", display : 'flex', alignSelf : 'center'}}/>
            <div className="card-body">
              <h5 className="card-title">Place Order</h5>
              <p className="card-text" style={{ fontSize: 12 }}>
                Order your delicious meal using our website or mobile app, or you can even call us.
              </p>
           
            </div>
          </div>

          <div className="card text-center my-aboutus-card " style={{width: "18rem", padding : '1rem'}}>
          
            <RoomServiceIcon sx={{ fontSize: 70, color: "rgb(92,181,72)", display : 'flex', alignSelf : 'center'}}/>
            <div className="card-body">
              <h5 className="card-title">Enjoy your order</h5>
              <p className="card-text" style={{ fontSize: 12 }}>
              Enjoy your meal after less than 20 minutes. See you the next time!
              </p>
           
            </div>
          </div>
        </div>
      </div>

      <div className="image-gallery">
        <div className="heading">
          <h3 className="text-center">IMAGE GALLERY</h3>
        </div>
        <div className="images mt-5">
          <div className="row">
            <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
              <img
                src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg"
                className="w-100 shadow-1-strong rounded mb-4"
                alt="Boat on Calm Water"
              />

              <img
                src="https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=600"
                className="w-100 shadow-1-strong rounded mb-4"
                alt="Wintry Mountain Landscape"
              />
            </div>

            <div className="col-lg-4 mb-4 mb-lg-0">
              <img
                src="https://images.pexels.com/photos/541216/pexels-photo-541216.jpeg"
                className="w-100 shadow-1-strong rounded mb-4"
                alt="Mountains in the Clouds"
              />

              <img
                src="https://images.pexels.com/photos/763934/pexels-photo-763934.jpeg?auto=compress&cs=tinysrgb&w=600"
                className="w-100 shadow-1-strong rounded mb-4"
                alt="Boat on Calm Water"
              />
            </div>

            <div className="col-lg-4 mb-4 mb-lg-0">
              <img
                src="https://images.pexels.com/photos/299348/pexels-photo-299348.jpeg"
                className="w-100 shadow-1-strong rounded mb-4"
                alt="Waves at Sea"
              />

              <img
                src="https://images.pexels.com/photos/541216/pexels-photo-541216.jpeg?auto=compress&cs=tinysrgb&w=600"
                className="w-100 shadow-1-strong rounded mb-4"
                alt="Yosemite National Park"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
