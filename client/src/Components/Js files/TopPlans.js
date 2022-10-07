import React, { useState, useEffect } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import Card from "./Card";

function TopPlans() {

  const [threePlans, setThreePlans] = useState([]);

  useEffect(() => {

    async function getTheePlans() {
      const response = await axios.get("/plan/topPlans");
      if (response.data.data) {
        setThreePlans([...response.data.data]);
      } else {
        console.log(response.data.message);
      }
    }

    getTheePlans();

  }, [])

  const history = useHistory();

  return (
    <div className="topPlan-cont" >
      <div className="topPlan-top-cont" style={{color : "rgb(92,181,72)"}}>
        <h1>Our Popular Plans</h1>
        <span>Made with premium ingredients.</span>
      </div>
      <div className="topPlan-middle-cont">
        {
          threePlans.length === 0 ? <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div> : <>
            {
              threePlans.map((plan) => (
                <Card props={plan} />
              ))
            }
        
        </>
        }
        
      </div>
      <div className="topPlan-bottom-cont d-flex justify-content-center">
        <div className="learn-more-btn" onClick={() => history.push('/plan/allPlans')} style={{background : 'linear-gradient(to right, #11998e , #38ef7d)'}}>
          Load More <ArrowRightIcon />
        </div>
      </div>
    </div>
  );
}

export default TopPlans;
