
// The Task Model
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const taskSchema=new Schema({
        name :{
            type:String,
            required:true   
        },
        status :{
            type :String,
            enum:['Allocation','Implementation','Completed'],
            default:'Allocation'
        },
        description:{
            type:String,
            required:true
        },
        compensation:{
            type:Number,
            required:true,
        },
        Payment_Type:{
            type:String,
            enum:['Online','FaceToFace'],
            required:true
        },
        Consultancy_id:{ 
            type:String,
            defualt:null
        },
        Partner_id:{ 
            type:String,
            required:true
        },
        project_id:{ 
            type:String,
            required:true
        },
        current_members_applied_ids:{
            type: [String],
            default:[]
        },
        member_id:{ // the accepted member to work on the task
            type:String,
            defualt:null
        },
        main_skill:{
            type:String,
            required:true
        },
        extra_skills:{
            type:[String],
            default:[]
        },
        extra_attributes:{
            type:[String],
            default:[]
        },
        Expected_Duration:{
            type:String,
            required:true,
        },
        Start_Date:{
            type:Date,
            required:true,
            default:null
        },
        End_Date:{
            type:Date,
            required:false,
            default:null
        },
        
        least_exp_level_needed:{  //Senior-Associate-Executive...
            type:String,
            required:true
           
        },
        comitment_level_needed:{
            type: String,
            required:true,
           
        },
        posted_on:{
            type:Date,
            defualt:new Date()
        } ,
        payment_currency:{
            type:String,
            required:true
        }  
        
    })   


module.exports = Project=mongoose.model('tasks', taskSchema)

