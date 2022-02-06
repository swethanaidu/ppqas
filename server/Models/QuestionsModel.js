// import mongoose
const mongoose = require("mongoose");

// create a schema
const Schema = mongoose.Schema;

// we need to declare the fields present in the mongodb collection
const QuestionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
  },
  name: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  company_id: {
    type: Schema.Types.ObjectId,
    // required: true
  },
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
      name: {
        type: String,
      },
      text: {
        type: String,
        required: true,
      },
      doc: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  dop: {
    type: Date,
    default: Date.now,
  },
});

// create a model using the schema, connect to MongoDB and export the model
module.exports = mongoose.model("Question", QuestionSchema, "Question");
