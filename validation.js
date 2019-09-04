const joi = require('@hapi/joi');

const validRegister = (props) => {
    const schema = {
        name: joi.string()
            .min(6)
            .required(),
        email: joi.string()
            .min(6)
            .required()
            .email(),
        password: joi.string()
            .min(6)
            .required()
    } 
    return joi.validate(props, schema);
}

const validLogin = (props) => {
    const schema = {
        email: joi.string()
            .min(6)
            .required()
            .email(),
        password: joi.string()
            .min(6)
            .required()
    } 
    return joi.validate(props, schema);
}

module.exports.validRegister = validRegister;
module.exports.validLogin = validLogin;