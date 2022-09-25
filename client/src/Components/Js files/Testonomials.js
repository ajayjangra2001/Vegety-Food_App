import React, { useEffect, useState } from "react";
import Logo from "../../Images/logo.png";
import StarIcon from "@mui/icons-material/Star";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import axios from "axios";
import Testo from "../../Images/testo.jpg";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

function Testonomials() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function getReviews() {
      const response = await axios.get("/review/top3");
      if (response.data.data) setReviews([...response.data.data]);
      else console.log(response.data.message);
      console.log(response.data.data);
    }

    getReviews();
  }, []);

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = reviews.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div
      className="testonomial-cont"
      style={{ backgroundImage: "url(" + Testo + ")" }}
    >
      <div className="top-testonomial-cont" style={{ color: "rgb(92,181,72)" }}>
        <h1>Customer say about us</h1>
      </div>
      <div className="bottom-testonomial-cont">
        <div className="right-testonomial-cont">
          <div className="card-for-testo">
            {reviews.length === 0 ? (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
                  <AutoPlaySwipeableViews
                    axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                  >
                    {reviews.map((review, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Paper
                          square
                          elevation={0}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            height: 75,
                            p: 2,
                            bgcolor: "transparent",
                            justifyContent: "center",
                            color: "white",
                          }}
                        >
                          <img
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
                                : Logo
                            }
                            alt={review.user.name[0]}
                            height="70"
                            width="70"
                            style={{
                              border: "2px solid gray",
                              borderRadius: "50%",
                            }}
                          />
                          <Box sx={{ pl: 2 }}>
                            <Typography>{review.user.name}</Typography>
                            <div className="review d-flex align-items-center">
                              <StarIcon sx={{ color: "rgb(92,181,72)" }} />
                              <span style={{ marginLeft: "0.3rem" }}>
                                {review.rating}
                              </span>
                            </div>
                          </Box>
                        </Paper>

                        {Math.abs(activeStep - index) <= 2 ? (
                          <Box
                            component="div"
                            sx={{
                              height: 255,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              overflow: "scroll",
                              width: "80%",
                              fontSize: "1.3rem",
                              wordWrap: "break-word",
                              marginTop: "1.5rem",
                            }}
                            className="example"
                          >
                            {review.review}
                          </Box>
                        ) : null}
                      </div>
                    ))}
                  </AutoPlaySwipeableViews>
                  <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    sx={{ bgcolor: "transparent", margin: "0 1.5rem" }}
                    nextButton={
                      <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                        sx={{ color: "rgb(92,181,72)" }}
                      >
                        Next
                        {theme.direction === "rtl" ? (
                          <KeyboardArrowLeft />
                        ) : (
                          <KeyboardArrowRight />
                        )}
                      </Button>
                    }
                    backButton={
                      <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        sx={{ color: "rgb(92,181,72)" }}
                      >
                        {theme.direction === "rtl" ? (
                          <KeyboardArrowRight />
                        ) : (
                          <KeyboardArrowLeft />
                        )}
                        Back
                      </Button>
                    }
                  />
                </Box>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testonomials;
