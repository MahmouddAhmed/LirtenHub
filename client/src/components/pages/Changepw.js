import React, { Component } from 'react'
import { Link,Route, BrowserRouter as Router ,Switch } from 'react-router-dom'
import { connect } from "react-redux";

import PropTypes from 'prop-types'
import axios from 'axios'
  class Changepw extends Component {
    constructor(props) {

      super(props);
  
    }
state={
  id:"",
  Email:"" ,
  Country:"" ,
  City:"",
  Bio:"" ,
  User_Category:null,
  phone_number:"",
  Password:"",
  Passwordconfirm:"",
  // ONLY FOR MEMBER AND PARTNER 
  First_Name:"" ,
  Last_Name: "",
  Birth_Date: "",
  Experience_Level:"" ,
// ONLY FOR CONSULTANCY AGENCY AND CO WORKING SPACE 
Name:"",
Established_since:"",
//ONLY  FOR MEMBER
Skills:"",
Applied_Skills:"",
Intrests:"",
Intrestsdel:"",
Experience_Level:"",
Certificates: "",
Certificatesdel:"",
// FOR CONSULTANCY AND MEMBER AND PARTNER 
Past_Projects:"",
// ONLY FOR CONSULTANCY
Partners:"",
Board_members:"",
Studies:"",
//ONLY FOR CO-WORKING-SPACE
Business_Plans_Offered:"",
Business_Plans_Offereddel:"",
Board_membersdel:"",
Studiesdel:""
}
componentDidMount() {

  const sendtoaxios='http://localhost:3000/api/users/'+(this.props.match.params.id)

  //const asdas='localhost:3000/api/projects/'+(this.props.match.params.id)

  console.log(sendtoaxios) 

  axios.get(sendtoaxios)

    .then(res => {       

      const user = res.data.Data;
      console.log(user)
if(user.User_Category=="Member"){
this.setState({User_Category:user.User_Category})
}
if(user.User_Category=="Partner"){
  this.setState({User_Category:user.User_Category})
}
if(user.User_Category=="Partner_CoWorkingSpace"){
  this.setState({User_Category:user.User_Category})
}
if(user.User_Category=="Consulting_Agent"){

  this.setState({User_Category:user.User_Category})
}


});
 

  }
  onSubmit = e => {
    const {isLoggedIn,loggedUser,users} = this.props;
      if(this.state.Password==this.state.Passwordconfirm){
    axios({
        method: 'post',
        url: 'http://localhost:3000/api/users/changepassword/'+loggedUser.id,
        data: {
           
            newpassword:this.state.Password,
            confirm:this.state.Passwordconfirm
        }
      })
    }
    else{
        return <h3>please check that the new password and the confirm password are identical</h3>
    }
     
  }
  handleInputChange(e){
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  }

  render() {
    if(this.state.User_Category==null){
      return "loading"
    }
    const {isLoggedIn,loggedUser,users} = this.props;
    const x = this.props.loggedUser

      return(
        <div>
        <link rel="shortcut icon" href=""/>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
        <title>Registration Form</title>
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.css" />
        <link rel="stylesheet" href="../layout/Form.css"/>
      <body>
        <div className="container">
          <h1 className="brand"><span>User</span>Profile</h1>
          <div className="wrapper animated bounceInLeft">
            <div className="company-info">
            <h3><Link  to={"/Profile"} >Back to profile</Link></h3>
              <ul>
                <li><i className="fa fa-road"></i> LirtenHub st</li>
                <li><i className="fa fa-phone"></i> 0777 5000 </li>
                <li><i className="fa fa-envelope"></i> LirtenHub@Lirten.com </li>
              </ul>
            </div>
            <div className="contact">
              <h3>Profile</h3>
              <form onSubmit={this.onSubmit.bind(this)}>
              <p>
                  <label>New Password</label>
                  <input name="Password"type="text"  onChange={e => this.handleInputChange(e)}/>
                </p>
                <p>
                  <label>Confirm Password</label>
                  <input name="Passwordconfirm"type="text" onChange={e => this.handleInputChange(e)}/>
                </p>
               
                <button type="submit">update Password</button>
               
              </form>
            </div>
          </div>
        </div>
      
      </body>
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
 export default connect(mapStateToProps)(Changepw);