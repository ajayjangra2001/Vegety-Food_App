import axios from 'axios';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Alert from '../../UtilsComponents/Alert';


function Login() {

    const history = useHistory();

    const [inputs, setInputs] = useState({});
    const dispatch = useDispatch();

    const handleChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({...values, [key] : value}));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post("/user/login", inputs);
        if (response.data.data && response.data.data.role === 'User') {
            const dis = () => dispatch({type : 'login', payload : response.data.data});
            dis();
            history.push('/');
        }
        else if (response.data.data && response.data.data.role === 'Admin') {
            const dis = () => dispatch({type : 'login', payload : response.data.data});
            dis();
            history.push('/admin');
        }
        else alert(response.data.message);
        setInputs({});
    }

    return (
        <div>
            <h2 style={{textAlign : 'center'}}>Welcome Back!</h2>
            <div className="mb-3">
                <label hmtlfor="exampleFormControlInput1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required name="email" value={inputs.email || ""} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label hmtlfor="exampleFormControlInput2" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleFormControlInput2" placeholder="Password" required name="password" value={inputs.password || ""} onChange={handleChange}/>
            </div>
            <div className="mb-3" style={{textAlign : 'right'}}>
                <span onClick={() => history.push('/forgotPassword')} style={{cursor : "pointer"}} className="forgot-password">Forgot Password ?</span>
            </div>
            <div className="d-grid gap-2">
          <button className="btn btn-success" type="button" onClick={handleSubmit}
          style={{backgroundColor : 'rgb(92,181,72)'}}>
            Submit
          </button>
        </div>
        </div>
    )
}

function Signup() {

    const [inputs, setInputs] = useState({});
    const [message, setMessage] = useState();
    
    const handleChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({...values, [key] : value}));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post("/user/signup", inputs);
        setMessage(response.data.message);
        setInputs({});
    }

    return (
        <div>
            <h2 style={{textAlign : 'center'}}>Create Account</h2>
            <div className="mb-3">
                <label hmtlfor="exampleFormControlInput0" className="form-label">Name</label>
                <input type="text" className="form-control" id="exampleFormControlInput0" placeholder="John Doe" required name="name" value={inputs.name || ""} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label hmtlfor="exampleFormControlInput1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required name="email" value={inputs.email || ""} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label hmtlfor="exampleFormControlInput2" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleFormControlInput2" placeholder="Password" required name="password" value={inputs.password || ""} onChange={handleChange} minLength={8} />
            </div>
            <div className="mb-3">
                <label hmtlfor="exampleFormControlInput3" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" id="exampleFormControlInput3" placeholder="Confirm Password" required name="confirmPassword" value={inputs.confirmPassword || ""} onChange={handleChange}/>
            </div>

            <div className="d-grid gap-2 mt-5">
          <button className="btn btn-succcess" type="button" onClick={handleSubmit} style={{backgroundColor : 'rgb(92,181,72)'}}>
            Get Started
          </button>
        </div>
          <Alert props={message} stateChanger={setMessage}/>
        </div>
    )
}

function LoginSignup() {

    const [state, setState] = useState(true);
    const [active, setActive] = useState('active-class');
  
    const handleClick = (event) => {
        if (!event.currentTarget.classList.contains('active-class')) {
            setState(!state);
            setActive(active === 'unactive-class' ? "active-class" : 'unactive-class');

        }
    }


  return (
    <div className='login-signup-cont'>
        <div className="form-container">
            <div className="top-btn-cont d-flex justify-content-between">
                <div className={`signup button ${(active == 'active-class' ? "unactive-class" : "active-class")}`} onClick={handleClick}>
                    Signup
                </div>
                <div className={`login button ${(active == 'active-class' ? "active-class" : "unactive-class")}`} onClick={handleClick}>Login</div>
            </div>
            <div className="bottom-form-cont" style={{marginTop : '1.5rem'}}>
                {
                    
                    state ? <Login /> : <Signup />
                }
               
            </div>
        </div>
    </div>
  )
}


export default LoginSignup