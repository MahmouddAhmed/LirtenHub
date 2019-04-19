const Joi = require('joi')

module.exports = {
    createValidationwithoutcons: request => {
        const createSchema = {
            name: Joi.string().min(3).max(50).required(),
            description: Joi.string().min(20).max(500).required(),
            Payment_Type: Joi.string().valid('Online','FaceToFace').required(),
            partner_id: Joi.string().required(),
            need_Consultancy:Joi.boolean().required(),
            main_skill : Joi.string().required(),
            price: Joi.number().required(),
            members_needed:Joi.number().required(),
            least_exp_level_needed: Joi.string().required(),
            comitment_level_needed:Joi.string().required(),
            Expected_Duration :Joi.string().required(),
            payment_currency:Joi.string().min(1).max(20).required()
           
        }

        return Joi.validate(request, createSchema)
    },  
    createValidation: request => {
        const createSchema = {
            name: Joi.string().min(5).max(50).required(),
            description: Joi.string().min(20).max(500).required(),
            Payment_Type: Joi.string().valid('Online','FaceToFace').required(),
            partner_id: Joi.string().required(),
            need_Consultancy:Joi.boolean().required(),
            main_skill : Joi.string(),
            price: Joi.number(),
            members_needed:Joi.number(),
            least_exp_level_needed: Joi.string(),
            comitment_level_needed:Joi.string(),
            Expected_Duration :Joi.string(),
            consultancy_agency_id:Joi.string(),
            payment_currency:Joi.string().max(20).required()
           
        }

        return Joi.validate(request, createSchema)
    },
    UpdateValidation: request => {
        const createSchema = {
            name: Joi.string().min(5).max(50),
            description: Joi.string().min(20).max(500),
            Payment_Type: Joi.string().valid('Online','FaceToFace'),
            main_skill : Joi.string(),
            price: Joi.number(),
            members_needed:Joi.number(),
            least_exp_level_needed: Joi.string(),
            comitment_level_needed:Joi.string(),
            Expected_Duration :Joi.string(),
            consultancy_agency_id:Joi.string(),
            payment_currency:Joi.string().max(20)
           
        }

        return Joi.validate(request, createSchema)
    }, 
    updateValidationapproved: request => {
        const updateSchema = {
            approved: Joi.boolean().required()
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
            status: Joi.string().valid('Initiation','Analysis','Negotiation ','Review','Allocation','Implementation','Completed').required()
            
        }
        return Joi.validate(request, updateSchema)
    },
}