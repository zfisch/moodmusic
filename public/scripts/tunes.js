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

  //choose chords based on sentiment of each word in a string
  // var analyzeWord = function(str){
  //   var words = str.split(' ');
  //   var word = words[words.length-1];
  //   //TODO: Set up sentiments here!
  //   generateChord(sentiment(word));
  // }
  // 
  

  //TODO: make this depend on the sentiment
  var generateChord = function(val){
    //TODO: design logic for picking next chord based on sentiment and previous chords
    var happyOrSad = happyChords;
    if(val<0){
      happyOrSad = sadChords;
    }
    var rand = Math.floor(Math.random() * Object.keys(happyOrSad).length);
    var chord = Object.keys(happyOrSad)[rand];
    for(var i=0; i<happyOrSad[chord].length; i++){
      playSound(happyOrSad[chord][i]);
    }
  }


  //======================================//
  //              LISTENERS               //
  //======================================//



  $('.tunes').keypress(function(e){
    var key = e.which;
    console.log('key', key)
    // hashAndPlay(key);
    if(key === 32 || key === 46 || key === 188){
      generateChord(analyzeWord($('.tunes').val()).score);
    }
  });


});
