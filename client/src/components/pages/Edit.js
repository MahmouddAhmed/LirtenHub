import React, { Component } from 'react'
import { Link,Route, BrowserRouter as Router ,Switch } from 'react-router-dom'
import { connect } from "react-redux";

import PropTypes from 'prop-types'
import axios from 'axios'
  class Edit extends Component {
    constructor(props) {

      super(props);
  
    }
state={
  id:"",
  Email:"" ,
  Country:"" ,
  City:"",
  Bio:"" ,
  User_Category:null,
  phone_number:"",
  Password:"",
  // ONLY FOR MEMBER AND PARTNER 
  First_Name:"" ,
  Last_Name: "",
  Birth_Date: "",
  Experience_Level:"" ,
// ONLY FOR CONSULTANCY AGENCY AND CO WORKING SPACE 
Name:"",
Established_since:"",
//ONLY  FOR MEMBER
Skills:"",
Applied_Skills:"",
Intrests:"",
Intrestsdel:"",
Experience_Level:"",
Certificates: "",
Certificatesdel:"",
// FOR CONSULTANCY AND MEMBER AND PARTNER 
Past_Projects:"",
// ONLY FOR CONSULTANCY
Partners:"",
Board_members:"",
Studies:"",
//ONLY FOR CO-WORKING-SPACE
Business_Plans_Offered:"",
Business_Plans_Offereddel:"",
Board_membersdel:"",
Studiesdel:""
}
componentDidMount() {

  const sendtoaxios='http://localhost:3000/api/users/'+(this.props.match.params.id)

  //const asdas='localhost:3000/api/projects/'+(this.props.match.params.id)

  console.log(sendtoaxios) 

  axios.get(sendtoaxios)

    .then(res => {       

      const user = res.data.Data;
      console.log(user)
if(user.User_Category=="Member"){
this.setState({User_Category:user.User_Category})
}
if(user.User_Category=="Partner"){
  this.setState({User_Category:user.User_Category})
}
if(user.User_Category=="Partner_CoWorkingSpace"){
  this.setState({User_Category:user.User_Category})
}
if(user.User_Category=="Consulting_Agent"){

  this.setState({User_Category:user.User_Category})
}


});
 

  }
  onSubmit = e => {
    const {isLoggedIn,loggedUser,users} = this.props;
    const sendtoaxios='http://localhost:3000/api/users/'+(loggedUser.id)
  
    console.log(sendtoaxios) 
  
    axios.get(sendtoaxios)
  
      .then(res => {       
  
        const user = res.data.Data;
        console.log(user)
  if(user.User_Category=="Member"){
    if(this.state.First_Name==""){
      this.setState({ First_Name:user.First_Name})
    }
    if(this.state.Last_Name==""){
      this.setState({ Last_Name:user.Last_Name})
    }
    
    if(this.state.Email==""){
      this.setState({ Email:user.Email})
    }
    if(this.state.Country==""){
      this.setState({  Country:user.Country})
    }
    if(this.state.City==""){
      this.setState({  City:user.City})
    }
    if(this.state.Bio==""){
      this.setState({    Bio:user.Bio})
    }
    if(this.state.phone_number==""){
      this.setState({ phone_number:user.phone_number})
    }
    if(this.state.User_Category==""){
      this.setState({  User_Category:user.User_Category})
    }
    if(this.state.Experience_Level==""){
      this.setState({  Experience_Level:user.Experience_Level})
    }
    
    axios({
      method: 'put',
      url: 'http://localhost:3000/api/users/'+loggedUser.id,
      data: {
         
        First_Name:this.state.First_Name,
        Last_Name:this.state.Last_Name,
        Email:this.state.Email,
        Country:this.state.Country,
        City:this.state.City,
        Bio:this.state.Bio,
        phone_number:this.state.phone_number,
      
        Experience_Level:this.state.Experience_Level
      }
    })
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/users/Certificate/'+loggedUser.id,
      data: {
         
        Certificate:this.state.Certificates
      }
    })
    axios({
      method: 'delete',
      url: 'http://localhost:3000/api/users/Certificates/'+loggedUser.id,
      data: {
         
        Certificate:this.state.Certificatesdel
      }
    })
    axios({
      method: 'put',
      url: 'http://localhost:3000/api/users/addinterest/'+loggedUser.id,
      data: {
         
        Interest:this.state.Intrests
      }
    })
    axios({
      method: 'delete',
      url: 'http://localhost:3000/api/users/delinterest/'+loggedUser.id,
      data: {
         
        Interest:this.state.Intrestsdel
      }
    })
  }
  if(user.User_Category=="Partner"){

    if(this.state.First_Name==""){
      this.setState({ First_Name:user.First_Name})
    }
    if(this.state.Last_Name==""){
      this.setState({ Last_Name:user.Last_Name})
    }
    
    if(this.state.Email==""){
      this.setState({ Email:user.Email})
    }
    if(this.state.Country==""){
      this.setState({  Country:user.Country})
    }
    if(this.state.City==""){
      this.setState({  City:user.City})
    }
    if(this.state.Bio==""){
      this.setState({    Bio:user.Bio})
    }
    if(this.state.phone_number==""){
      this.setState({ phone_number:user.phone_number})
    }
    if(this.state.User_Category==""){
      this.setState({  User_Category:user.User_Category})
    }
    if(this.state.Experience_Level==""){
      this.setState({  Experience_Level:user.Experience_Level})
    }

    axios({
      method: 'put',
      url: 'http://localhost:3000/api/users/'+loggedUser.id,
      data: {
         
        First_Name:this.state.First_Name,
        Last_Name:this.state.Last_Name,
        Email:this.state.Email,
        Country:this.state.Country,
        City:this.state.City,
        Bio:this.state.Bio,
        phone_number:this.state.phone_number,
      
        Experience_Level:this.state.Experience_Level
        
      }
    })
  }
  if(user.User_Category=="Partner_CoWorkingSpace"){

    if(this.state.Email==""){
      this.setState({ Email:user.Email})
    }
    if(this.state.Country==""){
      this.setState({  Country:user.Country})
    }
    if(this.state.City==""){
      this.setState({  City:user.City})
    }
    if(this.state.Bio==""){
      this.setState({    Bio:user.Bio})
    }
    if(this.state.phone_number==""){
      this.setState({ phone_number:user.phone_number})
    }
    if(this.state.Name==""){
      this.setState({ Name:user.Name})
    }
    if(this.state.Established_since==""){
      this.setState({ Established_since:user.Established_since})
    }
    

  //  Business_Plans_Offered:user.Business_Plans_Offered
    axios({
      method: 'put',
      url: 'http://localhost:3000/api/users/'+loggedUser.id,
      data: {
        Email:this.state.Email,
        Country:this.state.Country,
        City:this.state.City,
        Bio:this.state.Bio,
        phone_number:this.state.phone_number,
        Name:this.state.Name,
        Established_since:this.state.Established_since
      }
    })
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/users/Business_Plans_Offered/'+loggedUser.id,
      data: {
        Plan:this.state.Business_Plans_Offered
      }
    })
    axios({
      method: 'delete',
      url: 'http://localhost:3000/api/users/Business_Plans_Offered/'+loggedUser.id,
      data: {
        Plan:this.state.Business_Plans_Offereddel
      }
    })
  }
  if(user.User_Category=="Consulting_Agent"){
    if(this.state.Email==""){
      this.setState({ Email:user.Email})
    }
    if(this.state.Country==""){
      this.setState({  Country:user.Country})
    }
    if(this.state.City==""){
      this.setState({  City:user.City})
    }
    if(this.state.Bio==""){
      this.setState({    Bio:user.Bio})
    }
    if(this.state.phone_number==""){
      this.setState({ phone_number:user.phone_number})
    }
    if(this.state.Name==""){
      this.setState({ Name:user.Name})
    }
    if(this.state.Established_since==""){
      this.setState({ Established_since:user.Established_since})
    }
   // Board_members:user.Board_members,
//Studies:user.Studies,
  
    axios({
      method: 'put',
      url: 'http://localhost:3000/api/users/'+loggedUser.id,
      data: {
         
        Email:this.state.Email,
        Country:this.state.Country,
        City:this.state.City,
        Bio:this.state.Bio,
        phone_number:this.state.phone_number,
        Name:this.state.Name,
        Established_since:this.state.Established_since
        
      }
    })
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/users/BoardMembers/'+loggedUser.id,
      data: {
        Board_member:this.state.Board_members
      }
    })
    axios({
      method: 'delete',
      url: 'http://localhost:3000/api/users/BoardMembers/'+loggedUser.id,
      data: {
        Board_member:this.state.Board_membersdel
      }
    })
    axios({
      method: 'post',
      url: 'http://localhost:3000/api/users/Studies/'+loggedUser.id,
      data: {
        Studie:this.state.Studies
      }
    })
    axios({
      method: 'delete',
      url: 'http://localhost:3000/api/users/Studies/'+loggedUser.id,
      data: {
        Studie:this.state.Studiesdel
      }
    })

  }  
  
  });
   
    if(this.state.First_Name!="")
    e.preventDefault();
     
  }
  handleInputChange(e){
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  }

  render() {
    if(this.state.User_Category==null){
      return "loading"
    }
    const {isLoggedIn,loggedUser,users} = this.props;
    const x = this.props.loggedUser
    if(this.state.User_Category=="Partner"){

      return(
        <div>
        <link rel="shortcut icon" href=""/>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
        <title>Registration Form</title>
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.css" />
        <link rel="stylesheet" href="../layout/Form.css"/>
      <body>
        <div className="container">
          <h1 className="brand"><span>User</span>Profile</h1>
          <div className="wrapper animated bounceInLeft">
            <div className="company-info">
            <h3><Link  to={"/Profile"} >Back to profile</Link></h3>
            <h3><Link  to={"/Changepw/"+x.id} >Change Password</Link></h3>
              <ul>
                <li><i className="fa fa-road"></i> LirtenHub st</li>
                <li><i className="fa fa-phone"></i> 0777 5000 </li>
                <li><i className="fa fa-envelope"></i> LirtenHub@Lirten.com </li>
              </ul>
            </div>
            <div className="contact">
              <h3>Profile</h3>
              <form onSubmit={this.onSubmit.bind(this)}>
              <p>
                  <label>FirstName</label>
                  <input name="First_Name"type="text"  onChange={e => this.handleInputChange(e)}/>
                </p>
                <p>
                  <label>LastName</label>
                  <input name="Last_Name"type="text" onChange={e => this.handleInputChange(e)}/>
                </p>
                <p>
                  <label>Email Address</label>
                  <input name="Email"type="text"onChange={e => this.handleInputChange(e)}/>
                </p>
                <p>
                  <label> Country</label>
                  <input name="Country"type="text" onChange={e => this.handleInputChange(e)}/>
                </p> <p>
                  <label> City</label>
                  <input name="City"type="text"onChange={e => this.handleInputChange(e)}/>
                </p> <p>
                  <label> Bio</label>
                  <input name="Bio"type="text" onChange={e => this.handleInputChange(e)}/>
                </p>
                <p>
                  <label>phone_number </label>
                  <input name="phone_number"type="text" onChange={e => this.handleInputChange(e)}/>
                </p>
                <p>
                  
                <Link  >Past Projects</Link>
                </p>
                <button type="submit">request these updates</button>
               
              </form>
            </div>
          </div>
        </div>
      
      </body>
        </div>
    )
    
     
    }else if(this.state.User_Category=="Member"){
    
      return(
        <div>
        <link rel="shortcut icon" href=""/>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
        <title>Registration Form</title>
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.css" />
        <link rel="stylesheet" href="../layout/Form.css"/>
      <body>
        <div className="container">
          <h1 className="brand"><span>Edit</span>Profile</h1>
          <div className="wrapper animated bounceInLeft">
            <div className="company-info">
              
            <h3><Link  to={"/Changepw/"+x.id} >Change Password</Link></h3>
              <ul>
                <li><i className="fa fa-road"></i> LirtenHub st</li>
                <li><i className="fa fa-phone"></i> 0777 5000 </li>
                <li><i className="fa fa-envelope"></i> LirtenHub@Lirten.com </li>
              </ul>
            </div>
            <div className="contact">
              <h3>Profile</h3>
              <form onSubmit={this.onSubmit.bind(this)}>
                <p>
                  <label>FirstName</label>
                  <input name="First_Name"type="text"  onChange={e => this.handleInputChange(e)}/>
                </p>
                <p>
                  <label>LastName</label>
                  <input name="Last_Name"type="text" onChange={e => this.handleInputChange(e)}/>
                </p>
                <p>
                  <label>Email Address</label>
                  <input name="Email"type="text"onChange={e => this.handleInputChange(e)}/>
                </p>
                <p>
                  <label> Country</label>
                  <input name="Country"type="text" onChange={e => this.handleInputChange(e)}/>
                </p> <p>
                  <label> City</label>
                  <input name="City"type="text"onChange={e => this.handleInputChange(e)}/>
                </p> <p>
                  <label> Bio</label>
                  <input name="Bio"type="text" onChange={e => this.handleInputChange(e)}/>
                </p>
                <p>
                  <label>phone_number </label>
                  <input name="phone_number"type="text" onChange={e => this.handleInputChange(e)}/>
                </p>
                <p>
                  <label>  Experience Level </label>
                  <input name="Experience_Level"type="text" onChange={e => this.handleInputChange(e)}/>

                </p>
                <p>
                  <label> add Intrests   </label>
                  <input name="Intrests"type="text" onChange={e => this.handleInputChange(e)}/>

                </p>
                <p>
                  <label> delete Intrests   </label>
                  <input name="Intrestsdel"type="text" onChange={e => this.handleInputChange(e)}/>

                </p>
                <p>
                  <label> add Certificates   </label>
                  <input name="Certificates"type="text" onChange={e => this.handleInputChange(e)}/>

                </p>
                <p>
                  <label> delete Certificates   </label>
                  <input name="Certificatesdel"type="text" onChange={e => this.handleInputChange(e)}/>

                </p>
                <p>
                <Link  >Past Projects</Link>
                </p>
               
                <button type="submit">request these updates</button>
               
    
              
              </form>
            </div>
          </div>
        </div>
      
      </body>
        </div>
    )


    }
    if(this.state.User_Category=="Partner_CoWorkingSpace"){
      
      return(
        <div>
        <link rel="shortcut icon" href=""/>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
        <title>Profile Form</title>
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"/>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.css" />
        <link rel="stylesheet" href="../layout/Form.css"/>
      <body>
        <div className="container">
          <h1 className="brand"><span>User</span>Profile</h1>
          <div className="wrapper animated bounceInLeft">
            <div className="company-info">
            <h3><Link  to={"/Profile"} >Back to profile</Link></h3>
            <h3><Link  to={"/Changepw/"+x.id} >Change Password</Link></h3>
              <ul>
                <li><i className="fa fa-road"></i> LirtenHub st</li>
                <li><i className="fa fa-phone"></i> 0777 5000 </li>
                <li><i className="fa fa-envelope"></i> LirtenHub@Lirten.com </li>
              </ul>
            </div>
            <div className="contact">
              <h3>Profile</h3>
              <form onSubmit={this.onSubmit.bind(this)}>
              
              <p>
                  <label>Established Since</label>
                  <input name="Established_since"type="text" onChange={e => this.handleInputChange(e)}/>
                </p>
                <p>
                  <label>Name</label>
                  <input name="Name" type="text"  onChange={e => this.handleInputChange(e)}/>
                </p>
                <p>
                  <label>Email Address</label>
                  <input name="Email" type="email"  onChange={e => this.handleInputChange(e)}/>
                </p>
                <p>
                  <label> Country</label>
                  <input name="Country"type="text"  onChange={e => this.handleInputChange(e)}/>
                </p> <p>
                  <label> City</label>
                  <input name="City"type="text" onChange={e => this.handleInputChange(e)}/>
                </p> <p>
                  <label> Bio</label>
                  <input name="Bio"type="text" onChange={e => this.handleInputChange(e)}/>
                </p>
                <p>
                  <label>phone_number </label>
                  <input name="phone_number"type="text" onChange={e => this.handleInputChange(e)}/>
                </p>
                <p>
                  <label>add a business plan </label>
                  <input name="Business_Plans_Offered"type="text" onChange={e => this.handleInputChange(e)}/>
                </p>
                <p>
                  <label>delete a business plan </label>
                  <input name="Business_Plans_Offereddel"type="text" onChange={e => this.handleInputChange(e)}/>
                </p>
                <button type="submit">request these updates</button>
               
              </form>
            </div>
          </div>
        </div>
      
      </body>
        </div>
    )



    }
  if(this.state.User_Category=="Consulting_Agent"){

    return(
      <div>
      <link rel="shortcut icon" href=""/>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
      <title>Profile Form</title>
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.css" />
      <link rel="stylesheet" href="../layout/Form.css"/>
    <body>
      <div className="container">
        <h1 className="brand"><span>User</span>Profile</h1>
        <div className="wrapper animated bounceInLeft">
          <div className="company-info">
          <h3><Link  to={"/Profile"} >Back to profile</Link></h3>
          <h3><Link  to={"/Changepw/"+x.id} >Change Password</Link></h3>
            <ul>
              <li><i className="fa fa-road"></i> LirtenHub st</li>
              <li><i className="fa fa-phone"></i> 0777 5000 </li>
              <li><i className="fa fa-envelope"></i> LirtenHub@Lirten.com </li>
            </ul>
          </div>
          <div className="contact">
            <h3>Profile</h3>
            <form onSubmit={this.onSubmit.bind(this)}>
            
            <p>
                <label>Established Since</label>
                <input name=""type="text" onChange={e => this.handleInputChange(e)}/>
              </p>
              <p>
                <label>Name</label>
                <input name=""type="text" onChange={e => this.handleInputChange(e)}/>
              </p>
              <p>
                <label>Email Address</label>
                <input name=""type="email" onChange={e => this.handleInputChange(e)}/>
              </p>
              <p>
                <label> Country</label>
                <input name=""type="text" onChange={e => this.handleInputChange(e)}/>
              </p> <p>
                <label> City</label>
                <input name=""type="text"onChange={e => this.handleInputChange(e)}/>
              </p> <p>
                <label> Bio</label>
                <input name=""type="text" onChange={e => this.handleInputChange(e)}/>
              </p>
              <p>
                <label>phone_number </label>
                <input name=""type="text" onChange={e => this.handleInputChange(e)}/>
              </p>
             
                <p>
                  <label> Partners </label>
                  <input name=""type="text" onChange={e => this.handleInputChange(e)}/>
                </p>
                <p>
                  <label> add Board members </label>
                  <input name=""type="text" onChange={e => this.handleInputChange(e)}/>
                </p>
                <p>
                  <label> add Studies </label>
                  <input name=""type="text" onChange={e => this.handleInputChange(e)}/>
                </p>
                <p>
                  <label> delete Studies </label>
                  <input name="Studiesdel"type="text" onChange={e => this.handleInputChange(e)}/>
                </p>
                <p>
                  <label> delete Board members </label>
                  <input name="Board_membersdel" type="text" onChange={e => this.handleInputChange(e)}/>
                </p>
                <p>
              <Link  >Past Projects</Link>
                </p>
                <button type="submit">request these updates</button>
            </form>
          </div>
        </div>
      </div>
    
    </body>
      </div>
  )
  }
   
  
}
}


function mapStateToProps(state) {
  // console.log(state.authentication.loggedUser)
   
   const { isLoggedIn,loggedUser } = state.authentication;
  const {users} = state.users
   return { isLoggedIn,loggedUser,users };
 }
 export default connect(mapStateToProps)(Edit);