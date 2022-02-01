// import the model
const Question = require("../Models/QuestionsModel");
const jwt = require("jsonwebtoken");
const config = require("config");
const { jwtSecret } = config;

// export the controller functionalities

// @route GET /getQuestions
// @desc Get all questions
// @access Public

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    if (!questions) throw Error("No questions");

    res.status(200).json(questions);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

// @route POST /postQuestion
// @desc add  question
// @access Public

exports.postQuestion = async (req, res) => {
  const newQuestion = new Question({
    title: req.body.title,
    desc: req.body.desc,
  });

  try {
    const question = await newQuestion.save();
    if (!question) throw Error("Something went wrong saving the question");

    res.status(200).json(question);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

// @route DELETE /deleteQuestion/:id
// @desc delete  question
// @access Public

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) throw Error("No question found");

    const removed = await question.remove();
    if (!removed)
      throw Error("Something went wrong while trying to delete the question");

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
};
