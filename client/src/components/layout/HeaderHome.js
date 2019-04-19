import React, {Component} from 'react'
import 'tachyons'
import '../layout/HeaderHome.css'
import {createHashHistory}from "history"
import { Link,Route, BrowserRouter as Router ,Switch } from 'react-router-dom'
import { connect } from "react-redux";
class Header extends Component{
  constructor(props) {
    super(props);
  }


    render(){
      const {isLoggedIn,loggedUser,users} = this.props;
      const x = this.props.loggedUser
      console.log(this.props.loggedUser)
  
        return(
        <div className="header">
          <a href="/" className="logo">LirtenHub</a>
          <div className="header-right">
            <a className="active" href="/">SignIn</a>
            <a href="/SignUp">SignUp</a>
            <a href="/About">About</a>
            {/* <Router>
                      <Link  to={"/Profile/"+x.id} >My profile</Link>
                        <div className="dropdown-content bg-light-green ">
                          
                          <h3>{console.log("hello "+x.id)}</h3>
                          
                        
                      </div>
                      </Router> */}
          
          </div>
        
        </div>
        
        )}
}
function mapStateToProps(state) {
  // console.log(state.authentication.loggedUser)
   
   const { isLoggedIn,loggedUser } = state.authentication;
  const {users} = state.users
   return { isLoggedIn,loggedUser,users };
 }
 export default connect(mapStateToProps)(Header);