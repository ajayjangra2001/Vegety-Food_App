import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";import "../style files/card.css";
import Card from "./Card";
import topPlans from '../../Images/topPlan.jpg';

function AllPlans() {
  let [plans, setPlans] = useState([]);
  let [duplicate, setDuplicate] = useState([]);
  let [pages, setPages] = useState(1);

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
  }

  return (
    <div className="allPlan-main-cont" style={{backgroundImage : 'url('+ topPlans +')'}}>
      <div className="allPlans-top-cont mt-1">
        <h1 style={{ color: "rgb(92,181,72)" }}>Our Popular Plans</h1>
        <span>Made with premium ingredients.</span>
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
                  <a className="page-link" data-start-index={i == 0 ? 0 : i * 4} data-end-index={i * 4 + 4} onClick={handlePages}>{++i}</a>
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


