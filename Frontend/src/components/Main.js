import React, { useEffect, useState} from 'react';
import { BrowserRouter as Router, Route , useHistory} from 'react-router-dom';
import Login from './user/login';
import Signup from './user/signup';
import NavBar from './NavBar';
import Profile from './user/profile';
import Pricing from './user/pricing';
import SearchDrone from './booking/BookBooking';
import AddDrone from './drone/AddDrone';
import Dashboard from './Dashboard';
import ProvideAuth from './authenticaion/ProvideAuth';
import DroneList from './drone/DroneList';
import AlertList from './drone/AlertList';
import AddAlert from './drone/AddAlert';
import BookingList from './booking/BookingList';
import AddLand from './user/addLand'
import Schedule from './pilot/Schedule'
import DroneTracking from './drone/DroneTracking';
import PrivateRoute from './authenticaion/PrivateRoute';
import AdminAnalysis from './integration/AdminAnalysis';
import { BACKEND_URL } from '../services/constants';
import { BACKEND_PORT } from '../services/constants';

const Main = () => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [authState, setAuthState] = useState(false);
    const [token, setToken] = useState();

    const history = useHistory();
    useEffect(()=>{
        fetchInitialStateForUser();
    }, []);

    const fetchInitialStateForUser = async () => {
        const token = window.localStorage.getItem('token');
        const userObj = window.localStorage.getItem('user');
        const user = JSON.parse(userObj);
        if(token && token !== undefined){
            console.log('TOKEN', token);
            setLoading(true);
            const response = await fetch(`${BACKEND_URL}:${BACKEND_PORT}/user/verifyToken/${token}`);
            console.log(response);
            if(response.state === 200){
                setAuthState(response.state === 200);
                setUser(user);
                setToken(token);
                setLoading(false);
            }
            else{
                // history.push('/login');
                setAuthState(false);
                setLoading(false);
            }
        }
        else{
            console.log('herer');
            // history.push('/login');
            setAuthState(false);
            setLoading(false);
        }
    }
    return(
        <div>
            {!loading && (
                <ProvideAuth value={{user, authState, token}}>
                    
                    <Router>
                        <Route path="/">
                            {/* <Login></Login> */}
                            <NavBar></NavBar>
                        </Route>
                        <Route path="/login">
                            <Login></Login>
                        </Route>
                        <Route path="/signup">
                            <Signup></Signup>
                        </Route>
                         <PrivateRoute path="/profile">
                            <Profile></Profile>
                        </PrivateRoute>

                        <PrivateRoute path="/Schedule">
                            <Schedule></Schedule>
                        </PrivateRoute>

                        <PrivateRoute path="/addLand">
                            <AddLand></AddLand>
                        </PrivateRoute>

                        <PrivateRoute path="/pricing">
                            <Pricing></Pricing>
                        </PrivateRoute>
                        
                        <PrivateRoute path="/searchDrone">
                            <SearchDrone></SearchDrone>
                        </PrivateRoute>

                        <PrivateRoute path="/DroneTracking">
                            <DroneTracking></DroneTracking>
                        </PrivateRoute>
                        
                        <PrivateRoute path="/AddDrone">
                                <AddDrone></AddDrone>
                        </PrivateRoute>

                        <PrivateRoute path="/AlertList">
                                <AlertList></AlertList>
                        </PrivateRoute>
                        <PrivateRoute path="/AddAlert">
                                <AddAlert></AddAlert>
                        </PrivateRoute>
                        
                        <PrivateRoute path="/DroneList">
                                <DroneList persona={'owner'}/>
                        </PrivateRoute>
                        <PrivateRoute path="/BookingList">
                                <BookingList/>
                        </PrivateRoute>
                        <PrivateRoute path="/Dashboard">
                            <Dashboard></Dashboard>
                        </PrivateRoute>
                        <PrivateRoute path="/AdminAnalysis">
                            <AdminAnalysis/>
                        </PrivateRoute>
                    </Router>
                </ProvideAuth>
            )
            }
            </div>
    );
}

export default Main;
