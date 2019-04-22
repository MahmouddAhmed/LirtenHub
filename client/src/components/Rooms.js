import React from 'react';
import Room from './pages/Room'
import axios from 'axios';
import 'tachyons'

class Rooms extends React.Component {
  state={
    rooms:[],
    done: null,
    error: null
  }
  componentDidMount() {
    axios.get(`https://lirtenhub-nav2.herokuapp.com/api/rooms/CoWorkingRoom/cowork/loc`)//will be accepted after pushing to heroku 
      .then(res => {
        const R = res.data.data;
        this.setState({rooms:R });

      }).catch(err=>{
        console.log(err)
        this.setState({error: true})
        this.setState({done: true})

      }).then(res => {
        if(this.state.error){
          alert('There was a problem Retrieving the Locations please try again later')
          this.setState({error:false})
          window.location.href = "/"

        }
        else{
          this.setState({done:true})

        }
      })

     
  }
  render() {
    if(this.state.done==null)
      return <div className="loader center" ></div>
    return (
      <React.Fragment>
  <h2 className ="regReq" >Click on the Desired Room you want to Edit</h2>

        {this.state.rooms.map((R)=>(
      <Room R={R}/>    
    ))}
    </React.Fragment>

  
    )
  }
}

export default Rooms;
