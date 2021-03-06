const express = require("express");
const fs = require("fs");
const path = require('path');

//Tells node that we are creating an "express" server
var app = express();

//Sets the port that will be used by heroku or the default.
var PORT = process.env.PORT || 8080;

//Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));


//Makes Heroku look at the 'public' folder
app.use(express.static("public"));

//Connecting the route files
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

//Listener to start the server
app.listen(PORT, function () {
  console.log("App listening on PORT: " + PORT);
});
