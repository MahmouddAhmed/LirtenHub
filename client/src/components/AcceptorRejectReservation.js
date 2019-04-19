import React, { Component } from 'react'
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, button } from 'reactstrap';
import { Route, BrowserRouter as Router,Link ,Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import {createHashHistory}from "history"
import axios from 'axios';

import PropTypes from 'prop-types'
import './layout/Cards.css'
import 'tachyons'
class Cards extends Component{
  
  constructor(props) {
    super(props);
    this.state = {
     status: false,
      redirect: false,
      Y:this.props.reserv._id

    }
    this.onClick = this.onClick.bind(this)

    this.routeChangeAccept = this.routeChangeAccept.bind(this);
    this.routeChangeReject = this.routeChangeReject.bind(this);

  }
  
  routeChangeReject(event) {
    event.preventDefault();
  
    console.log(this.state.Y)
    axios.put(`https://lirtenhub-nav2.herokuapp.com/api/reservations/declined/`+this.state.Y,{

    }).then(res => {
      this.setState({
        status: true 
     }) 
      alert('Room Rejected')
    })

  
  }
  onClick(e) {
    console.log(this.state.Y)

}
  routeChangeAccept(event) {
    event.preventDefault();
    console.log(this.state.Y)
    axios.put(`https://lirtenhubtest.herokuapp.com/api/reservations/confirmed/`+this.state.Y,{

    }).then(res => {
      this.setState({
        status: true 
     }) 
      alert('Room Accepted')

    })

    
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect&&this.state.status) {
      return <Redirect to='/AcceptRejectReservation' />
    }
  }
    render(){
        const {RoomID,from , to} = this.props.reserv
        return(
            <div className = "tc">
    <form onSubmit={this.handleSubmitReserve} className="Field">
            <Link className = "hideLink" to={{
                state: {
                  ReservID: this.state.Y
                }
              }}  onClick={this.onClick}>
            <Card>
              <CardBody className ='b .georgia mb0 bold f4 bt bb tc mw7 center mt4 bg-light-blue black-80 tc pv4 avenir'>
                <CardText>{RoomID}</CardText>
                <CardText>{from}</CardText>
                <CardText>{to}</CardText>
              </CardBody>
            </Card>
            </Link>
            <span className = 'tc'>  {this.renderRedirect()}
                  <button className = 'but tc' onClick={this.setRedirect} onClick={this.routeChangeAccept}>Accept</button>
                  </span>
                <span className = 'tc'>{this.renderRedirect()}<button className = 'but' onClick={this.setRedirect} onClick={this.routeChangeReject}>Reject</button></span>
              </form>
          </div>
        )
    }
  
}
Cards.propTypes ={
    reserv:PropTypes.object.isRequired
  }
  
  
  export default Cards