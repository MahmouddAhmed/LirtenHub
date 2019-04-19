import Parser from 'html-react-parser';
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'tachyons'
import { Link,Route, BrowserRouter as Router ,Switch } from 'react-router-dom'
import { connect } from "react-redux";
import axios from 'axios';

class AddLocation extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      country: '',
      city: '',
      street: '',
      extraInfo: '',
      done:null
    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmitAddLocation = this.handleSubmitAddLocation.bind(this)

  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmitAddLocation(event) {
    const {isLoggedIn,loggedUser,users} = this.props;
    const {locationID} = this.props.location.state
    console.log({locationID})
      event.preventDefault();
      axios.put(`https://lirtenhubtest.herokuapp.com/api/Locations/`+locationID, {
      
        name: this.state.name,
        country: this.state.country,
        city: this.state.city,
        street: this.state.street,
        ownerID: loggedUser.id,
        extraInfo: this.state.extraInfo

      }).then(res => {
        this.setState({
          redirect: res.data
        })
        this.setState({done:true})

        console.log(res.data)
      }).then(alert('A Location was Added '))
      
    }
    render(){
      if(this.state.done==null)
      return <div className="loader center"></div>
        return(
          <div id="page-content-wrapper">
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
            <div className="wrapper animated bounceInLeft">
              <div className="company-info">
                <h1>Edit Location</h1>
                <ul>
                
                </ul>
              </div>
              <div className="contact">
                  <h3>New Location Data</h3>
                  <form onSubmit={this.handleSubmitAddLocation} className="Field">
                    <p>
                      <label>Name</label>
                      <input type="text" name="name" onChange={this.onChange} value={this.state.name} required/>
                    </p>
                    <p>
                      <label>Country</label>
                      <input type="text" name="country" onChange={this.onChange} value={this.state.country} required/>
                    </p>
                    <p>
                      <label>City</label>
                      <input type="text" name="city" onChange={this.onChange} value={this.state.city} required/>
                    </p>
                    <p>
                      <label>Street</label>
                      <input type="text" name="street" onChange={this.onChange} value={this.state.street} required/>
                    </p>
                    <p>
                      <label>Extra Info</label>
                      <input type="text" name="extraInfo" onChange={this.onChange} value={this.state.extraInfo} required/>
                    </p>
                  <p></p>
                    <p className="ful">
                     <span className = 'reg'> <button type="submit">Update</button> </span>
                    </p>
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
export default connect(mapStateToProps) (AddLocation)
