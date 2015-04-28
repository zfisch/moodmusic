var sentiment = require('sentiment');

var analyzeWord = function(str){
  var words = str.split(' ');
  var word = words[words.length-1];
  //TODO: Set up sentiments here!
  var result = sentiment(word);
  return result;
}