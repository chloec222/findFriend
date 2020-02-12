<<<<<<< HEAD
var path = require("path");

module.exports = function(app) {
	// if user enters survey in URL or presses survey button, serves the survey HTML file
	app.get("/survey", function(req, res) {
		res.sendFile(path.join(__dirname, "/../public/survey.html"));
	});

	// fallback use route for homepage
	app.use(function(req, res) {
		res.sendFile(path.join(__dirname, "/../public/survey.html"));
	});
=======
var path = require("path");

module.exports = function(app) {
	// if user enters survey in URL or presses survey button, serves the survey HTML file
	app.get("/survey", function(req, res) {
		res.sendFile(path.join(__dirname, "/../public/survey.html"));
	});

	// fallback use route for homepage
	app.use(function(req, res) {
		res.sendFile(path.join(__dirname, "/../public/survey.html"));
	});
>>>>>>> 3724a37fd75dcf33c6b9efc82c3d7e5d846cc91d
};