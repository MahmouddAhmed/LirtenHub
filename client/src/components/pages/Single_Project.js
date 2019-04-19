import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Single_Project.css';
import axios from 'axios';
import { connect } from "react-redux";
import { addResult } from '@jest/test-result';
function mapStateToProps(state) {
  
  const { isLoggedIn,loggedUser } = state.authentication;
 const {users} = state.users
  return { isLoggedIn,loggedUser,users };
}
 class Single_Project extends Component {
  constructor(props) {
    super(props);
  }
  state={ 
   P:null,
   UP:null,
   skills:null,
   tasks:null,
   consultancy:"None",
    Apconsultancy:null,
    Acmembers:null,
    Apmembers:null,
    done:null

   
  }
   componentDidMount() {
    // axios.get('https://lirtenhub-nav2.herokuapp.com/api/users/'+(this.props.loggedUser.id))
    //   .then(res => {       
    //     const P = res.data.Data;       
    //     this.setState({U:P});      
    //   })
    const result=[]
    const cop=[]
    const accepted=[]
    const applied=[]
    const TASKS=[]
    const asdas='https://lirtenhub-nav2.herokuapp.com/api/projects/'+(this.props.match.params.id)
    //const asdas='localhost:3000/api/projects/'+(this.props.match.params.id)
    axios.get(asdas)
      .then(res => {       
        const P = res.data.data;
        if(P.Start_Date==null)
            P.Start_Date="Not Available"
        if(P.End_Date==null)
          P.End_Date="Not Available"   
        this.setState({P:P});
        axios.get('https://lirtenhub-nav2.herokuapp.com/api/users/'+(this.state.P.partner_id))
      .then(res => {       
        const UP = res.data.Data;       
        this.setState({UP:UP});
             
      })
           
      axios.get('https://lirtenhub-nav2.herokuapp.com/api/skills/'+(this.state.P.main_skill))
      .then(res => {       
        const P1 = res.data.X;      
        result.push(P1.Name);            
      for(let i=0;i<this.state.P.extra_skills.length;i++){
          axios.get('https://lirtenhub-nav2.herokuapp.com/api/skills/'+(this.state.P.extra_skills[i]))
       .then(res => {       
        const P2 = res.data.X;     
       result.push(P2.Name);
       this.setState({skills:result})        
       })
      }
      if(this.state.P.need_Consultancy==true){
        axios.get('https://lirtenhub-nav2.herokuapp.com/api/users/'+(this.state.P.consultancy_agency_id))
      .then(res => {       
        const P = res.data.Data;       
        this.setState({consultancy:P});      
      })}
      if(this.state.P.current_cons_applied_ids.length==0)
        this.setState({Apconsultancy:cop});
      else{
      for(let i=0;i<this.state.P.current_cons_applied_ids.length;i++){
      axios.get('https://lirtenhub-nav2.herokuapp.com/api/users/'+(this.state.P.current_cons_applied_ids[i]))
      .then(res => {       
        const P = res.data.Data;
        cop.push(P)       
        this.setState({Apconsultancy:cop});
           
      })}}
      
      if(this.state.P.current_members_applied_ids.length==0)
      this.setState({Apmembers:applied})
      else{
      for(let i=0;i<this.state.P.current_members_applied_ids.length;i++){
        axios.get('https://lirtenhub-nav2.herokuapp.com/api/users/'+(this.state.P.current_members_applied_ids[i]))
        .then(res => {       
          const P = res.data.Data;
          applied.push(P)       
          this.setState({Apmembers:applied})
             
        })}}
        
        if(this.state.P.accepted_members_ids.length==0){
        this.setState({Acmembers:accepted})
        
        }
        else{
        for(let i=0;i<this.state.P.accepted_members_ids.length;i++){
          axios.get('https://lirtenhub-nav2.herokuapp.com/api/users/'+(this.state.P.accepted_members_ids[i]))
          .then(res => {       
            const P = res.data.Data;
            accepted.push(P)       
            this.setState({Acmembers:accepted});
          })}}
           if(this.state.P.tasks.length==0){
             this.setState({tasks:TASKS})
             this.setState({done:true})
           }
           else{
             console.log(this.state.P.tasks.length)
          for(let i=0;i<this.state.P.tasks.length;i++){
            axios.get('http://localhost:3000/api/tasks/'+(this.state.P.tasks[i]))
            .then(res =>  {       
              const P = res.data.Data;
              TASKS.push(P)       
              this.setState({tasks:TASKS});
              this.setState({done:true})
            })}}
          
          
          
          
      
          
    })    
    
  })
    
    
  }
  
  render() {  
    
    if(this.state.done==null||this.state.P==null||this.state.skills==null||this.state.UP==null||this.state.consultancy==null||this.state.Apconsultancy==null||this.state.Acmembers==null||this.state.Apmembers==null){
      return <div className="loader center" id="page-content-wrapper"></div>

    
    }
  else{
    console.log(this.state.Apconsultancy)
    return (
      <div id="page-content-wrapper">     
      <span2><h1 >{this.state.P.name}</h1></span2>    
      <p>{this.state.P.description}</p>
      <h2><span>Status :</span> {this.state.P.status}</h2>
      <h1 className="Owner"><span>Owner : </span>{this.state.UP.First_Name+" "+this.state.UP.Last_Name}</h1>
      <h1 className='hello'><span>Expected Duration : </span>{this.state.P.Expected_Duration}</h1>
      <h1 className='hello'><span>Working Started on : </span>{this.state.P.Start_Date}</h1>
      <h1 className='hello'><span>Work Ended On : </span>{this.state.P.End_Date}</h1>
      <h1 className="req">Tasks : </h1>
      <h1 className="req">Requirments :</h1> 
      
        <h2 className="MN">Members Needed : {this.state.P.current_members_count+"/"+this.state.P.members_needed}
        <br></br>
        {"Experience Needed : "+this.state.P.least_exp_level_needed}  
        <br></br>
        {"Commitment Level : "+this.state.P.comitment_level_needed}
        </h2>
        <h1 className="hello">Required Skills : </h1>
        {this.state.skills.map((S)=>(
          <h1 className="skills">{S}</h1>
            ))
        }
        <h1 className="hello">technicalities : </h1>
        <h1 className="skills">{"Compensation : "+this.state.P.price}</h1>
        <h1 className="skills">{"Payment Type : "+this.state.P.Payment_Type}</h1>
        
        {this.state.P.extra_attributes.map((K)=>(
          <h1 className="skills">{K}</h1>
        ))
        }
        
    
      
      
      
      </div>
      


    )
    
  }
}
}

//<h2><span>Descriprtion</span></h2>


export default connect(mapStateToProps)( Single_Project)
