const Ajv = require("ajv");
const express = require('express');
const ajv = new Ajv();
const userSchema = require('../schema/user.json')


function validDate(req,res,next){
const validate = ajv.compile(userSchema)

const valid = validate(req.body)
    if(!valid){
        console.log(validate.errors)
        return res.status(400).send('bed data')
}

next()
}

module.exports = { validDate }
