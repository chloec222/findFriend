
// npm dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

var PORT = process.env.PORT || 8080;

var connection = mysql.createConnection(
  process.env.JAWSDB_URL || {
    host: '',
    port: 3306,
    user: '',
    password: '	',
    database: ''
  }
);

module.exports = connection;


// For serving of static CSS
app.use(express.static(__dirname + "/app/public/style.css"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// API and HTML routes
require("/app/routing/apiRoutes.js")(app);
require("/app/routing/htmlRoutes.js")(app);

app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});
