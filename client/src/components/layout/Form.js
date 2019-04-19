import Parser from 'html-react-parser';
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'tachyons'
import axios from 'axios';

class registration extends Component{
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      company: '',
      email: '',
      pass: '',
      phone: ''
    }

  this.onChange = this.onChange.bind(this)
  this.send = this.send.bind(this)

  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
    console.log(e.target.value);

  }
  send(event) {
    event.preventDefault();
  
    axios.post('https://localhost:3000/api/register',{
      name: this.state.name,
      company: this.state.company,
      email: this.state.city,
      pass: this.state.pass,
      phone: this.state.phone
    }).then(res => {
      alert('An Email Have Been Sent To The Admin For Approval')
      
    }).catch(err=>{
      console.log(err);
    })
  }
    render(){
        return(
          <div>
          {/* <div className="header">
          <a href="#" className="logo">LirtenHub</a>
          <div className="header-right">
            <a className="active" href="/">SignIn</a>
            <a href="/SignUp">SignUp</a>
            <a href="/About">About</a>
            <Router>
                      <Link  to={"/Profile/"+x.id} >My profile</Link>
                        <div className="dropdown-content bg-light-green ">
                          
                          <h3>{console.log("hello "+x.id)}</h3>
                          
                        
                      </div>
                      </Router>
          
          </div>
        
        </div> */}
            <div>
            <link rel="shortcut icon" href=""/>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta http-equiv="X-UA-Compatible" content="ie=edge"/>
            <title className = 'Dark-blue'>Registration Form</title>
            <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous"/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.css" />
            <link rel="stylesheet" href="../layout/Form.css"/>
          <body className="mado">
            <div className="container">
              <h1 className="brand"><span>Registration</span> Form</h1>
              <div className="wrapper animated bounceInLeft">
                <div className="company-info">
                  <h3>Registration</h3>
                  <ul>
                    <li><i className="fa fa-road"></i> LirtenHub st</li>
                    <li><i className="fa fa-phone"></i> 0777 5000 </li>
                    <li><i className="fa fa-envelope"></i> LirtenHub@Lirten.com </li>
                  </ul>
                </div>
                <div className="contact">
                  <h3>Create New Account</h3>
                  <form method="POST" action= 'localhost:3000/api/register'>
                    <p>
                      <label>Name</label>
                      <input type="text"  onChange={this.onChange.bind(this)} value={this.state.name} name="name" required/>
                    </p>
                    <p>
                      <label>Company</label>
                      <input type="text"  onChange={this.onChange.bind(this)}value={this.state.company} name="company" required/>
                    </p>
                    <p>
                      <label>Email Address</label>
                      <input type="email" onChange={this.onChange.bind(this)} value={this.state.email}  name="email"required/>
                    </p>
                    <p>
                      <label>Password</label>
                      <input type="password" onChange={this.onChange.bind(this)} value={this.state.pass} name="pass" required/>
                    </p>
                    <p>
                      <label>Repeat Password</label>
                      <input type="password" onChange={this.onChange.bind(this)}name="phone" required/>
                    </p> <p>
                      <label>Phone Number</label>
                      <input type="text" onChange={this.onChange.bind(this)} value={this.state.phone} name="phone" required/>
                    </p>
                    <p>
                      <label>Phone Number</label>
                      <input type="text" onChange={this.onChange.bind(this)} value={this.state.phone} name="phone" required/>
                    </p>
                    <p></p>
                    <p classNameName="full">
                     <span className = 'reg'> <button  onClick={this.send} type="submit" required>Register </button> </span>
                    </p>

                  </form>
                </div>
              </div>
            </div>
          
          </body>
            </div>
            </div>
        )
    }
    

}
export default registration
