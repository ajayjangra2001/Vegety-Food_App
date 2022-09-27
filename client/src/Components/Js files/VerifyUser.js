import React, { useEffect, useState } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

function VerifyUser() {
  const params = useParams();
  const history = useHistory();

  const [verified, setVerified] = useState(false);

  useEffect(() => {
    async function verifiedUser() {
      const response = await axios.get(
        `/user/verify/${params.id}/${params.token}`
      );
      if (response.data.verified) {
        setTimeout(() => {
          setVerified(true);

          setTimeout(() => {
            history.push("/loginSignup");
          }, 3000);
        }, 3000);
      } else {
        alert(response.data.message);
        setTimeout(() => {
          history.push("/loginSignup");
        }, 3000);
      }
    }
    verifiedUser();
  }, []);

  return (
    <div className="verify-user-main-cont">
      {verified ? (
        <div className="verification-container d-flex flex-column align-items-center w-50">
          <h4>Email Verfied Successfully!!</h4>
          <VerifiedIcon
            sx={{ fontSize: 50, color: "rgb(92,181,72)", marginTop: "3rem" }}
          />
        </div>
      ) : (
        <div className="verification-container d-flex flex-column align-items-center w-50">
          we are trying to verify your email account, Please make your patience.
          <div className="spinner-border text-success mt-5" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyUser;
