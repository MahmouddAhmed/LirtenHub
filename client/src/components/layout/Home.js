import React, {Component} from 'react'
import 'tachyons' 
import {createHashHistory}from "history"
import { connect } from "react-redux";
import { login } from "../../actions/authactions";
import $ from 'jquery';
import createHistory from 'history/createBrowserHistory'
import { Link,Route, BrowserRouter as Router ,Switch } from 'react-router-dom'
import {browserHistory} from 'react-router'
class Home extends Component{
  // onClick(e){
  //   ("#menu-toggle").click(function(e) {
  //     e.preventDefault();
  //     ("#wrapper").toggleclassName("toggled");
  //   });
  // }
    constructor(props) {
    super(props)
    this._toggleDiv = this._toggleDiv.bind(this)
    // this.remove = this.remove.bind()

  }
  // remove() {
  //   const { dispatch } = this.props;
  //   this.props.isLoggedIn = false;
  //   this.props.loggedUser = null;

  // }
  _toggleDiv() {
    
      $("#wrapper").toggleClass("toggled");
    
  }

    render(){
      const { dispatch } = this.props;
      const x = this.props.loggedUser
      console.log(this.props.loggedUser)

return(
    <div>


<body >



  <div className="d-flex toggled" id="wrapper">

    <div className="bg-light border-right" id="sidebar-wrapper">
      <div className="sidebar-heading"> <img src="https://img.icons8.com/color/48/000000/superman.png"/>    </div>
      <div className="list-group list-group-flush">
      <Link className="list-group-item list-group-item-action white-80 bg-light" to="/Locations">Locations</Link>
      <Link className="list-group-item list-group-item-action white-80 bg-light" to="/CoworkingLoc">Locations</Link>
      <Link className="list-group-item list-group-item-action white-80 bg-light" to="/AcceptRejectReservation">Reservations</Link>
      <Link className="list-group-item list-group-item-action white-80 bg-light" to="/Reserve">Add Reservation</Link>
      <Link className="list-group-item list-group-item-action white-80 bg-light" to="/DeleteReservations">Cancel Reservation</Link>
      <Link className="list-group-item list-group-item-action white-80 bg-light" to="/AddLocations">Add Locations</Link>
      <Link className="list-group-item list-group-item-action white-80 bg-light" to="/LocationRoom">Add Room</Link>
      <Link className="list-group-item list-group-item-action white-80 bg-light" to="/Rooms">Edit Room</Link>
        <Link to={"/SingleProject/"+x.id} className="list-group-item list-group-item-action white-80 bg-light">Single Project</Link>
        <a href="#" className="list-group-item list-group-item-action white-80 bg-light">Status</a>
      </div>
    </div>

    <div id="page-content-wrapper">

      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <button className="btn btn-primary" id="menu-toggle" onClick={this._toggleDiv}>LirtenHub</button>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse white-80" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0 ">
            <li className="nav-item active white-80">
              {/* <a className="nav-link hover-bg-light-blue" href="#">Home <span className="sr-only">(current)</span></a> */}
            </li>
             <li className="nav-item">
             <Link  className="nav-link hover-bg-light-blue"  to={"/Profile/"+x.id} >MyProfile</Link>
                         
                  </li> 
            <li className="nav-item dropdown white ">
              <a className="nav-link dropdown-toggle hover-bg-light-blue " href="#" id="navbarDropdown" role="button " data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Account
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <a className="dropdown-item black-80" href="/"  >Log Out</a>
                <a className="dropdown-item black-80" href="/">ChangeAccount</a>
                <div className="dropdown-divider white-80"></div>
                <a className="dropdown-item black-80" href="#">About</a>
              </div>
            </li>
          </ul>
          

        </div>
        
      </nav>

     
    </div>

  </div>



</body>
</div>
)
}
}

function mapStateToProps(state) {
  console.log(state.authentication.loggedUser)
  
  const { isLoggedIn,loggedUser } = state.authentication;
 const {users} = state.users
  return { isLoggedIn,loggedUser,users };
}
export default connect(mapStateToProps)(Home);