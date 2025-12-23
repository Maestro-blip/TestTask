const express = require('express');

const router = express.Router();
const AppointController = require('../controller/appointments.js')
const AppointMiddleware = require('../middleware/appoint.js')

router.post('/',AppointMiddleware.validDate,AppointController.create);
router.get('/me',AppointController.read);
router.get('/me/:id',AppointController.readById);
router.delete('/me/:id',AppointController.delete);

module.exports = router; 