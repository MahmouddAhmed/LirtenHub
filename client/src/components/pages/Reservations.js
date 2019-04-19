import React from 'react';
import Cards from '../AcceptorRejectReservation'
import axios from 'axios';
import { Link,Route, BrowserRouter as Router ,Switch } from 'react-router-dom'
import { connect } from "react-redux";
import '../layout/Cards.css'
class Reservations extends React.Component {
  state={
    Reservations:[],
    done:null
  }
  componentDidMount() {//https://lirtenhub-nav2.herokuapp.com/api/reservations/confirmed/notYet
    const {isLoggedIn,loggedUser,users} = this.props;

    axios.get(`https://lirtenhub-nav2.herokuapp.com/api/reservations//CoWorking/notYet/`+ loggedUser.id)
      .then(res => {
        const reserv = res.data.data;
        this.setState({Reservations:reserv });
        this.setState({done:true})

      })  
     
  }
  render() {
    if(this.state.done==null)
     return <div className="loader center" ></div>
    return ( 
      <div id="page-content-wrapper">
        <h1 className = 'regReq'>Registration Requests</h1>
      {this.state.Reservations.map((reserv)=>(
     <Cards reserv={reserv}/>  
      ))};
    </div>
    )}
}

function mapStateToProps(state) {
  // console.log(state.authentication.loggedUser)
   
   const { isLoggedIn,loggedUser } = state.authentication;
  const {users} = state.users
   return { isLoggedIn,loggedUser,users };
 }
export default connect(mapStateToProps) (Reservations);
// redirectFunction() {
    //   this.handleSubmit()
    //   router.push({
    //    to: '/booking/search',
    //    query: this.state.filters
    //   })
    //  }
     
    //  render () {
    //    <div 
    //     className="btn btn-secondary btn-width-200 search-submit" 
    //     onClick={this.redirectFunction.bind(this)}>
    //       Search 
    //    </div>
    //  }