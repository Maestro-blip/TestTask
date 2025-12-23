const express = require('express');

const router = express.Router();

const user = require('../controller/user.js')
const middleware = require('../middleware/user.js')


router.post('/register',middleware.validDate,user.register);
router.post('/login',middleware.validDate,user.login);

module.exports = router;