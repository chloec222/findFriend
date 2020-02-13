var path = require("path");
var friends = require("../data/friends.js");

module.exports = function(app) {
  // Return all friends found in friends.js as JSON
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });
  // add new user/friend
  app.post("/api/friends", function(req, res) {
    // console.log(req.body.answers);

    // Receive user details (name, photo, scores)
    var validUser = req.body;
    var userAnswer = validUser.answers;
    var minDiff = 0;
    var maxDiff = 100;

    var bestMatchName = "";
    var bestMatchPhoto = "";
    var bestMatchIndex = 0;


    // parseInt for answers
    for(var i = 0; i < userAnswer.length; i++) {
      userAnswer[i] = parseInt(userAnswer[i]);
    }

    // loop through all friends and compare their answers
    // return first the friend comparisons  that have 0 differences = most similar/compatible
    //  whatever the difference is, add to the total difference
    for(var k = 0; k < friends.length; k++) {
      var totalDifference = 0;

      for(var j = 0; j < friends[i].answers.length; j++) {
        var difference = Math.abs(userAnswer[i] - friends[i].answers[j]);
        // return the order in increasing differences = most compatible(0 difference) to least compatible(++ difference)
        totalDifference += difference;
      }

      // if there is a new minimum, change the best friend index and set the new minimum for next iteration comparisons
      // minimumDifference is when validUser's answer is 4 (or 5) and the friend that is being compared to , answer's is 5(or 4)
      // Math.abs =>absolute disregards +/- positive or negative numbers and just returns absolute whole, numbers
      // so if the validUser and compared friend answers some questions with the same answer then the total difference would be less than 10
      // in that case, return that friend as the best match"i"
      if(totalDifference < minDiff) {
        bestMatchIndex = i;
        // reassign the minimumDifference value with the new total Difference value of the most compatible couple
        minDiff = totalDifference;
      }
    }

    // after finding match, add the user to the friends array
    friends.push(validUser);

    // send back to browser the best friend match
    res.json(friends[bestMatchIndex]);
  });
};