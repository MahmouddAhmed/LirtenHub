import React from 'react';
import Cards from '../AcceptorRejectReservation'
import axios from 'axios';
import '../layout/Cards.css'
class ClientReservations extends React.Component {
  state={
    Reservations:[],
    done:null
  }
  componentDidMount() {//https://lirtenhub-nav2.herokuapp.com/api/reservations/confirmed/notYet
    axios.get(`https://lirtenhub-nav2.herokuapp.com/api/reservations//client/res`)
      .then(res => {
        const reserv = res.data.data;
        this.setState({Reservations:reserv });
        this.setState({done:true})

      })  
     
  }
  render() {
    if(this.state.done==null)
    return <div className="loader center"></div>
    return ( 
      <div>
        <h1 className = 'regReq'>Registration Requests</h1>
      {this.state.Reservations.map((reserv)=>(
     <Cards reserv={reserv}/>  
      ))};
    </div>
    )}
}

export default ClientReservations;
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