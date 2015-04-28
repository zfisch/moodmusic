var sentiment = require('sentiment');

var analyzeSentiment = function(str){
  return sentiment(str);
}