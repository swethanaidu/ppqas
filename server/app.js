const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('config');
const routes = require('./Routes');
const path = require('path');

const port = process.env.PORT ||  5454;
const app = express();

//DB config
const db = config.get('mongoURI');

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// to handle the incoming requests
app.use('/', routes);


// connnect to MongoDBabcdefgh
mongoose.connect(
    db,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(resp => {
    console.log(`Connected to mongoDB !!`);
    app.listen(port, (err) => {
        if (!err) {
            console.log(`Server up and running on port : ${port}`);
        }
    })
})
.catch(err => {
    console.log(err);
})


// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }