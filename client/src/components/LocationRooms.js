import React from 'react';
import LocationRoom from './pages/LocationRoom'
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
        
      }).catch(err=>{
        console.log(err)
        this.setState({error: true})
      }).then(res => {
        if(this.state.error){
          alert('There was a problem Retrieving the Locations please try again later')
          this.setState({error:false})
          window.location.href = "/"

        }
      })
      this.setState({done:true})
  
     
  }
  render() {
    if(this.state.done==null)
      return <div className="loader center"></div>
    return (
      <React.Fragment>
             <h1 className = 'regReq'>Choose The Desired Location</h1>

        {this.state.locations.map((L)=>(
      <LocationRoom L={L}/>    
    ))}
    </React.Fragment>

  
    )
  }
}

export default All_Locations;
