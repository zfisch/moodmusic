$(document).ready(function() {


  var currentSentiment = 4;

  var colors = {
    0: '#000000', //black
    1: '#eb1426', //red
    2: '#c87337', //orange meh
    3: '#916e78', //gray-purple
    4: '#4fb0a8', //neutral blue
    5: '#484cb7', //indigo-blue
    6: '#ee5b11', //warm-orange
    7: '#b5f10e', //yellow-green
    8: '#3fb5bf', //turqoise
    9: '#eb14a3', //bright pink
  }

  $('body').css('backgroundColor', colors[currentSentiment]);

}