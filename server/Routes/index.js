const express = require('express');
const router = express.Router();

//import the controller
const userController = require('../Controllers/Users');

// declare the routes and bind to controller methods
 
router.post('/userLogin', userController.login);
router.post('/signup', userController.signup);

module.exports = router;