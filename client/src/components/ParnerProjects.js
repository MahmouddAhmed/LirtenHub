import React from 'react';
import Project from './EditProj'
import EditProj from './EditProj'
import axios from 'axios';
import { connect } from "react-redux";
function mapStateToProps(state) {
  console.log(state.authentication.loggedUser)
  
  const { isLoggedIn,loggedUser } = state.authentication;
 const {users} = state.users
  return { isLoggedIn,loggedUser,users };
}

class PartnerProject extends React.Component {
  state={
    Projects:[]
  }
  componentDidMount() {
    axios.get(`https://lirtenhub-nav2.herokuapp.com/api/Projects`)
      .then(res => {
        const P = res.data.data;
        console.log(P)
        console.log(this.props)
        this.setState({Projects:P });
        
      }) 
     
     
  }
  
  

  render() {
    console.log(this.props.loggedUser)
    return this.state.Projects.map((P)=>(
     <div >
      <Project P={P} /> 
      
      </div>
    ));
  }
}

export default connect(mapStateToProps)( PartnerProject);
