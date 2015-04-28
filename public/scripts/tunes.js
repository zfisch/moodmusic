// var audioCtx = require('./audioContext.js');

$(document).ready(function() {

  
  //======================================//
  //            CONFIGURATION             //
  //======================================//


  //create object to store all key bindings
  var hash = {};

  var notes = {
    1: 'a',
    2: 'bb',
    3: 'b',
    4: 'c',
    5: 'db',
    6: 'd',
    7: 'eb',
    8: 'e',
    9: 'f',
    10: 'gb',
    11: 'g',
    12: 'ab'
  };

  //custom hashing function
  var hashKey = function(key){
    if(!hash[key]){
      var rand = Math.ceil( Math.random() * Object.keys(notes).length );
      hash[key] = rand;
    }
  };



  //======================================//
  //          HELPER FUNCTIONS            //
  //======================================//



  var playSound = function(note){
    play(note);
  }

  var hashAndPlay = function(key){
    if((key<123 && key>96) || (key<90 && key>65)){
      hashKey(key);
      playSound(notes[hash[key]]);
    }
  }



  //======================================//
  //              LISTENERS               //
  //======================================//



  $('.tunes').keypress(function(e){
    var key = e.which;
    hashAndPlay(key);
  });


});
