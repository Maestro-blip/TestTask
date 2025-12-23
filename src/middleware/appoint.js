const Ajv = require("ajv");
const express = require('express');
const ajv = new Ajv();
const appointSchema = require('../schema/appoint.json')


function validDate(req,res,next){
const validate = ajv.compile(appointSchema)

const valid = validate(req.body)
    if(!valid){
        console.log(validate.errors)
        return res.status(400).json({
            stasus: 400,
            message: "Invalid parametrs"
        })
}

next()
}

module.exports = { validDate }