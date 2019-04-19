import React, {Component} from 'react'
import 'tachyons' 
import { Link,Route, BrowserRouter as Router ,browserHistory,Switch } from 'react-router-dom'


import { connect } from "react-redux";
import Profile from "../pages/Profile"
import axios from "axios"
import { logout } from "../../actions/authactions";
import {createHashHistory}from "history"
class Head extends Component{

  onSubmit = e => {
    e.preventDefault();
  axios.put('http://localhost:3000/api/users/Logout/'+(this.props.loggedUser.id), {}).then(res => {
  });
    const { dispatch } = this.props;
    console.log("HIIIIIIIIII")
    dispatch(logout());


}

render(){
  const {isLoggedIn,loggedUser,users} = this.props;
  const x = this.props.loggedUser
  console.log(this.props.loggedUser)
    return(
        <div>
              <header className=" black-80 tc pv4 avenir">
                  <a href="" className="bg-black-80 ba b--black dib pa3 w2 h2 br-100">
                  </a>
                  <h1 className="mt2 mb0 baskerville i fw1 f1">LirtenHub</h1>
                  <h2 className="mt2 mb0 f6 fw4 ttu tracked">From Zero to Hero </h2>
                  <nav className="bt bb tc mw7 center mt4">
                    <a className="f6 f5-l link bg-animate black-80 hover-bg-lightest-blue dib pa3 ph4-l" href="/home">Home</a>
                    <div className="dropdown">
                        <a className="f6 f5-l link bg-animate black-80 hover-bg-green dib pa3 ph4-l" >Projects</a>
                        <div className="dropdown-content bg-light-green ">
                          <Link to="/Projects/">All Projects</ Link>
                          <Link to="/approvedP/">Approved Projects</ Link>
                          <Link to="/notapprovedP/">Not Approved Projects</ Link>
                          <Link to="/Project_Requests">Project Requests</Link>
                          <Link  to={"/Profile/"+x.id} >My profile</Link>
                          <h3>{console.log("hello "+x.id)}</h3>
                        </div>
                      </div>

                      
                
                    <div className="dropdown">
                      <a className="f6 f5-l link bg-animate black-80 hover-bg-gray dib pa3 ph4-l" >Locations</a>
                      <div className="dropdown-content bg-beige ">
                        <a href="/Locations">Locations</a>
                        <a href="/AcceptRejectReservation">Reservations</a>
                        <a href="/Reserve">Add Reservation</a>
                        <a href="/DeleteReservations">Cancel Reservation</a>
                        <a href="/AddLocations">Add Locations</a>
                        <a href="/LocationRoom">Add Room</a>
                        <a href="/Rooms">Edit Room</a>
                      </div>
                    </div>
                

                   <a className="f6 f5-l link bg-animate black-80 hover-bg-light-yellow dib pa3 ph4-l" href="/Calendar">Calender</a>

                   
                   <div className="dropdown"></div>
                       <Link  to={"/Profile/"+x.id} >My profile</Link>
                       
                        <div className="dropdown-content bg-light-green ">
                          
                          <h3>{console.log("hello "+x.id)}</h3>
                          
                        
                      </div>
                          <p></p>
        
                      <form onSubmit={this.onSubmit.bind(this)}>
                      <button type="submit">Logout</button></form>


                  </nav>

                  
                </header>
         
          </div>
    )
}
}
function mapStateToProps(state) {
  // console.log(state.authentication.loggedUser)
   
   const { isLoggedIn,loggedUser } = state.authentication;
  const {users} = state.users
   return { isLoggedIn,loggedUser,users };
 }
 export default connect(mapStateToProps)(Head);
