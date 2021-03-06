// import mongoose
const mongoose = require("mongoose");

// create a schema
const Schema = mongoose.Schema;

// we need to declare the fields present in the mongodb collection
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  totalExp: {
    type: Number,
    required: true,
  },
  company: {
    type: String,
    // required: true
  },
  doj: {
    type: String,
    // required: true
  },
  yop: {
    type: String,
    // required: true
  },
});

// create a model using the schema, connect to MongoDB and export the model
module.exports = mongoose.model("User", UserSchema, "USER");
