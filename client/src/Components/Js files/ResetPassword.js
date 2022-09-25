import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const params = useParams();
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputs.password === inputs.confirmPassword) {
      const response = await axios.patch(
        `/user/forgotPassword/${params.id}/${params.token}/updatePassword`,
        { password: inputs.password }
      );
    if (response.code === "ERR_BAD_REQUEST") alert(response.data.message);
    else alert(response);
  
    } else {
      alert("Please verify your password first");
    }
  };

  return (
    <div className="reset-password-main-cont">
      <div className="reset-password-form-cont">
        <h3 className="text-center mb-5">Reset Password</h3>
        <div className="mb-3">
          <label hmtlfor="exampleFormControlInput2" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleFormControlInput2"
            placeholder="Password"
            required
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label hmtlfor="exampleFormControlInput3" className="form-label">
            Confirm Password
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput3"
            placeholder="Confirm Password"
            required
            name="confirmPassword"
            value={inputs.confirmPassword || ""}
            onChange={handleChange}
          />
        </div>
        <button
          className="btn btn-success"
          type="button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    
      
    </div>
  );
}

export default ResetPassword;
