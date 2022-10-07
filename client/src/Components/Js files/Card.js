import React from "react";
import "../style files/card.css";
import CardImage from "../../Images/cardImage.jpg";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DiscountIcon from "@mui/icons-material/Discount";
import axios from "axios";
import { useHistory } from 'react-router-dom';

function Card({ props }) {

  const history = useHistory();

  const handleBuy = async (event) => {
    const id = event.currentTarget.parentNode.parentNode.parentNode.getAttribute("id");
    const response = await axios.get(`/plan/${id}`);
    if (response.data.data) history.push(`/planDetails/${id}`);
    else alert(response.data.message);
  };

  return (
    <div className="card-cont" key={props._id} id={props._id}>
      <div className="card-top-cont">
        <img src={CardImage} alt="" />
      </div>
      <div className="card-bottom-cont">
        <div className="name-cont">
          <h4>{props.name}</h4>
        </div>
        <div className="details-cont">
          <div className="prop-cont">
            <div className="top-prop-cont">
              <AccessTimeIcon />
              <span>{props.duration}</span>
            </div>
            <div className="bottom-prop-cont">Duration</div>
          </div>
          <div className="prop-cont">
            <div className="top-prop-cont">
              <AttachMoneyIcon />
              <span>{props.price}</span>
            </div>
            <div className="bottom-prop-cont">Price</div>
          </div>
          <div className="prop-cont">
            <div className="top-prop-cont">
              <StarIcon />
              <span>{props.ratingsAverage}</span>
            </div>
            <div className="bottom-prop-cont">Ratings</div>
          </div>
          <div className="prop-cont">
            <div className="top-prop-cont">
              <DiscountIcon />
              <span>{props.discount}</span>
            </div>
            <div className="bottom-prop-cont">Discount</div>
          </div>
        </div>
        <div className="description-cont">
          {props.description}
       
        </div>
        <div className="button-cont">
          <button type="button" className="btn card-btn-buy" onClick={handleBuy}>
            Buy Plan
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;