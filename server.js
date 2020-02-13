
// required npm dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// telling node we are creating express server
var app = express();

// setting initial port or port 8080
var PORT = process.env.PORT || 8080;



// For serving of static CSS
app.use('/static', express.static(path.join(__dirname + "/app/public")));

// bodyParser makes it possible for server to interpret the submitted data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));



// telling express server where the API routes are located and act as a map that users will interact with when on app
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});
