var friends = require("../data/friends");

module.exports = function(app) {
  // Return all friends found in friends.js as JSON
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    console.log(req.body.answers);

    // Receive user details (name, photo, scores)
    var validUser = req.body;

    // parseInt for answers
    for(var i = 0; i < validUser.answers.length; i++) {
      validUser.answers[i] = parseInt(validUser.answers[i]);
    }

    // default friend match is the first friend but result will be whoever has the minimum difference in scores
    var bestMatchIndex = 0;

    // minimumDifference is 10 because 5-4 =1, and there are 10 questions so 1 *10 = 10
    var minimumDifference = 10;

    // loop through all friends and compare their answers
    // return first the friend comparisons  that have 0 differences = most similar/compatible
    //  whatever the difference is, add to the total difference
    for(var k = 0; k < friends.length; k++) {
      var totalDifference = 0;
      // "j" is the second friend's answer array we will be comparing the "i" friend's answer array
      // friends[i].answers.length is the first friend's answer array
      for(var j = 0; j < friends[i].answers.length; j++) {
        var difference = Math.abs(validUser.answers[j] - friends[i].answers[j]);
        // return the order in increasing differences = most compatible(0 difference) to least compatible(++ difference)
        totalDifference += difference;
      }

      // if there is a new minimum, change the best friend index and set the new minimum for next iteration comparisons
      // minimumDifference is when validUser's answer is 4 (or 5) and the friend that is being compared to , answer's is 5(or 4)
      // Math.abs =>absolute disregards +/- positive or negative numbers and just returns absolute whole, numbers
      // so if the validUser and compared friend answers some questions with the same answer then the total difference would be less than 10
      // in that case, return that friend as the best match"i"
      if(totalDifference < minimumDifference) {
        bestMatchIndex = i;
        // reassign the minimumDifference value with the new total Difference value of the most compatible couple
        minimumDifference = totalDifference;
      }
    }

    // after finding match, add the user to the friends array
    friends.push(validUser);

    // send back to browser the best friend match
    res.json(friends[bestMatchIndex]);
  });
};