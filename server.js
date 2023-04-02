// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes

const express = require("express");

// Start up an instance of app

const app = express();

/* Dependencies */

const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require("cors");

app.use(cors());

// Initialize the main project folder

app.use(express.static("website"));

const port = 8000;

// Spin up the server
// Callback to debug

app.listen(port, () => {
  console.log(`server running on localhost: http://localhost:${port}`);
});

// Initialize all route with a callback function

// Callback function to complete GET '/all'

app.get("/all", (request, response) => {
  response.send(projectData);
});

// Post Route

app.post("/postData", (request, response) => {
  projectData.temperature = request.body.temperature;
  projectData.date = request.body.date;
  projectData.user_response = request.body.user_response;
  response.end();
});
