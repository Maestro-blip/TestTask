const express = require('express');

const router = express.Router();
const AppointController = require('../controller/appointments.js')


router.post('/',AppointController.create);
router.get('/me',AppointController.read);
router.get('/me/:id',AppointController.readById);
router.delete('/me/:id',AppointController.delete);

module.exports = router; 