const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("config");
const routes = require("./Routes");
const path = require("path");

const port = process.env.PORT || 5454;
const app = express();

//DB config
const db = config.get("mongoURI");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// to handle the incoming requests
app.use("/", routes);

// // Serve static files from the React frontend app
// app.use(express.static(path.join(__dirname, "../client/build")));
// // Anything that doesn't match the above, send back index.html
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/../client/build/index.html"));
// });

// Serve client
if (process.env.NODE_ENV === "production") {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, "../client/build")));

  // FIX: below code fixes app crashing on refresh in deployment
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

// connnect to MongoDBabcdefgh
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((resp) => {
    console.log(`Connected to mongoDB !!`);
    app.listen(port, (err) => {
      if (!err) {
        console.log(`Server up and running on port : ${port}`);
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });

// const path = require("path");

// // Serve static files from the React frontend app
// app.use(express.static(path.join(__dirname, "../client/build")));

// // AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/../client/build/index.html"));
// });
