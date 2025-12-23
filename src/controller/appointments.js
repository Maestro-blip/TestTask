const express = require('express');

const appointmentModels = require('../models/appointments.js');

class appointments {

static async create(req,res){
    try{
        const { userID, role } = req.user;

        const currentDate = new Date()
        const validDate = currentDate.toISOString().split("T")[0] 
        const { title, description, date, duration, status} = req.body;

         if(validDate > date )
            return res.status(400).send("Data is not correct");

        if(!userID)
             return res.status(400).send("User didn't login");

        await appointmentModels.create(title, description, date, duration,userID,status);
            return res.status(201).send("Appoint created")

    }catch(err){
        console.error(err);
        res.status(500).send("Create error")
    }

}

static async read(req,res){
    try{
        const { userID, role } = req.user;


        const [result] = await appointmentModels.getAll(userID,role);
        return res.status(200).json(result);

    }catch(err){
        console.error(err);
        res.status(500).send("Read error")
    }
}
static async readById(req,res){
    try{
    const { userID, role } = req.user;
    const appoinID = req.params.id


    const [result] = await appointmentModels.getById(appoinID,userID,role);
    return res.status(200).json(result);
    }catch(err){
        console.error(err);
        res.status(500).send("Read error")
    }
}
static async delete(req,res){
    try{
        const { userID, role } = req.user;
        const appoinID = req.params.id

        await appointmentModels.delete(appoinID,userID,role)

        return res.status(200).json({
            message: "Delete succesfully",
            id: appoinID
        });
    }catch(err){
        console.error(err);
        res.status(500).send("Delete error")
    }
}

}

module.exports = appointments;