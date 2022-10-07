import React from 'react'
import TopPlans from './TopPlans';
import Testonomials from './Testonomials';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Img1 from "../../Images/img2.png";
import Img2 from "../../Images/img3.png";
import Img3 from "../../Images/img4.png";
import "../style files/Header.css";
import Img6 from "../../Images/img6.JPG";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Fresh from '../../Images/fresh1.png';
import BannerImage from '../../Images/download.png';

function Banner() {
  return (
        <div className="banner-cont">
            <div className="banner-left-cont">
              <div className="banner-information">
               
                  <h1>
                    Healthy food to
                    live a healthier life in the future
                  </h1>
              
                  <span>
                  Enjoy a healthy life by eating helathy foods that have
                  extraordinary flavors that make your life healthier for today
                  and in the future
                  </span>

              </div>
            </div>
            <div className="banner-right-cont">
            <img src={BannerImage} alt="BannerImage" style={{ filter: "drop-shadow(0 0 0.75rem rgb(92,181,72))" }} />
            </div>
        </div>

  );
}


function ChefDetails() {

  const list = [
    "A guaranteed delicious meal",
    "Food is guaranteed hygienic",
    "Cooked quickly",
  ];

  return (
    <div className="chef-details-cont">
      <div className="chef-left-cont">
        <div className="content" >
          <h1>
            Cooked by the <br /> Best Chefs in the <br /> World
          </h1>
          <span>
            We present the best chefs to cook your food  <br /> to make the food
            taste extraordinary
          </span>
          <div className="chef-left-list" style={{ marginTop: "1rem" }}>
            {list.map((item, index) => (
              <div className="list" key={index}>
                <CheckBoxIcon sx={{ color: "rgb(92,181,72)" }} />
                <span style={{ marginLeft: "0.8rem", color: "black" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="chef-right-cont">
        <img src={Img6} alt="" />
      </div>
    </div>
  );
}


function SpecialDish() {

  const content = [
    {
      img: Img1,
      heading: "Green Salad",
      desc: "A green salad filled with cabbage, mustard greens, and added chicken pieces fro a more delicious.",
    },
    {
      img: Img2,
      heading: "Beef Salad",
      desc: "A salad combined with a delicious cut of bacon and mixed with tasty and fresh sesome oil.",
    },
    {
      img: Img3,
      heading: "Nut Salad",
      desc: "The salad is mixed with various types of savory nuts so that it adds a delicious and addictive taste.",
    },
  ];


  return (
    <div className="special-dish-cont">
      <div className="special-top-cont">
        <h1 style={{color : "rbg(92,181,72)"}}>Our Special Dish</h1>
        <span>Made with premium ingredients.</span>
      </div>
      <div className="special-bottom-cont">
        <div className="my-card card " style={{ width: "18rem" }}>
          <img src={content[0].img} className="card-img-top" alt="..." />
          <div className="card-body text-center">
            <h5 className="card-title">{content[0].heading}</h5>
            <p className="card-text">{content[0].desc}</p>
          </div>
        </div>

        <div className="my-card card middle-card pt-2" style={{ width: "18rem" }}>
          <img src={content[1].img} className="card-img-top" alt="..." />
          <div className="card-body text-center">
            <h5 className="card-title">{content[1].heading}</h5>
            <p className="card-text">{content[1].desc}</p>
          </div>
        </div>

        <div className="my-card card " style={{ width: "18rem" }}>
          <img src={content[2].img} className="card-img-top" alt="..." />
          <div className="card-body text-center">
            <h5 className="card-title">{content[2].heading}</h5>
            <p className="card-text">{content[2].desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function FreshVegetableEveryDay() {
  return (
    <div className='fved-cont'>
        <div className="fved-left-cont">
            <img src={Fresh} alt="" style={{ filter: "drop-shadow(0 0 0.75rem crimson)" }}/>
        </div>
        <div className="fved-right-cont">
            <h1>Fresh Vegetables <br /> Every Day</h1>
            <p>We present various types of fresh vegetables <br /> and taken directly from the farmer's garden <br /> especially for you.</p>
            <div className="learn-more-btn">
                Learn More <ArrowRightIcon />
            </div>
        </div>
    </div>
  )
}

function Home() {
  return (
    <>
    
        <Banner />
        <SpecialDish />
        <FreshVegetableEveryDay />
        <TopPlans />
        <ChefDetails />
        <Testonomials />
    
    </>
  )
}

export default Home