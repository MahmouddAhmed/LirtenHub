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
      done:null,
      error:null
    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmitAddLocation = this.handleSubmitAddLocation.bind(this)

  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleSubmitAddLocation(event) {
    const {isLoggedIn,loggedUser,users} = this.props;

      event.preventDefault();
      axios.post(`https://lirtenhub-nav2.herokuapp.com/api/Locations/`, {
      
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
      }).catch(err=>{
        console.log(err)
        this.setState({error: true})
      }).then(res => {
        if(this.state.error){
          alert('There was a problem adding this Location please try again later')
          this.setState({error:false})

        }
        else{
        alert('Location added successfully')}
      })
      
    }
    render(){
     
        return(
          <div >
          <link rel="shortcut icon" href=""/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Registration Form</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.css" />
          <link rel="stylesheet" href="../layout/Form.css"/>
        <body>
          <div className="container">
            <div className="wrapper animated bounceInLeft">
              <div className="company-info">
                <h1>Add Location</h1>
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
                     <span className = 'reg'> <button type="submit">Submit</button> </span>
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
export default connect(mapStateToProps)(AddLocation);
