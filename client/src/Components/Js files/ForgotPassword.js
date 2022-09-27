import axios from 'axios';
import React, { useState } from 'react'

function ForgotPassword() {

    const [email, setEmail] = useState("");

    const handleChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('/user/forgotPassword', {email});
        alert(response.data.message);
    }


  return (
    <div className='forgot-password-main-cont'>
        <div className="forgot-password-cont">
            <h3 className='text-center mb-5'>Forgot Password</h3>
            <p><i>Enter your email to forgot your password that give during the registration.</i></p>
            <p><i>You will receive a link on the entered email</i></p>
            <p><i>Click on that link to forgot your password</i></p>
            <hr />
            <div className="mb-3 w-75">
                <label htmlfor="exampleFormControlInput1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required name="email" value={email} onChange={handleChange}/>
            </div>
            <button className="btn btn-success" type="button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
    </div>
  )
}

export default ForgotPassword