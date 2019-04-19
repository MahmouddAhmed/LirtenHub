import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Projects.css';
import Single_Project from './Single_Project.js'
import { Link,Route, BrowserRouter as Router ,browserHistory,Switch } from 'react-router-dom'


 class Project extends Component {
   state={

     X:this.props.P,
     Y:this.props.P._id
   }
  
  render() {
    
    return (//P is Actullay the Project Info itself
      <div className = "tt" id="page-content-wrapper">  
      <Link className = "L" to={"/SingleProject/"+this.state.Y} ><h3>{this.props.P.name }
        <div></div>
        {this.props.P.description}</h3></Link>     
     </div>
    )
  }
}

Project.propTypes ={
  P:PropTypes.object.isRequired
}

export default Project
