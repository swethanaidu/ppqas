const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

//import the controller
const userController = require("../Controllers/Users");
const questionsController = require("../Controllers/Questions");
const companyController = require("../Controllers/Company");

// declare the routes and bind to controller methods

// Auth/User Routes
router.post("/userLogin", userController.login);
router.post("/signup", userController.signup);
router.get("/getUser", auth, userController.getUser);
router.get("/api/user", userController.getAllUsers);
router.get("/api/user/role", userController.getJuniors);
router.post("/api/user", auth, userController.addJr);
router.delete("/api/user/:id", auth, userController.deleteUser);
router.put("/api/user/:id", userController.convertToSr);
router.get("/api/user/:id", userController.getUSerByID);

//Questions Routes
router.get("/api/questions", questionsController.getQuestions);
router.get("/api/questions/:id", questionsController.getQuestionByID);
router.post("/api/question", auth, questionsController.postQuestion);
router.post("/api/comment/:id", questionsController.postComment);
router.delete(
  "/api/comment/:id/:comment_id",
  questionsController.deleteComment
);
//router.put("/api/comment/:id/:comment_id", questionsController.approveComment);
router.delete("/deleteQuestion/:id", auth, questionsController.deleteQuestion);

//Company Routes
router.get("/api/company", companyController.getCompanies);
router.post("/api/company", auth, companyController.addCompany);
router.delete("/api/company/:id", auth, companyController.deleteComapany);

router.get("/api/ques", function (req, res, next) {});
module.exports = router;
