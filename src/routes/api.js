const express = require('express');
const authRouter = require('./auth')
const appointmentsRouter = require('./appointments.js')
const auth = require("../middleware/auth.js")
const router = express.Router();

router.use('/auth',authRouter);
router.use('/appointments',auth.checkToken,appointmentsRouter)


module.exports = router;