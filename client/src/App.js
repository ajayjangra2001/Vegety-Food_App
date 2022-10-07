import './App.css';
import AdminPage from './Components/Js files/AdminPage';
import AllPlans from './Components/Js files/AllPlans';
import Footer from './Components/Js files/Footer';
import LoginSignup from './Components/Js files/LoginSignup';
import Navbar from './Components/Js files/Navbar';
import Home from './Components/Js files/Home';
import PlanDetails from './Components/Js files/PlanDetails';
import { Switch, Route, Redirect } from 'react-router-dom';
import ForgotPassword from './Components/Js files/ForgotPassword';
import ResetPassword from './Components/Js files/ResetPassword';
import Profile from './Components/Js files/Profile';
import AboutUs from './Components/Js files/AboutUs';
import VerifyUser from './Components/Js files/VerifyUser';
import { Provider } from 'react-redux';
import store from './redux/store';


function App() {

  return (
    <div>
     <Provider store={store}>
        <Navbar />

          <Switch>
            <Route exact path="/" component={Home}/>

            <Route exact path="/aboutus" component={AboutUs}/>

            <Route exact path="/plan/allPlans" component={AllPlans}/>
            
            <Route exact path="/loginSignup" component={LoginSignup}/>

            <Route exact path="/admin" component={AdminPage}/>

            <Route exact path="/profile" component={Profile}/>

            <Route exact path="/planDetails/:id" component={PlanDetails}/>

            <Route exact path="/forgotPassword" component={ForgotPassword}/>

             <Route exact path="/user/forgotPassword/:id/:token" component={ResetPassword}/>

            <Route exact path="/user/verify/:id/:token" component={VerifyUser}/>

            <Redirect to="/" />
          </Switch>

        <Footer />
        </Provider>
    </div>
  );
}

export default App;
