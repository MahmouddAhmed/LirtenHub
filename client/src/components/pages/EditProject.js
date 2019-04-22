import Parser from 'html-react-parser';
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'tachyons'
import { Link,Route, BrowserRouter as Router ,Switch } from 'react-router-dom'
import { connect } from "react-redux";
import axios from 'axios';

class EditProject extends Component{
  constructor(props) {
    super(props);
    this.y = 0
    this.arr = Array()  
    this.y2 = 0
    this.arr2 = Array() 
    this.state = {
        name: '',
        description: '',
        Payment_Type: '',
        need_Consultancy: '',
        main_skill: '',
        price: 0,
        members_needed: 0,
        least_exp_level_needed: '',
        comitment_level_needed: '',
        Expected_Duration:'',
        payment_currency:'',
        extra_skills:[],
        done:null,
        error:null,
        stat : null,
        skills:[],
        extra_attributes:[]
    }
    this.onChange = this.onChange.bind(this)
    this.handleSubmitAddLocation = this.handleSubmitAddLocation.bind(this)
    this.onClick = this.onClick.bind(this)
    this.add_element_to_array = this.add_element_to_array.bind(this)
    this.add_element_to_array2 = this.add_element_to_array2.bind(this)
  }
  onClick(e) {
    console.log(e.target.value)
}
onChange(e) {
  this.setState({ [e.target.name]: e.target.value })
  console.log(e.target.value);

}
componentDidMount() {
    let projects = [];
    axios.get(`https://lirtenhub-nav2.herokuapp.com/api/Skills/`)
         .then(res => {
        const L = res.data.skill;
        this.setState({skills:L });
        this.setState({done:true})
        console.log(L)
        

      })
    }
  handleSubmitAddLocation(event) {
    const {isLoggedIn,loggedUser,users} = this.props;

      event.preventDefault();
      axios.put(`https://lirtenhub-nav2.herokuapp.com/api/projects/`, {
      
        name: this.state.name,
        description: this.state.description,
        Payment_Type: this.state.Payment_Type,
        partner_id:loggedUser.id,
        need_Consultancy: this.props.stat,
        main_skill: this.state.main_skill,
        price: this.state.price,
        members_needed: this.state.members_needed,
        least_exp_level_needed: this.state.least_exp_level_needed,
        comitment_level_needed: this.state.comitment_level_needed,
        Expected_Duration:this.state.Expected_Duration,
        payment_currency:this.state.payment_currency,

      }).then(res => {
        this.setState({
          redirect: res.data
        })
        this.setState({done:true})

        console.log(res.data)
      }).catch(err=>{
        console.log(err)
        this.setState({error: true})
      })
    }
    add_element_to_array()
    {
     
      this.arr[this.y]= document.getElementById("text1").value ;
      document.getElementById("text1").value = "";
      this.y = this.y+1; 
      this.setState({extra_skills: this.arr}) 

      console.log(this.arr)
 

    }
    add_element_to_array2()
    {
     
      this.arr2[this.y2]= document.getElementById("text2").value ;
      document.getElementById("text2").value = "";
      this.y2 = this.y2+1; 
      this.setState({extra_attributes: this.arr2}) 

      console.log(this.arr2)
 

    }
    render(){
        if(this.state.skills!=[]){
            const skillaya = this.state.skills;
             var skil = skillaya.map((Skill) =>
                    <option  >{Skill.Name + ''}</option>
                );
        }
        return(
            <div >
                    <link rel="shortcut icon" href=""/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <title>Application Form</title>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.css" />
                    <link rel="stylesheet" href="../layout/Form.css"/>
                    <div className="container">
                      <div className="wrapper animated bounceInLeft">
                        <div className="company-info">
                          <h1>Edit Project</h1>
                          <ul>
                          
                          </ul>
                        </div>
                       
                        <div className="contact">
                            <h3>Edit Project Data</h3>
                            <form onSubmit={this.handleSubmitAddLocation} className="Field">
                              <p>
                                <label>Project Name</label>
                                <input type="text" name="name" onChange={this.onChange} value={this.state.name} required/>
                              </p>
                              <p>
                                <label>Number of Members Needed</label>
                                <input type="number" min="0" max="10" step="0.5" value="7" name="members_needed" onChange={this.onChange} value={this.state.members_needed} required/>
                              </p>
                              <p>
                                <label>Commitment Level</label>
                                <input type="number" min="0" max="10" step="0.5" value="7" name="comitment_level_needed" onChange={this.onChange} value={this.state.comitment_level_needed} required/>
                              </p>
                              <p>
                                <label>Expected_Duration (In Weeks)</label>
                                <input type="number"min="0" max="100" step="1" value="7" name="Expected_Duration" onChange={this.onChange} value={this.state.Expected_Duration} required/>
                              </p>
                              <p>
                              <label>Extra Skill</label>
                              <input type="text" id="text1" name='m' onChange={this.onChange}  required></input>
                              <input className = 'ss'type="button" id="button1" value="Add" onClick= {this.add_element_to_array} ></input>
                              </p>
                              <p>
                                <label>Main Skill</label>
                              <select className ='ss'name="search_categories" id="search_categories" onClick={this.onChange} rows="3" required>
                                {skil } 
                              </select>
                              </p>
                              <p>
                                <label>Payment Currency</label>
                                <input type="text" name="payment_currency" onChange={this.onChange} value={this.state.payment_currency} required/>
                              </p>
                              <p>
                              <label>Payment Type</label>
                                <select
                                    id="business"
                                    name="business"
                                    onChange={this.onChange}
                                    required
                                    className ='ss'
                                    >   
                                    {/* <option name = 'X' value='Payment_Type' onClick = {this.onClick}></option> */}

                                    <option name = 'Online' value='Online' >Online</option>
                                    <option name = 'FaceToFace' value='FaceToFace' >FaceToFace</option>
                                    
                                </select>  </p>
                                {/* <p>
                      <label>Extra Attributes</label>
                      <textarea name="text" id="text1" onChange={this.onChange.bind(this)} value={this.state.extra_attributes} ></textarea>
                      <input type="button" id="button1" value="Add" onClick= {this.add_element_to_array()} ></input>

                      </p> */}
                                  <p>
                              <label>Extra Attributes</label>
                              <textarea type="text" id="text2" name='m' rows='5' onChange={this.onChange}  ></textarea>
                              <input className = 'ss'type="button" id="button1" value="Add" onClick= {this.add_element_to_array2} ></input>
                              
                              </p>
                              {/* <p>
                              <label>Extra Skill</label>
                              <textarea name="extra_skills" rows="3" onChange={this.onChange.bind(this)} value={this.state.extra_skills} required></textarea>
                              </p> */}
                          
                              <p>
                              <label>Description</label>
                              <textarea name="description" rows="5" onChange={this.onChange} value={this.state.description} required></textarea>
                              </p>
                              <p></p>
                            <p></p>
                              <p className="ful">
                               <span className = 'reg'> <button type="submit">Submit</button> </span>
                              </p>

                            </form>
                          </div>
                        </div>
                      </div>
                    
                      </div>

        )
    }
    

}
function mapStateToProps(state) {
  // console.log(state.authentication.loggedUser)
   
   const { isLoggedIn,loggedUser } = state.authentication;
  const {users} = state.users
   return { isLoggedIn,loggedUser,users };
 }
export default connect(mapStateToProps) (EditProject)
