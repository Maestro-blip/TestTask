const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userModels = require('../models/user.js');

class users{

    static async register(req,res){
        try{
            const {name, email, password} = req.body;

            const user = await userModels.getByEmail(email)

            if(user)
                return res.status(400).send("This email exist")

            const hashPassword = await bcrypt.hash(password,10);

            const result = await userModels.create(name,email,hashPassword)

            return res.status(201).json({
            message: "User create succesfull",
            UserID: result
        });

        }catch(err){
            console.error(err);
            res.status(501).send("Error")
        }
    }
    static async login(req,res){
        try{
            const { name, email, password } = req.body;

            const user = await userModels.getByEmail(email)

            if(!user)
                return res.status(400).send("This email doesnot exist")

            const validPassword = await bcrypt.compare(password,user.password)

            if(!validPassword)
                return res.status(400).send("This password is not valid");

            const key = jwt.sign({
                userID: user.id,
                role: "User"
            },process.env.jwtSecret)

            return res.json(key)


        }catch(err){
            console.error(err);
            res.status(501)
        }
    }


}
module.exports = users;