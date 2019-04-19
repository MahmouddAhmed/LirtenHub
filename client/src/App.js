import React from 'react';
import './App.css';
import All_Locations from './components/All_Locations'
import AddLocation from './components/AddLocation'
import All_Projects from './components/All_Projects'
import Project_Requests from './components/Project_Requests'
import Calendar from './components/layout/Calendar'
import Header from './components/layout/HeaderHome.js'
import Head from './components/layout/Head'
import Home from '../src/components/layout/Home'
import Edit from './components/pages/Edit';
import Changepw from './components/pages/Changepw';
import SignIn from './components/layout/SignIn'
import Form from './components/layout/Form'
import EditLocation from './components/EditLocation'
import AddRoom from './components/AddRoom'
import LocationRoom from './components/LocationRooms'
import EditRoom from './components/EditRoom'
import Rooms from './components/Rooms'
import Reserve from './components/AddReservation'
import DeleteReservations from './components/pages/DeleteRes'
import Reservations from './components/pages/Reservations'
import Single_Project from './components/pages/Single_Project'
import approvedP from "./components/pages/approvedP.js"
import notapprovedP from './components/pages/notapprovedP.js'
import { connect } from "react-redux";
import X from '../src/components/layout/Home'
import { Route, BrowserRouter as Router,Link ,browserHistory,Switch } from 'react-router-dom'
import Profile from './components/pages/Profile'
import {createHashHistory}from "history"
import 'tachyons'



function mapStateToProps(state) {
  console.log(state.authentication.loggedUser)
  
  const { isLoggedIn,loggedUser } = state.authentication;
 const {users} = state.users
  return { isLoggedIn,loggedUser,users };
}
class App extends React.Component {
  
  render() {
    return (
      <div>
        <Router>             
</Router>

{/* 
      <Switch>
      <X/>

       <Router>
       <Route exact path="/SingleProject/:id" component={Single_Project}/>
          <Route exact path="/home" component={App}/>
          <Route exact path="/" component={SignIn}/>
          <Route exact path="/AddRoom" component={AddRoom}/>
          <Route exact path="/LocationRoom" component={LocationRoom}/>
          <Route exact path="/EditRooms" component={EditRoom}/>
          <Route exact path="/Rooms" component={Rooms}/>
          <Route exact path="/Reserve" component={Reserve}/>
          <Route exact path="/AddLocations" component={AddLocation}/>
          <Route exact path="/EditLocations" component={EditLocation}/>
          <Route exact path="/SignUp" component={Form}/>
          <Route exact path="/Locations" component={All_Locations}/>
          <Route exact path="/AcceptRejectReservation" component={Reservations}/>
          <Route exact path="/DeleteReservations" component={DeleteReservations}/>
          <Route exact path="/Projects" component={All_Projects}/>
          <Route exact path="/Project_Requests" component={Project_Requests}/>
          <Route exact path="/approvedP" component={approvedP}/>
          <Route exact path="/notapprovedP" component={notapprovedP}/>
          <Route exact path="/Calendar" component={Calendar}/>
          <Route  exact path="/Profile/:id" component={Profile}/>
          <Route  exact path="/Edit/:id" component={Edit}/>
          <Route  exact path="/Changepw/:id" component={Changepw}/>
      </Router> 
      </Switch>  */}
          </div>
    )}
}

export default connect(mapStateToProps)(App);
