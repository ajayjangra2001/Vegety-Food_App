import './App.css';
import AdminPage from './Components/Js files/AdminPage';
import AllPlans from './Components/Js files/AllPlans';
import Footer from './Components/Js files/Footer';
import LoginSignup from './Components/Js files/LoginSignup';
import Navbar from './Components/Js files/Navbar';
import Home from './Components/Js files/Home';
import PlanDetails from './Components/Js files/PlanDetails';
import { Switch, Route } from 'react-router-dom';
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
            <Route exact path='/'> <Home /> </Route>

            <Route exact path='/aboutus'> <AboutUs /> </Route>

            <Route exact path='/allPlans' > <AllPlans /> </Route>

            <Route exact path='/loginSignup' > <LoginSignup /> </Route>

            <Route exact path="/admin"> <AdminPage /> </Route>

            <Route exact path='/profile' ><Profile /></Route>

            <Route exact path='/planDetails/:id'> <PlanDetails /> </Route>

            <Route exact path='/forgotPassword'> <ForgotPassword /> </Route>

            <Route exact path='/user/forgotPassword/:id/:token'> <ResetPassword /> </Route>

            <Route exact path='/user/verify/:id/:token'> <VerifyUser /> </Route>

          </Switch>

  
        <Footer />
        </Provider>
    </div>
  );
}

export default App;
