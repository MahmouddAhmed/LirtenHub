import React from 'react';
import Room from './pages/Room'
import axios from 'axios';
import 'tachyons'

class Rooms extends React.Component {
  state={
    rooms:[],
    done: null
  }
  componentDidMount() {
    axios.get(`https://lirtenhubtest.herokuapp.com/api/rooms/CoWorkingRoom`)
      .then(res => {
        const R = res.data.data;
        this.setState({rooms:R });

      })  
      this.setState({done:true})

     
  }
  render() {
    if(this.state.done==null)
      return <div className="loader center" id="page-content-wrapper"></div>
    return (
      <React.Fragment>
  <h2 className ="regReq" id="page-content-wrapper">Click on the Desired Room you want to Edit</h2>

        {this.state.rooms.map((R)=>(
      <Room R={R}/>    
    ))}
    </React.Fragment>

  
    )
  }
}

export default Rooms;
