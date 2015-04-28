
//======================================//
//              COLORS                  //
//======================================//

var currentSentiment;

var colors = {
  0: '#000000', //black
  1: '#eb1426', //red
  2: '#c87337', //orange meh
  3: '#6B0A91', //purple
  4: '#4fb0a8', //neutral blue
  5: '#484cb7', //indigo-blue
  6: '#3fb5bf', //turqoise
  7: '#ee5b11', //warm-orange
  8: '#3fb5bf', //turqoise
  9: '#eb14a3', //bright pink
  10: '#eb14a3' //bright pink
}

//changes bg color based on sentiment
var updateColor = function(sentimentScore){
  
  if(sentimentScore <= -10){
    currentSentiment = 0;
  } else if (sentimentScore <= -4){
    currentSentiment = 1;
  } else if (sentimentScore <= -3){
    currentSentiment = 2;
  } else if (sentimentScore <= -2){
    currentSentiment = 3;
  } else if (sentimentScore <= -1){
    currentSentiment = 4;
  } else if (sentimentScore === 0){
    currentSentiment = 5;
  } else if (sentimentScore <= 1){
    currentSentiment = 6;
  } else if (sentimentScore <= 2){
    currentSentiment = 7;
  } else if (sentimentScore <= 3){
    currentSentiment = 8;
  } else if (sentimentScore <= 4){
    currentSentiment = 9;
  } else if (sentimentScore > 5){
    currentSentiment = 10;
  }

  $('body').css('backgroundColor', colors[currentSentiment]);


}
