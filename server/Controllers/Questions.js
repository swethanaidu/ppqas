const Question = require("../Models/QuestionsModel");
const Company = require("../Models/CompanyModel");
const jwt = require("jsonwebtoken");
const config = require("config");
const { jwtSecret } = config;

// export the controller functionalities

// @route GET /getQuestions
// @desc Get all questions
// @access Public

exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.aggregate([
      {
        $lookup: {
          from: "Company",
          localField: "company_id",
          foreignField: "_id",
          as: "Company_data",
        },
      },
      {
        $unwind: "$Company_data",
      },
      {
        $lookup: {
          from: "USER",
          localField: "user",
          foreignField: "_id",
          as: "user_data",
        },
      },
      {
        $unwind: "$user_data",
      },
    ]);
    if (!questions) throw Error("No questions");

    res.status(200).json(questions);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

// @route GET /getQuestionByID
// @desc Get Question by ID
// @access Public

exports.getQuestionByID = async (req, res) => {
  try {
    const mongoose = require("mongoose");
    // let id = req.params.id;
    //  const question = await Question.findById(req.params.id);
    const questions = await Question.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },

      {
        $lookup: {
          from: "Company",
          localField: "company_id",
          foreignField: "_id",
          as: "Company_data",
        },
      },
      {
        $unwind: "$Company_data",
      },
      {
        $lookup: {
          from: "USER",
          localField: "user",
          foreignField: "_id",
          as: "user_data",
        },
      },
      {
        $unwind: "$user_data",
      },
    ]);
    if (!questions) throw Error("No questions");

    res.status(200).json(questions);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

// exports.getQuestions = async (req, res) => {
//   try {
//     const questions = await Question.find();
//     if (!questions) throw Error("No questions");

//     res.status(200).json(questions);
//   } catch (e) {
//     res.status(400).json({ msg: e.message });
//   }
// };

// @route POST /post/question
// @desc post question
// @access Public

exports.postQuestion = async (req, res) => {
  const newQuestion = new Question({
    user: req.body.user,
    name: req.body.name,
    company_id: req.body.company_id,
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

// @route POST /post/question/comment
// @desc post question
// @access Public

exports.postComment = async (req, res) => {
  // const newComment = new Question({
  //   user: req.body.user,
  //   name: req.body.name,
  //   text: req.body.text,
  // });

  try {
    const post = await Question.findById(req.params.id);
    const newComment = {
      user: req.body.user,
      name: req.body.name,
      text: req.body.text,
    };
    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
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
