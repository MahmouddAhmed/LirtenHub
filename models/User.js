const mongoose = require('mongoose');
const Schema = mongoose.Schema
const UserSchema = new Schema ({
   //All Users 
   Email:{
       type:String,
       required:true
   },
   Hashed_password:{
       type:String,
       required:true
   },
   Join_Date:{
       type:Date,
       default:null
   },
   Valid:{
        type:Boolean,
        default:false
   },
   Membership_expiration_date:{
        type:Date,
        default:null
   },
   Country:{
       type:String,
       required:true
   },
   City:{
       type:String,
       required:true
   },
   Bio:{
       type:String,
       required:true
   },
   Requested_updates_in_profile:{
        type:[],
        default:[]
   },
   Avg_Rating: {
        type: Number,
        default:0.0
    },
   Ratings:{
        type: [String],
        default:[]
    },
   User_Category :{
        type :String,
        enum:['Admin','Member','Consulting_Agent','Partner','Partner_CoWorkingSpace'],
        required:true
   },
   phone_number:{
        type:String,
        required:false
   },
   Islogedin:{
        type:Boolean,
        default:null
   },
   //Partner&Member&Consultancy
   Past_Projects:{
       type:[String],
       default:[]
   },

   //Partner&Member
   First_Name:{
       type:String,
       required:false
   },
   Last_Name:{
       type:String,
       required:false
   },
   Birth_Date:{
       type:Date,
       required:false,
       default: "2016-05-18T16:00:00Z"
   },
   Age:{
       type:Number,
       required:false
   },
   //Member
   Skills:{
        type: [String],
        required:false
   },
   Applied_Skills:{
        type: [String],
        required:false
   },
   Intrests:{
       type:[String],
       required:false
   },
   Experience_Level:{
       type:String,
       required:false
   },
   Certificates: {
    type: [String]
}, 
   //Consultancy Agency & Co_Working
   Name:{
       type:String,
       required:false
   },
   Established_since:{
       type:Date,
       required:false
   },
   //Consultancy Agency 
   Partners:{
       type:[String],
       required:false
   },
   Board_members:{
       type:[String],
       default:[]
   },
   Studies:{
       type:[String],
       required:false
   },
   //Co-Working-Space
   
   Business_Plans_Offered: {
    type: [String],
   },

   Facilites: {//TBH i dont know what this is
    type: [String],
   },
   Locations:{
       type:[String]
   },
   Reservation_requests:{
       type:[String],
       default:[]
   }
   

   
})
module.exports = User = mongoose.model('users', UserSchema)