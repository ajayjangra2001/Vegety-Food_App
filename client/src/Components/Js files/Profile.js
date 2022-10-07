import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import profileBG from "../../Images/profile.jpg";
import CardImage from "../../Images/cardImage.jpg";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DiscountIcon from "@mui/icons-material/Discount";

function Profile() {
  const [profile, setProfile] = useState(null);
  let [userData, setUserData] = useState(null);
  const [userPlan, setUsersPlan] = useState();

  const data = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    async function uploadProfile() {
      if (profile !== null) {
        const response = await axios.post(
          `/user/profile/${data._id}`,
          { user_image: profile },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.data) {
          alert(response.data.message);
          setUserData({ ...response.data.data });
          const dis = () =>
            dispatch({ type: "login", payload: response.data.data });
          dis();
          setProfile(null);
        }
      }
    }
    uploadProfile();
  }, [profile]);

  useEffect(() => {
    setUserData({ ...data });
  }, []);

  const handleChange = (event) => {
    setProfile(event.target.files[0]);
  };

  const handleClick = async (event) => {
    event.preventDefault();

    const res = await axios.patch(`/user/update/${data._id}`, {
      name: userData.name,
      password: userData.password,
    });

    if (res.data.data) {
      setUserData((values) => ({ ...values, ...res.data.data }));
      alert(res.data.message);
    } else alert(res.data.message);
    const dis = () => dispatch({ type: "update", payload: userData });
    dis();
  };

  useEffect(() => {
    async function getUserPlan() {
      const response = await axios.get(`/plan/${data.plan}`);
      if (response.data.data) setUsersPlan(response.data.data);
    }

    getUserPlan();
  }, []);

  return (
    <div
      className="profile-main-cont"
      style={{ backgroundImage: "url(" + profileBG + ")" }}
    >
      <div className="profile-top-cont">
        <div className="profile-top-left-cont">
          <Avatar
            src={
              userData !== null
                ? `${`data:${
                    userData.profileImage
                      ? userData.profileImage.contentType
                      : ""
                  };base64,${btoa(
                    String.fromCharCode(
                      ...new Uint8Array(
                        userData.profileImage
                          ? userData.profileImage.data.data
                          : ""
                      )
                    )
                  )}`}`
                : "/static/images/avatar/1.jpg"
            }
            alt={data.name || "Vegety"}
            sx={{ width: 150, height: 150 }}
          />

          <label htmlhmtlFor="upload-input" className="mt-4">
            <Button
              variant="contained"
              component="label"
              color="success"
              type="submit"
            >
              <AttachFileIcon />
              &nbsp;Upload Picture
              <input
                hidden
                accept="image/*"
                id="upload-input"
                type="file"
                name="user_image"
                onChange={handleChange}
              />
            </Button>
          </label>
        </div>
        <div className="profile-top-right-cont">
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            sx={{
              mb: 2,
              "& .MuiInputBase-root": {
                color: "white",
              },
            }}
            name="name"
            onChange={(e) =>
              setUserData({ ...userData, [e.target.name]: e.target.value })
            }
            value={userData !== null ? userData.name : ""}
            fullWidth
            color="success"
            focused
          />
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            sx={{
              mb: 2,
              "& .MuiInputBase-root": {
                color: "white",
              },
            }}
            readOnly
            value={userData !== null ? userData.email : "" || ""}
            fullWidth
            color="success"
            focused
          />

          <TextField
            type="password"
            id="standard-basic"
            label="Password"
            variant="standard"
            name="password"
            sx={{
              mb: 2,
              "& .MuiInputBase-root": {
                color: "white",
              },
            }}
            value={userData !== null ? userData.password : "" || ""}
            onChange={(e) =>
              setUserData({ ...userData, [e.target.name]: e.target.value })
            }
            fullWidth
            color="success"
            focused
            textColor="white"
          />

          <button
            className="btn btn-success mt-4"
            value="Update Profile"
            onClick={handleClick}
          >
            Update Profile
          </button>
        </div>
      </div>
      <div
        style={{ height: "2px", backgroundColor: "white", width: "90%" }}
      ></div>
      <div className="profile-bottom-cont d-flex justify-content-center">
        {userPlan ? (
          <div className="card-main-cont" key={userPlan._id}>
            <div className="card-left-cont">
              <img src={CardImage} alt="" />
            </div>
            <div className="card-right-cont">
              <div className="name-cont">
                <h4 style={{ textTransform: "capitalize", color : 'black' }}>{userPlan.name}</h4>
              </div>
              <div className="details-cont">
                <div className="prop-cont">
                  <div className="top-prop-cont">
                    <AccessTimeIcon style={{color : 'black'}} />
                    <span>{userPlan.duration}</span>
                  </div>
                  <div className="bottom-prop-cont" style={{color : 'black'}}>Duration</div>
                </div>
                <div className="prop-cont">
                  <div className="top-prop-cont">
                    <AttachMoneyIcon style={{color : 'black'}} />
                    <span>{userPlan.price}</span>
                  </div>
                  <div className="bottom-prop-cont" style={{color : 'black'}}>Price</div>
                </div>
                <div className="prop-cont">
                  <div className="top-prop-cont">
                    <StarIcon style={{color : 'black'}}/>
                    <span>{userPlan.ratingsAverage}</span>
                  </div>
                  <div className="bottom-prop-cont" style={{color : 'black'}}>Ratings</div>
                </div>
                <div className="prop-cont">
                  <div className="top-prop-cont">
                    <DiscountIcon style={{color : 'black'}}/>
                    <span>{userPlan.discount}</span>
                  </div>
                  <div className="bottom-prop-cont" style={{color : 'black'}}>Discount</div>
                </div>
              </div>
              <div className="description-cont" style={{color : 'black'}}>{userPlan.description}</div>
            </div>
          </div>
        ) : (
          <>You don't have any plan....</>
        )}
      </div>
    </div>
  );
}

export default Profile;
