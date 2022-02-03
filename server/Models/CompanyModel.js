// import mongoose
const mongoose = require("mongoose");

// create a schema
const Schema = mongoose.Schema;

// we need to declare the fields present in the mongodb collection
const CompanySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  ceo: {
    type: String,
    required: true,
  },
  foundedYear: {
    type: String,
    required: true,
  },
  no_OfEmps: {
    type: String,
    // required: true
  },
  locations: {
    type: String,
    // default: Date.now,
    // required: true
  },
});

// create a model using the schema, connect to MongoDB and export the model
module.exports = mongoose.model("Company", CompanySchema, "Company");
