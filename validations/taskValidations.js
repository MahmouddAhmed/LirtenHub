const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name: Joi.string().min(5).max(20).required(),
            description: Joi.string().min(30).max(300).required(),
            compensation: Joi.number().required(),
            Payment_Type: Joi.string().required(),
            Consultancy_id: Joi.string(),
            Partner_id: Joi.string().required(),
            project_id: Joi.string().required(),
            main_skill: Joi.string().required(),
            Expected_Duration: Joi.string().required(),
            least_exp_level_needed: Joi.string().min(5).max(30).required(),
            comitment_level_needed: Joi.string().min(10).max(30).required(),
            payment_currency:Joi.string().max(20).required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            name: Joi.string().min(5).max(20),
            description: Joi.string().min(30).max(300),
            compensation: Joi.number(),
            Payment_Type: Joi.string(),
            Consultancy_id: Joi.string(),
            Partner_id: Joi.string(),
            project_id: Joi.string(),
            main_skill: Joi.string(),
            Expected_Duration: Joi.string(),
            least_exp_level_needed: Joi.string().min(5).max(30),
            comitment_level_needed: Joi.string().min(10).max(30),
            payment_currency:Joi.string().max(20)
        }

        return Joi.validate(request, updateSchema)
    },
    updateValidationname: request => {
        const updateSchema = {
            name: Joi.string().min(5).max(50).required(),
        }
        return Joi.validate(request, updateSchema)
    }, 
    
    addskill: request => {
        const updateSchema = {
            Skill: Joi.string().required()
        }
        return Joi.validate(request, updateSchema)
    },
    addattribute: request => {
        const updateSchema = {
            attribute: Joi.string().required()
        }
        return Joi.validate(request, updateSchema)
    },
    updateValidationstatus: request => {
        const updateSchema = {
            status: Joi.string().valid('Allocation','Implementation','Completed').required()
        }
        return Joi.validate(request, updateSchema)
    },
}
