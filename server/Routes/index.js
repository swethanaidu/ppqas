const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

//import the controller
const userController = require('../Controllers/Users');
const questionsController = require('../Controllers/Questions');

// declare the routes and bind to controller methods

// Auth/User Routes
router.post('/userLogin', userController.login);
router.post('/signup', userController.signup);
router.get('/getUser', auth, userController.getUser);
 
//Questions Routes
router.get('/getQuestions',  questionsController.getQuestions);
router.post('/postQuestion',  questionsController.postQuestion);
router.delete('/deleteQuestion/:id',  questionsController.deleteQuestion);

module.exports = router;