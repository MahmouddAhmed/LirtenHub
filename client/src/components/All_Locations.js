import React from 'react';
import Location from './pages/Location.js'
import axios from 'axios';
import 'tachyons'

class All_Locations extends React.Component {
  state={
    locations:[],
    done:null,
    error:null
  }
  componentDidMount() {
    axios.get(`https://lirtenhub-nav2.herokuapp.com/api/Locations/`)
      .then(res => {
        const L = res.data.data;
        this.setState({locations:L });
        this.setState({done:true})

      }) .catch(err=>{
        console.log(err)
        this.setState({error: true})
      }).then(res => {
        if(this.state.error){
          alert('There was a problem Retrieving the Locations please try again later')
          this.setState({error:false})
          window.location.href = "/"


        }
      })
    
  }
  render() {
    if(this.state.done==null)
    return <div className="loader center"></div>
    return (
      <div className = 'locations' >
      <React.Fragment>

             <h1 className = "">Locations</h1>
             <h5 className ="regReq">Click on the Desired Location if you want to Edit</h5>

        {this.state.locations.map((L)=>(
      <Location L={L}/>    
    ))}
    </React.Fragment>
    </div>
  
    )
  }
}

export default All_Locations;
