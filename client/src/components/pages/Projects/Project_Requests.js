import React from 'react';
import Project from './Project.js'
import axios from 'axios';
class Project_Requests extends React.Component {
  state={
    Projects:[]
  }   

 
  componentDidMount() {
    axios.get(`https://lirtenhub-nav2.herokuapp.com/api/Projects/approved/notyet`)
      .then(res => {
        const P = res.data.data;
        this.setState({Projects:P });
      })  
     
  }
  render() {

    return (
        this.state.Projects.map((P)=>(
      <Project P={P}/>    
    )))
  }
}

export default Project_Requests;
