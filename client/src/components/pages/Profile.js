import React, { Component } from 'react'
import { Link,Route, BrowserRouter as Router ,Switch } from 'react-router-dom'
import { connect } from "react-redux";

import PropTypes from 'prop-types'
import axios from 'axios'
  class Profile extends Component {
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
Experience_Level:"",
Certificates: "",
// FOR CONSULTANCY AND MEMBER AND PARTNER 
Past_Projects:"",
// ONLY FOR CONSULTANCY
Partners:"",
Board_members:"",
Studies:"",
//ONLY FOR CO-WORKING-SPACE
Business_Plans_Offered:""
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
  this.setState({
    id:user._id,
    Email:user.Email,
    Country:user.Country,
    City:user.City,
    Bio:user.Bio,
    phone_number:user.phone_number,
    Password:user.Password,
    User_Category:user.User_Category,
    First_Name:user.First_Name ,
    Last_Name: user.Last_Name,
    Birth_Date:user.Birth_Date,
    Experience_Level:user.Experience_Level,
    Skills:user.Skills,
Applied_Skills:user.Applied_Skills,
Intrests:user.Intrests,
Experience_Level:user.Experience_Level,
Certificates: user.Certificates,
Past_Projects:user.Past_Projects,
  })
  
  const result=[]
for(let i=0;i<this.state.Skills.length;i++){

  axios.get('http://localhost:3000/api/skills/'+(this.state.Skills[i]))

.then(res => {       

const P2 = res.data.X;     

result.push(P2.Name); 
console.log(P2)    
console.log(result)  
console.log(result)
console.log("3amel ehhh")
this.setState({Skills:result})  


})

}
for(let i=0;i<this.state.Skills.length;i++){

  axios.get('http://localhost:3000/api/skills/'+(this.state.Applied_Skills[i]))

.then(res => {       

const P2 = res.data.X;     

result.push(P2.Name); 
console.log(P2)    
console.log(result) 
this.setState({Applied_Skills:result})  


})

}

}
if(user.User_Category=="Partner"){
  this.setState({
    id:user._id,
    Email:user.Email,
    Country:user.Country,
    City:user.City,
    Bio:user.Bio,
    User_Category:user.User_Category,
    phone_number:user.phone_number,
    Password:user.Password,
    First_Name:user.First_Name,
    Last_Name: user.Last_Name,
    Birth_Date:user.Birth_Date,
    Experience_Level:user.Experience_Level,
    Past_Projects:user.Past_Projects
  })

}
if(user.User_Category=="Partner_CoWorkingSpace"){
  this.setState({
    id:user._id,
    Email:user.Email,
    Country:user.Country,
    City:user.City,
    Bio:user.Bio,
    User_Category:user.User_Category,
    phone_number:user.phone_number,
    Password:user.Password,
    Name:user.Name,
    Established_since:user.Established_since,
    Business_Plans_Offered:user.Business_Plans_Offered
  })

}
if(user.User_Category=="Consulting_Agent"){
  this.setState({
    id:user._id,
    Email:user.Email,
    Country:user.Country,
    City:user.City,
    Bio:user.Bio,
    User_Category:user.User_Category,
    phone_number:user.phone_number,
    Password:user.Password,
    Name:user.Name,
    Established_since:user.Established_since,
    Partners:user.Partners,
Board_members:user.Board_members,
Studies:user.Studies,

  })


}


});

  }

  render() {
    if(this.state.User_Category==null){
      return <div className="loader center"></div>
    }
    const {isLoggedIn,loggedUser,users} = this.props;
    const x = this.props.loggedUser
    console.log(this.state.User_Category)
    console.log("HELLOOOOOOOOOOOO")
    if(this.state.id==loggedUser.id||loggedUser.User_Category=="Admin"){
    if(this.state.User_Category=="Partner"){

      return(
        <div id="page-content-wrapper">
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
      <h3><h3><Link  to={"/Edit/"+x.id} >Edit profile</Link></h3></h3>
      <h3><Link  to={"/Changepw/"+x.id} >Change Password</Link></h3>
              <ul>
                <li><i className="fa fa-road"></i> LirtenHub st</li>
                <li><i className="fa fa-phone"></i> 0777 5000 </li>
                <li><i className="fa fa-envelope"></i> LirtenHub@Lirten.com </li>
              </ul>
            </div>
            <div className="contact">
              <h3>Profile</h3>
              <form method="POST" action="send">
                <p>
                  <label>FirstName</label>
                  <input type="text" value={this.state.First_Name}/>
                </p>
                <p>
                  <label>LastName</label>
                  <input type="text" value={this.state.Last_Name}/>
                </p>
                <p>
                  <label>Email Address</label>
                  <input type="email" value={this.state.Email}/>
                </p>
                <p>
                  <label> Country</label>
                  <input type="text" value={this.state.Country}/>
                </p> <p>
                  <label> City</label>
                  <input type="text"value={this.state.City}/>
                </p> <p>
                  <label> Bio</label>
                  <input type="text" value={this.state.Bio}/>
                </p>
                <p>
                  <label>phone_number </label>
                  <input type="text" value={this.state.phone_number}/>
                </p>
                <p>
                <Link  >Past Projects</Link>
                </p>
               
              </form>
            </div>
          </div>
        </div>
      
      </body>
        </div>
    )

     
    }else if(this.state.User_Category=="Member"){
    
      return(
        <div id="page-content-wrapper">
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
              <h3><Link  to={"/Edit/"+x.id} >Edit profile</Link></h3>
              <h3><Link  to={"/Changepw/"+x.id} >Change Password</Link></h3>
              <ul>
                <li><i className="fa fa-road"></i> LirtenHub st</li>
                <li><i className="fa fa-phone"></i> 0777 5000 </li>
                <li><i className="fa fa-envelope"></i> LirtenHub@Lirten.com </li>
              </ul>
            </div>
            <div className="contact">
              <h3>Profile</h3>
              <form method="POST" action="send">
                <p>
                  <label>FirstName</label>
                  <input type="text" value={this.state.First_Name}/>
                </p>
                <p>
                  <label>LastName</label>
                  <input type="text" value={this.state.Last_Name}/>
                </p>
                <p>
                  <label>Email Address</label>
                  <input type="email" value={this.state.Email}/>
                </p>
                <p>
                  <label> Country</label>
                  <input type="text" value={this.state.Country}/>
                </p> <p>
                  <label> City</label>
                  <input type="text"value={this.state.City}/>
                </p> <p>
                  <label> Bio</label>
                  <input type="text" value={this.state.Bio}/>
                </p>
                <p>
                  <label>phone_number </label>
                  <input type="text" value={this.state.phone_number}/>
                </p>

                <p>
                <Link  >Past Projects</Link>
                </p>
                <p>
                  <label>  Experience Level </label>
                  <input type="text" value={this.state.Experience_Level}/>

                </p>
                <p>
                  <label>   Skills </label>
                  <input type="text" value={this.state.Skills}/>

                </p>
                <p>
                  <label>   Applied Skills </label>
                  <input type="text" value={this.state.Applied_Skills}/>

                </p>
                <p>
                  <label> Intrests   </label>
                  <input type="text" value={this.state.Intrests}/>

                </p>
                <p>
                  <label> Certificates   </label>
                  <input type="text" value={this.state.Certificates}/>

                </p>
              
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
        <div id="page-content-wrapper">
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
              <h3><h3><Link  to={"/Edit/"+x.id} >Edit profile</Link></h3></h3>
              <h3><Link  to={"/Changepw/"+x.id} >Change Password</Link></h3>
              <ul>
                <li><i className="fa fa-road"></i> LirtenHub st</li>
                <li><i className="fa fa-phone"></i> 0777 5000 </li>
                <li><i className="fa fa-envelope"></i> LirtenHub@Lirten.com </li>
              </ul>
            </div>
            <div className="contact">
              <h3>Profile</h3>
              <form method="POST" action="send">
              
              <p>
                  <label>Established Since</label>
                  <input type="text" value={this.state.Established_since}/>
                </p>
                <p>
                  <label>Name</label>
                  <input type="text" value={this.state.Name}/>
                </p>
                <p>
                  <label>Email Address</label>
                  <input type="email" value={this.state.Email}/>
                </p>
                <p>
                  <label> Country</label>
                  <input type="text" value={this.state.Country}/>
                </p> <p>
                  <label> City</label>
                  <input type="text"value={this.state.City}/>
                </p> <p>
                  <label> Bio</label>
                  <input type="text" value={this.state.Bio}/>
                </p>
                <p>
                  <label>phone_number </label>
                  <input type="text" value={this.state.phone_number}/>
                </p>
               
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
      <div id="page-content-wrapper">
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
            <h3><h3><Link  to={"/Edit/"+x.id} >Edit profile</Link></h3></h3>
            <h3><Link  to={"/Changepw/"+x.id} >Change Password</Link></h3>
            <ul>
              <li><i className="fa fa-road"></i> LirtenHub st</li>
              <li><i className="fa fa-phone"></i> 0777 5000 </li>
              <li><i className="fa fa-envelope"></i> LirtenHub@Lirten.com </li>
            </ul>
          </div>
          <div className="contact">
            <h3>Profile</h3>
            <form method="POST" action="send">
            
            <p>
                <label>Established Since</label>
                <input type="text" value={this.state.Established_since}/>
              </p>
              <p>
                <label>Name</label>
                <input type="text" value={this.state.Name}/>
              </p>
              <p>
                <label>Email Address</label>
                <input type="email" value={this.state.Email}/>
              </p>
              <p>
                <label> Country</label>
                <input type="text" value={this.state.Country}/>
              </p> <p>
                <label> City</label>
                <input type="text"value={this.state.City}/>
              </p> <p>
                <label> Bio</label>
                <input type="text" value={this.state.Bio}/>
              </p>
              <p>
                <label>phone_number </label>
                <input type="text" value={this.state.phone_number}/>
              </p>
              <p>
              <Link  >Past Projects</Link>
                </p>
                <p>
                  <label> Partners </label>
                  <input type="text" value={this.state.Partners}/>
                </p>
                <p>
                  <label> Board members </label>
                  <input type="text" value={this.state.Board_members}/>
                </p>
                <p>
                  <label>  Studies </label>
                  <input type="text" value={this.state.Studies}/>
                </p>

            </form>
          </div>
        </div>
      </div>
    
    </body>
      </div>
  )
  }
   
}else{
  if(this.state.User_Category=="Partner"){

    return(
      <div id="page-content-wrapper">
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
   
            <ul>
              <li><i className="fa fa-road"></i> LirtenHub st</li>
              <li><i className="fa fa-phone"></i> 0777 5000 </li>
              <li><i className="fa fa-envelope"></i> LirtenHub@Lirten.com </li>
            </ul>
          </div>
          <div className="contact">
            <h3>Profile</h3>
            <form method="POST" action="send">
              <p>
                <label>FirstName</label>
                <input type="text" value={this.state.First_Name}/>
              </p>
              <p>
                <label>LastName</label>
                <input type="text" value={this.state.Last_Name}/>
              </p>
              <p>
                <label>Email Address</label>
                <input type="email" value={this.state.Email}/>
              </p>
              <p>
                <label> Country</label>
                <input type="text" value={this.state.Country}/>
              </p> <p>
                <label> City</label>
                <input type="text"value={this.state.City}/>
              </p> <p>
                <label> Bio</label>
                <input type="text" value={this.state.Bio}/>
              </p>
              <p>
                <label>phone_number </label>
                <input type="text" value={this.state.phone_number}/>
              </p>
              <p>
              <Link  >Past Projects</Link>
              </p>
             
            </form>
          </div>
        </div>
      </div>
    
    </body>
      </div>
  )

   
  }else if(this.state.User_Category=="Member"){
  
    return(
      <div id="page-content-wrapper">
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
          
            <ul>
              <li><i className="fa fa-road"></i> LirtenHub st</li>
              <li><i className="fa fa-phone"></i> 0777 5000 </li>
              <li><i className="fa fa-envelope"></i> LirtenHub@Lirten.com </li>
            </ul>
          </div>
          <div className="contact">
            <h3>Profile</h3>
            <form method="POST" action="send">
              <p>
                <label>FirstName</label>
                <input type="text" value={this.state.First_Name}/>
              </p>
              <p>
                <label>LastName</label>
                <input type="text" value={this.state.Last_Name}/>
              </p>
              <p>
                <label>Email Address</label>
                <input type="email" value={this.state.Email}/>
              </p>
              <p>
                <label> Country</label>
                <input type="text" value={this.state.Country}/>
              </p> <p>
                <label> City</label>
                <input type="text"value={this.state.City}/>
              </p> <p>
                <label> Bio</label>
                <input type="text" value={this.state.Bio}/>
              </p>
              <p>
                <label>phone_number </label>
                <input type="text" value={this.state.phone_number}/>
              </p>

              <p>
              <Link  >Past Projects</Link>
              </p>
              <p>
                <label>  Experience Level </label>
                <input type="text" value={this.state.Experience_Level}/>

              </p>
              <p>
                <label>   Skills </label>
                <input type="text" value={this.state.Skills}/>

              </p>
              <p>
                <label>   Applied Skills </label>
                <input type="text" value={this.state.Applied_Skills}/>

              </p>
              <p>
                <label> Intrests   </label>
                <input type="text" value={this.state.Intrests}/>

              </p>
              <p>
                <label> Certificates   </label>
                <input type="text" value={this.state.Certificates}/>

              </p>
            
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
      <div id="page-content-wrapper">
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
           
            <ul>
              <li><i className="fa fa-road"></i> LirtenHub st</li>
              <li><i className="fa fa-phone"></i> 0777 5000 </li>
              <li><i className="fa fa-envelope"></i> LirtenHub@Lirten.com </li>
            </ul>
          </div>
          <div className="contact">
            <h3>Profile</h3>
            <form method="POST" action="send">
            
            <p>
                <label>Established Since</label>
                <input type="text" value={this.state.Established_since}/>
              </p>
              <p>
                <label>Name</label>
                <input type="text" value={this.state.Name}/>
              </p>
              <p>
                <label>Email Address</label>
                <input type="email" value={this.state.Email}/>
              </p>
              <p>
                <label> Country</label>
                <input type="text" value={this.state.Country}/>
              </p> <p>
                <label> City</label>
                <input type="text"value={this.state.City}/>
              </p> <p>
                <label> Bio</label>
                <input type="text" value={this.state.Bio}/>
              </p>
              <p>
                <label>phone_number </label>
                <input type="text" value={this.state.phone_number}/>
              </p>
             
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
    <div id="page-content-wrapper">
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
          <ul>
            <li><i className="fa fa-road"></i> LirtenHub st</li>
            <li><i className="fa fa-phone"></i> 0777 5000 </li>
            <li><i className="fa fa-envelope"></i> LirtenHub@Lirten.com </li>
          </ul>
        </div>
        <div className="contact">
          <h3>Profile</h3>
          <form method="POST" action="send">
          
          <p>
              <label>Established Since</label>
              <input type="text" value={this.state.Established_since}/>
            </p>
            <p>
              <label>Name</label>
              <input type="text" value={this.state.Name}/>
            </p>
            <p>
              <label>Email Address</label>
              <input type="email" value={this.state.Email}/>
            </p>
            <p>
              <label> Country</label>
              <input type="text" value={this.state.Country}/>
            </p> <p>
              <label> City</label>
              <input type="text"value={this.state.City}/>
            </p> <p>
              <label> Bio</label>
              <input type="text" value={this.state.Bio}/>
            </p>
            <p>
              <label>phone_number </label>
              <input type="text" value={this.state.phone_number}/>
            </p>
            <p>
            <Link  >Past Projects</Link>
              </p>
              <p>
                <label> Partners </label>
                <input type="text" value={this.state.Partners}/>
              </p>
              <p>
                <label> Board members </label>
                <input type="text" value={this.state.Board_members}/>
              </p>
              <p>
                <label>  Studies </label>
                <input type="text" value={this.state.Studies}/>
              </p>

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
}


function mapStateToProps(state) {
  // console.log(state.authentication.loggedUser)
   
   const { isLoggedIn,loggedUser } = state.authentication;
  const {users} = state.users
   return { isLoggedIn,loggedUser,users };
 }
 export default connect(mapStateToProps)(Profile);