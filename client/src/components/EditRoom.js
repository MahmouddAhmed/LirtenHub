import Parser from 'html-react-parser';
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'tachyons'
import { Link,Route, BrowserRouter as Router ,Switch } from 'react-router-dom'
import { connect } from "react-redux";
import axios from 'axios';

class EditRoom extends Component{
  constructor(props) {
    super(props);
    this.state = {
      Roomname: '',
      capacity: '',
      fee: '',
      done:null

      
    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmitAddRoom = this.handleSubmitAddRoom.bind(this)

  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  
  handleSubmitAddRoom(event) {
    const {isLoggedIn,loggedUser,users} = this.props;
      event.preventDefault();
      const {RoomID} = this.props.location.state
console.log({RoomID})
      axios.put('https://lirtenhubtest.herokuapp.com/api/rooms/'+RoomID, {
      
        Roomname: this.state.Roomname,
        capacity: this.state.capacity,
        fee: this.state.fee,

      }).then(res => {
        this.setState({
          redirect: res.data
        })

        console.log(res.data)
      }).then(alert('Room Added Successfully '))
      
    }
    render(){
     
        return(
          <div id="page-content-wrapper">
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Edit Room</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.css" />
          <link rel="stylesheet" href="../layout/Form.css"/>
        <body>
          <div className="container">
            <div className="wrapper animated bounceInLeft">
              <div className="company-info">
                <h1>Edit Room</h1>
                <ul>
                
                </ul>
              </div>
              <div className="contact">
                  <h3>Edit Room Data</h3>
                  <form onSubmit={this.handleSubmitAddRoom} className="Field">
                  <p>
                      <label>Roomname</label>
                      <input type="text" name="Roomname" onChange={this.onChange} value={this.state.Roomname} required/>
                    </p>
                    <p>
                      <label>Capacity</label>
                      <input type="number" name="capacity" onChange={this.onChange} value={this.state.capacity} required/>
                    </p>
                    <p>
                      <label>Fee</label>
                      <input type="number" name="fee"onChange={this.onChange} value={this.state.fee} required/>
                </p>
                <p >
                </p>
                                
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
export default connect(mapStateToProps) (EditRoom)
