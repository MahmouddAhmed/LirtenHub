import React from 'react';
import Reserve from './pages/Reserve'
import axios from 'axios';
import 'tachyons'

class Rooms extends React.Component {
  state={
    rooms:[],
    done:null
  }
  componentDidMount() {
    axios.get(`https://lirtenhubtest.herokuapp.com/api/rooms/`)
      .then(res => {
        const R = res.data.data;
        this.setState({rooms:R });
        this.setState({done:true})

      })  
     
  }
  render() {
    if(this.state.done==null)
    return <div className="loader center" id="page-content-wrapper"></div>
    return (
      <React.Fragment>
  <h2 className ="regReq">Choose a corresponding date to the room you wish to reserve</h2>
  <p className = "tc ">
        <label className='red '> {"Date Format : <YYYY-mm-ddTHH:MM:ss>"} </label>
        </p>
        {this.state.rooms.map((R)=>(
      <Reserve R={R}/>    
    ))}
    </React.Fragment>

  
    )
  }
}

export default Rooms;
{/* <NavLink to="/contact">Contact</NavLink> */}
//2019-10-12T12:00:00
//2019-10-12T1:00:00