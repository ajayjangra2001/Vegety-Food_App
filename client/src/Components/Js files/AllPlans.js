import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";import "../style files/card.css";
import Card from "./Card";
import topPlans from '../../Images/topPlan.jpg';
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function AllPlans() {
  let [plans, setPlans] = useState([]);
  let [duplicate, setDuplicate] = useState([]);
  let [pages, setPages] = useState(1);
  const [display, setDisplay] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);

  const history = useHistory();

  useEffect(() => {
    async function getAllPlans() {
      const response = await axios.get("/plan/allPlans");
      if (response.data.data) {
        setPlans([...response.data.data]);
      } else {
        console.log(response.data.message);
      }
    }

    getAllPlans();
  }, []);

  useEffect(() => {
    if (plans.length !== 0) {
      let plan2 = plans.slice(0, 4);
      setDuplicate([...plan2]);
      const noOfPages = Math.floor(plans.length / 4 + 1);
      setPages(noOfPages)
    }
  }, [plans]);


  const handlePages = (event) => {
    event.preventDefault();
    const startIndex = event.currentTarget.attributes.getNamedItem("data-start-index").value;
    const endIndex = event.currentTarget.attributes.getNamedItem("data-end-index").value;
    const newPlans = plans.slice(startIndex, endIndex);
    setDuplicate([...newPlans]);
    const childNumber = Number(event.currentTarget.attributes.getNamedItem('data-number').value);
    setPageNumber(childNumber);
  }

  const AscendingSortingByDiscount = () => {
    let new_plans = [...plans];
    new_plans.sort((a,b) => a.discount - b.discount);
    setPlans([...new_plans]);
  }

  const AscendingSortingByPrice = () => {
    let new_plans = [...plans];
    new_plans.sort((a,b) => a.price - b.price);
    setPlans([...new_plans]);
  }
  const AscendingSortingByDuration = () => {
    let new_plans = [...plans];
    new_plans.sort((a,b) => a.duration - b.duration);
    setPlans([...new_plans]);
  }
  const AscendingSortingByRatings = () => {
    let new_plans = [...plans];
    new_plans.sort((a,b) => a.ratingsAverage - b.ratingsAverage);
    setPlans([...new_plans]);
  }

  const DescendingSortingByPrice = () => {
    let new_plans = [...plans];
    new_plans.sort((a,b) => b.price - a.price);
    setPlans([...new_plans]);
  }
  const DescendingSortingByDuration = () => {
    let new_plans = [...plans];
    new_plans.sort((a,b) => b.duration - a.duration);
    setPlans([...new_plans]);
  }
  const DescendingSortingByRatings = () => {
    let new_plans = [...plans];
    new_plans.sort((a,b) => b.ratingsAverage - a.ratingsAverage);
    setPlans([...new_plans]);
  }

  const DescendingSortingByDiscount = () => {
    let new_plans = [...plans];
    new_plans.sort((a,b) => b.discount - a.discount);
    setPlans([...new_plans]);
  }

  return (
    <div className="allPlan-main-cont" style={{backgroundImage : 'url('+ topPlans +')'}}>
      <div className="allPlans-top-cont mt-1">
        <div className="allPlans-top-cont-left-part">
          <h1 style={{ color: "rgb(92,181,72)" }}>Our Popular Plans</h1>
          <span>Made with premium ingredients.</span>
        </div>
      
        <div className="filtered-option" onClick={() => setDisplay(!display)} style={{cursor : 'pointer', border : '1px solid white', padding : '0.6rem', color : 'white'}}>
          Filters
        <MoreVertIcon />
        </div>
     
      </div>
      <div className="plans-sort-option-cont all-plans-cont-filter-options" style={{display : display ? 'flex' : 'none'}}>
          <div className="plan-option"> <ArrowDropUpIcon onClick={AscendingSortingByDuration}/> Sort By Duration <ArrowDropDownIcon onClick={DescendingSortingByDuration}/> </div>
          <div className="plan-option"> <ArrowDropUpIcon onClick={AscendingSortingByPrice}/> Sort By Price <ArrowDropDownIcon  onClick={DescendingSortingByPrice}/>  </div>
          <div className="plan-option"> <ArrowDropUpIcon onClick={AscendingSortingByRatings}/> Sort By Ratings <ArrowDropDownIcon onClick={DescendingSortingByRatings}/> </div>
          <div className="plan-option"> <ArrowDropUpIcon onClick={AscendingSortingByDiscount}/> Sort By Discount <ArrowDropDownIcon onClick={DescendingSortingByDiscount}/> </div>
      </div>
      <div className="allPlans-bottom-cont">
        {duplicate.length === 0 ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {duplicate.map((plan) => (
              <Card props={plan} />
            ))}
          </>
        )}
      </div>
      <div className="topPlan-bottom-cont d-flex justify-content-center mt-5">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {[...Array(pages !== 0 ? pages : 1)].map((x, i) => (
              <>
                <li className="page-item" style={{cursor : 'pointer'}}>
                  <a className="page-link" data-number={i} data-start-index={i == 0 ? 0 : i * 4} data-end-index={i * 4 + 4} onClick={handlePages} style={{backgroundColor : i === pageNumber ? 'rgb(92,181,72)' : '', outline : 'none', border : 'none'}}>{++i}</a>
                </li>
              </>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default AllPlans;


