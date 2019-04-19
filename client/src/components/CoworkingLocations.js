import React from 'react';
import Location from './pages/Location.js'
import axios from 'axios';
import 'tachyons'
import { Link,Route, BrowserRouter as Router ,Switch } from 'react-router-dom'
import { connect } from "react-redux";
class CoworkingLocations extends React.Component {
  state={
    locations:[],
    done:null
  }
  componentDidMount() {
    const {isLoggedIn,loggedUser,users} = this.props;
    axios.get(`https://lirtenhubtest.herokuapp.com/api/Locations/CoWorkingLocation/all`)
      .then(res => {
        const L = res.data.data;
        this.setState({locations:L });
        this.setState({done:true})

      })  
     
  }
  render() {
    if(this.state.done==null)
    return <div className="loader center"></div>
    return (
      <div className = 'locations' id="page-content-wrapper">
      <React.Fragment>

             <h1 className = "">Locations</h1>
             <h5 className ="regReq">Click on the Desired Location if you want to Edit</h5>

        {this.state.locations.map((L)=>(
      <Location L={L}/>    
    ))}
    </React.Fragment>
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
  export default connect(mapStateToProps) (CoworkingLocations);
