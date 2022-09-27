import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import CardImage from "../../Images/cardImage.jpg";
import "../style files/card.css";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DiscountIcon from "@mui/icons-material/Discount";
import GradeIcon from "@mui/icons-material/Grade";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";


function PlanDetails() {
  const params = useParams();
  const [planDetails, setPlanDetails] = useState(null);
  const [reviewsDetails, setReviewsDetails] = useState(null);
  const [commentData, setCommentData] = useState({});
  const [editable, setEditable] = useState('false');
  const [reviewData, setReviewData] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setCommentData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      `review/create/${params.id}`,
      commentData
    );
    if (response.data.data)
      setReviewsDetails([...reviewsDetails, response.data.data]);
    else alert(response.data.message);
    console.log(response.data.data);
    setCommentData({});
  };

  useEffect(() => {
    async function getPlanDetails() {
      const response = await axios.get(`/plan/${params.id}`);
      if (response.data.data) setPlanDetails({ ...response.data.data });
      else alert(response.data.message);
    }

    getPlanDetails();
  }, []);

  useEffect(() => {
    async function getReviewsDetails() {
      const response = await axios.get(`/review/${params.id}`);
      if (response.data.data) setReviewsDetails([...response.data.data]);
      else alert(response.data.message);
    }
    getReviewsDetails();
  }, [reviewsDetails]);

  const handleReviewChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    setReviewData((values) => ({...values, [name] : value}));
    console.log(reviewData);
  }

  const deleteReview = async (event) => {
      const id = event.currentTarget.parentNode.parentNode.attributes.getNamedItem('data-id').value;
      const response = await axios.delete(`/review/${id}`);
      alert(response.data.message);
  }

  const updateReview = async (event) => {
    const id = event.currentTarget.parentNode.parentNode.attributes.getNamedItem('data-id').value;
    console.log(id);
    setEditable('true');
  }

  return (
    <div>
      <div className="plan-details-top-container">
        {planDetails !== null ? (
          <div
            className="card-main-cont"
            key={planDetails._id}
            id={planDetails._id}
          >
            <div className="card-left-cont">
              <img src={CardImage} alt="" />
            </div>
            <div className="card-right-cont">
              <div className="name-cont">
                <h4>{planDetails.name}</h4>
              </div>
              <div className="details-cont">
                <div className="prop-cont">
                  <div className="top-prop-cont">
                    <AccessTimeIcon />
                    <span>{planDetails.duration}</span>
                  </div>
                  <div className="bottom-prop-cont">Duration</div>
                </div>
                <div className="prop-cont">
                  <div className="top-prop-cont">
                    <AttachMoneyIcon />
                    <span>{planDetails.price}</span>
                  </div>
                  <div className="bottom-prop-cont">Price</div>
                </div>
                <div className="prop-cont">
                  <div className="top-prop-cont">
                    <StarIcon />
                    <span>{planDetails.ratingsAverage}</span>
                  </div>
                  <div className="bottom-prop-cont">Ratings</div>
                </div>
                <div className="prop-cont">
                  <div className="top-prop-cont">
                    <DiscountIcon />
                    <span>{planDetails.discount}</span>
                  </div>
                  <div className="bottom-prop-cont">Discount</div>
                </div>
              </div>
              <div className="description-cont">{planDetails.description}</div>
              <div className="button-cont">
                <button type="button" className="btn card-btn-buy">
                  Buy Plan
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>Loading...</>
        )}
      </div>

      <div className="plan-details-bottom-cont p-5">
        <div className="comment-form-cont">
          <div className="mb-3">
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              placeholder="Write your comment here ..."
              name="review"
              value={commentData.review || ""}
              onChange={handleChange}
            ></textarea>
          </div>
          <select
            className="form-select"
            name="rating"
            value={commentData.rating || ""}
            onChange={handleChange}
          >
            <option value="">------ Select Review ------</option>
            <option value="5">Excellent</option>
            <option value="4">Very Good</option>
            <option value="3">Good</option>
            <option value="2">Poor</option>
            <option value="1">Very Poor</option>
          </select>
          <div className="btn-for-comment mt-3 d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="reviews-cont">
        <h4>Reviews</h4>
        {reviewsDetails !== null ? (
          <>
            {reviewsDetails.map((review, index) => (
              <div className="user-comment-container p-3 mt-4" key={index} data-id={review._id}>
                <div className="user-comment-container-left-part">
                  <div className="comment-box-top-part d-flex">
                    <div className="comment-box-left-part d-flex align-items-center">
                      <Avatar
                        src={
                          review !== null
                            ? `${`data:${
                                review.user.profileImage
                                  ? review.user.profileImage.contentType
                                  : ""
                              };base64,${btoa(
                                String.fromCharCode(
                                  ...new Uint8Array(
                                    review.user.profileImage
                                      ? review.user.profileImage.data.data
                                      : ""
                                  )
                                )
                              )}`}`
                            : "/broken-image.jpg"
                        }
                      />
                    </div>
                    <div
                      className="comment-box-right-part d-flex justify-content-between align-items-center w-75"
                      style={{
                        marginLeft: "1rem",
                        lineHeight: "0.5rem",
                        padding: "0.5rem 0",
                      }}
                    >
                      <div className="comment-box-left-side">
                        <h5>{review.user.name}</h5>
                        <span>
                          Commented on: <i>{review.createdAt.split("T")[0]}</i>
                        </span>
                      </div>
                      <div className="comment-box-right-side d-flex align-items-center justify-content-center">
                        <GradeIcon />
                        <span style={{ fontSize: "1.5rem" }} contentEditable={editable}
                        name="review"
                        value={reviewData.rating || review.rating}
                        onChange = {handleReviewChange}
                        suppressContentEditableWarning={true}

                        >
                          {review.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="comment-box-bottom-part mt-2 p-1">
                    <div
                      className="comment-text"
                      style={{ textAlign: "justify" }}
                      contentEditable={editable}
                      name="review"
                      value={reviewData.review || review.review}
                      onChange = {handleReviewChange}
                      suppressContentEditableWarning={true}
                    >
                      {review.review}
                    </div>
                  </div>
                </div>
                <div className="user-comment-container-right-part">
                  <EditIcon
                    sx={{ fontSize: "2rem", color: "rgb(92,181,72)" }}
                    onClick = {updateReview}
                  />

                  <DeleteIcon sx={{ fontSize: "2rem", color: "tomato" }} onClick={deleteReview} />
                </div>
              </div>
            ))}
          </>
        ) : (
          <div>No Review Found...</div>
        )}
      </div>
    </div>
  );
}

export default PlanDetails;
