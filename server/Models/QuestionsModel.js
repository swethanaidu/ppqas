// import mongoose
const mongoose = require('mongoose');

// create a schema
const Schema = mongoose.Schema;

// we need to declare the fields present in the mongodb collection
const QuestionSchema = new Schema(
    {
        title: {
            type: String,
            required: true, 
        },
        desc: {
            type: String,
            required: true
        },
        company_id: {
            type: String,
            // required: true
        },
        student_id: {
            type: String,
            // required: true
        },
        dop: {
            type: Date,
            default: Date.now,
            // required: true
        },
    }
);


// create a model using the schema, connect to MongoDB and export the model
module.exports = mongoose.model('Question', QuestionSchema, 'Question');