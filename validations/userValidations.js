const Joi = require('joi')

module.exports = {
    loginValidation: request => {
        const loginSchema = {
            Email: Joi.string().email().required(),
            Password: Joi.string().required()
        }
        return Joi.validate(request, loginSchema)
    },
    registerValidationM:request=>{
        const registerSchema ={
            Email: Joi.string().min(10).max(50).required(),
            Country: Joi.string().min(3).max(30).required(),
            City:Joi.string().max(20).required(),
            Bio: Joi.string().min(10).max(500).required(),
            User_Category:Joi.string().required(),
            First_Name: Joi.string().min(3).max(20).required(),
            Last_Name: Joi.string().min(3).max(20).required(),
            Birth_Date: Joi.date().required(),
            Experience_Level: Joi.string().min(3).max(30).required(),
            phone_number:Joi.number(),
            Password:Joi.string()

        }
        return Joi.validate(request, registerSchema)
    },
    registerValidationP:request=>{
        const registerSchema ={
            Email: Joi.string().min(3).max(50).required(),
            Country: Joi.string().min(4).max(30).required(),
            City:Joi.string().max(20).required(),
            Bio: Joi.string().max(500).required(),
            User_Category:Joi.string().required(),
            First_Name: Joi.string().min(3).max(20).required(),
            Last_Name: Joi.string().min(3).max(20).required(),
            Birth_Date: Joi.date().required(),
            phone_number:Joi.number(),
            Password:Joi.string()

        }
        return Joi.validate(request, registerSchema)
    },
    registerValidationCons:request=>{
        const registerSchema ={
            Email: Joi.string().min(3).max(50).required(),
            Country: Joi.string().min(4).max(30).required(),
            City:Joi.string().max(20).required(),
            Bio: Joi.string().max(500).required(),
            User_Category:Joi.string().required(),
            Name:Joi.string().required(),
            Established_since:Joi.date().required(),
            phone_number:Joi.number(),
            Password:Joi.string()
        }
        return Joi.validate(request, registerSchema)
    },
    registerValidationCOWS:request=>{
        const registerSchema ={
            Email: Joi.string().min(3).max(50).required(),
            Country: Joi.string().min(4).max(30).required(),
            City:Joi.string().max(20).required(),
            Bio: Joi.string().max(500).required(),
            User_Category:Joi.string().required(),
            Name:Joi.string().required(),
            Established_since:Joi.date().required(),
            phone_number:Joi.number(),
            Password:Joi.string()

        }
        return Joi.validate(request, registerSchema)
    },
    updateValidationM:request=>{
        const updateSchema ={
            Email: Joi.string().min(10).max(50),
            Country: Joi.string().min(3).max(30),
            City:Joi.string().max(20),
            Bio: Joi.string().min(10).max(500),
            First_Name: Joi.string().min(3).max(20),
            Last_Name: Joi.string().min(3).max(20),
            Birth_Date: Joi.date(),
            Experience_Level: Joi.string().min(3).max(30),
            phone_number:Joi.number()

        }
        return Joi.validate(request, updateSchema)
    },
    updateValidationP:request=>{
        const updateSchema ={
            Email: Joi.string().min(3).max(50),
            Country: Joi.string().min(4).max(30),
            City:Joi.string().max(20),
            Bio: Joi.string().max(500),
            First_Name: Joi.string().min(3).max(20),
            Last_Name: Joi.string().min(3).max(20),
            Birth_Date: Joi.date(),
            Experience_Level: Joi.string().min(3).max(30),
            phone_number:Joi.number()

        }
        return Joi.validate(request, updateSchema)
    },
    updateValidationCons:request=>{
        const updateSchema ={
            Email: Joi.string().min(3).max(50),
            Country: Joi.string().min(4).max(30).reqired(),
            City:Joi.string().max(20),
            Bio: Joi.string().max(500),
            Name:Joi.string(),
            Established_since:Joi.date(),
            phone_number:Joi.number()

        }
        return Joi.validate(request, updateSchema)
    },
    updateValidationCOWS:request=>{
        const updateSchema ={
            Email: Joi.string().min(3).max(50),
            Country: Joi.string().min(4).max(30),
            City:Joi.string().max(20),
            Bio: Joi.string().max(500),
            Name:Joi.string(),
            Established_since:Joi.date(),
            phone_number:Joi.number()

        }
        return Joi.validate(request, updateSchema)
    }
}
