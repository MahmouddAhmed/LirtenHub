import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../components/pages/Projects.css';
import { Link,Route, BrowserRouter as Router ,browserHistory,Switch } from 'react-router-dom'
import EditProject from './pages/EditProject';


 class EditProj extends Component {
   state={

     X:this.props.P,
     Y:this.props.P._id
   }
  
  render() {
    
    return (//P is Actullay the Project Info itself
      <div className = "tt">  
      <Link className = "L" to={"/EditProject/"+this.state.Y} ><h3>{this.props.P.name }
        <div></div>
        {this.props.P.description}</h3></Link>     
     </div>
    )
  }
}

EditProj.propTypes ={
  P:PropTypes.object.isRequired
}

export default EditProj
