
// The Project Model
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ProjectSchema=new Schema({
        name :{
            type:String,
            required:true   
        },
        status :{
            type :String,
            enum:['Initiation','Analysis','Negotiation ','Review','Allocation','Implementation','Completed'],
            default:'Initiation'
        },
        approved:{
            type: Boolean,
            default:null
        },
        description:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:false,
            default:null
        },
        Payment_Type:{
            type:String,
            enum:['Online','FaceToFace'],
            required:true
        },
        partner_id:{
            type:String,
            required:true
        },
        need_Consultancy:{
            type :Boolean,
            required:true
        },
        consultancy_agency_id:{
            type:String,
            required:false,
            default:null
        },
        current_cons_applied_ids:{
            type: [String],
            default:[]
        },
        members_needed:{
            type:Number,
            default:1
        },
        current_members_count:{
            type:Number,
            default:0
        },
        current_members_applied_ids:{
            type: [String],
            default:[]
        },
        accepted_members_ids:{
            type:[String],
            defualt:[]
        },
        main_skill:{
            type:String,
            defualt:null
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
            required:false,
            default:null
        },
        Start_Date:{
            type:Date,
            required:false,
            default:null
        },
        End_Date:{
            type:Date,
            required:false,
            default:null
        },
        
        least_exp_level_needed:{  //Senior-Associate-Executive...
            type:String,
            required:false,
            default:null
        },
        comitment_level_needed:{
            type: String,
            required:false,    
            default:null
        },
        tasks :{ // if the project needed a consultancy
            type:[String],
            default:[]
        },
        posted_on:{
            type:Date,
            defualt:new Date()
        },
        payment_currency:{
            type:String,
            required:true
        }  
        
    })   


module.exports = Project=mongoose.model('Projects', ProjectSchema)

