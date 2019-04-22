import React, {Component} from 'react'
import 'tachyons'
import '../layout/HeaderHome.css'
import './LandingPage.css'
import  { Redirect } from 'react-router-dom'
import { Link,Route, BrowserRouter as Router ,browserHistory,Switch } from 'react-router-dom'
import { connect } from "react-redux";
class Landing extends Component{
    constructor(props) {
        super(props);
      
    
      }
      
      
    
    render(){
        return(
            <body>
            <video id="myVideo" playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
            <source src="1.mp4" type="video/mp4"/>
            </video>

            <div class="content">
            <h1> Welcome to LirtenHub...</h1>
            <h1> Want To Create Your Future !!</h1>
            <Link id="myBtn" to="/SignIn">Let's Get Started</Link>
            </div>
            </body>
        
        )}
}
function mapStateToProps(state) {
  // console.log(state.authentication.loggedUser)
   
   const { isLoggedIn,loggedUser } = state.authentication;
  const {users} = state.users
   return { isLoggedIn,loggedUser,users };
 }
 export default connect(mapStateToProps)(Landing);