import React, { useEffect, useState } from "react";
import Logo from "../../Images/logo.png";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function Testonomials() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function getReviews() {
      const response = await axios.get("/review/top10");
      if (response.data.data) setReviews([...response.data.data]);
      else alert(response.data.message);
    }
    getReviews();
  }, []);

  return (
    <div className="testonomial-cont">
      <div className="top-testonomial-cont text-center">
        <h1 style={{ color: "rgb(92,181,72)" }}>Testimonials</h1>
        <h4 style={{ color: "gray" }}>What Clients Says</h4>
      </div>
      <div className="bottom-testonomial-cont">
        {reviews.length === 0 ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <OwlCarousel
              items={1}
              className="owl-theme"
              loop
              autoplay={true}
              margin
            >
              {reviews.map((review, index) => (
                <div className="testo-card-cont" key={index}>
                  <div className="testo-card-top-cont">
                    <img
                      src={
                        review && review.user && review.user.profileImage
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
                          : Logo
                      }
                      alt="Image"
                      style={{
                        border: "4px solid rgb(92,181,72)",
                        borderRadius: "50%",
                        height: "120px",
                        width: "120px",
                      }}
                    />{" "}
                    <h3
                      className="mt-4"
                      style={{
                        color: "rgb(92,181,72)",
                        textTransform: "uppercase",
                        textAlign: "center",
                      }}
                    >
                      {review.user ? review.user.name : "User"}
                    </h3>
                  </div>
                  <br />
                  <div
                    className="testo-card-middle-cont"
                    style={{ color: "white" }}
                  >
                    <p>
                      <i className="fa fa-quote-left"></i> &nbsp;&nbsp;
                      {review.review} &nbsp;&nbsp;
                      <i className="fa fa-quote-right"></i>
                    </p>
                  </div>
                  <br />
                  <div
                    className="testo-card-bottom-cont"
                    style={{ color: "rgb(92,181,72)" }}
                  >
                    {Array.apply(0, Array(review.rating)).map(function (x, i) {
                      return <StarIcon key={i} />;
                    })}
                  </div>
                  <br />
                </div>
              ))}
            </OwlCarousel>
          </>
        )}
      </div>
    </div>
  );
}

export default Testonomials;
