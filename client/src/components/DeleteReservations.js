import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, button } from 'reactstrap';
import { Route, BrowserRouter as Router,Redirect,Link  } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import {createHashHistory}from "history"
import axios from 'axios';

import PropTypes from 'prop-types'
import './layout/Cards.css'
import 'tachyons'
class Delete extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
     status: false,
      redirect: false,
      Y:this.props.dele._id,
      done:null

    }
    this.onClick = this.onClick.bind(this)

    this.routeChangeDelete = this.routeChangeDelete.bind(this);

  }
  
 
  onClick(e) {
    console.log(this.state.Y)

}
  routeChangeDelete(event) {
    event.preventDefault();
    console.log(this.state.Y)
    axios.delete(`https://lirtenhub-nav2.herokuapp.com/api/reservations/cancelReservation/`+this.state.Y,{

    }).then(res => {
      this.setState({
        status: true 
        
     }) 


    }).catch(err=>{
      console.log(err)
      this.setState({error: true})
    }).then(res => {
      if(this.state.error){
        alert('There was a problem Cancelling the reservation please contact the adminstrator for more information')
        this.setState({error:false})
        window.location.href = "/"

      }
      else{
        alert('Reservation Cancelled')
      }
    })


    

    
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect&&this.state.status) {

        return (

        <Redirect to='/' />)
    }
  }
    render(){
        const {RoomID,from , to} = this.props.dele
      
        return(
            <div className = "tc">
    <form onSubmit={this.routeChangeDelete} className="Field">
            <Link  to={{
                state: {
                  ReservID: this.state.Y
                }
              }}  onClick={this.onClick}>
                <h3 className = 'loc'> 
                    <p className = 'blue'>Room Name</p> {RoomID}
                    <p></p>
                    <p className = 'blue'>From</p> 
                    {from}
                    <p></p>

                    <p className = 'blue'>To</p> 
                    {to}
                </h3>
              </Link>

            <span className = 'tc'> 
             {this.renderRedirect()}
                  <button className = 'but tc' onClick={this.setRedirect} onSubmit={this.routeChangeDelete}>Delete</button>
                  </span>
              </form>
          </div>
        )
    }
  
}
Delete.propTypes ={
    dele:PropTypes.object.isRequired
  }
  
  
  export default Delete