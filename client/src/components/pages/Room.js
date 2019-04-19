import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Locations.css';
import { Route, BrowserRouter as Router,Link ,Switch } from 'react-router-dom'

 class Room extends Component {
  
  state={

    Y:this.props.R._id

    }

  render() {
    return (//R is Actullay the Room Info itself
     
<div id="page-content-wrapper"> 
<Link className = "hideLink" to={{
  pathname: '/EditRooms',
  state: {
    RoomID: this.state.Y
  }
}} > <h3 className = 'loc'> <p className = 'blue'>Room Name</p>{this.props.R.Roomname}
        <br></br>
        <p className = 'blue'>Room Capacity</p>{this.props.R.capacity}
      <br></br>
      <p className = 'blue'>Room Price</p>
       {this.props.R.fee}
        </h3></Link>
       
      </div>
    )
  }
}

Room.propTypes ={
  R:PropTypes.object.isRequired
}

export default Room
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