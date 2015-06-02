$(document).ready(function() {

  
  //======================================//
  //            CONFIGURATION             //
  //======================================//

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

  //Necessary to unmute Web Audio API on IOS.
  window.addEventListener('touchstart', function() {
    var buffer = myContext.createBuffer(1, 1, 22050);
    var source = myContext.createBufferSource();
    source.buffer = buffer;
    source.connect(myContext.destination);
    source.noteOn(0);
  }, false);


  //======================================//
  //          HELPER FUNCTIONS            //
  //======================================//

  var generateChord = function(val){
    var happyOrSad = happyChords;
    if(val<0){
      happyOrSad = sadChords;
    }
    var rand = Math.floor(Math.random() * Object.keys(happyOrSad).length);
    var chord = Object.keys(happyOrSad)[rand];
    chordQueue.unshift(happyOrSad[chord]);
    chordProgression.push(happyOrSad[chord]);
    if (chordProgression.length > 4){
      chordProgression.shift();
    }
  }


  var updateChord = function(){
    setInterval(function(){
      if(chordQueue.length > 0){
        nextChord = chordQueue.pop()
      } else {
        nextChord = chordProgression[0];
        chordProgression.push(chordProgression.shift());
      }
      for (var i=0; i<nowPlaying.length; i++){
        nowPlaying[i].frequency.value = frequencies[nextChord[i]];
      }
    }, 2000);
  };


  //======================================//
  //              LISTENERS               //
  //======================================//


  var counter = 0;
  var progressionInProgress = false;

  $('.tunes').keyup(function(e){
    
    var sentimentScore = analyzeSentiment($('.tunes').val()).score;
    console.log($('.tunes').val(), sentimentScore);

    if (sentimentScore !== currentSentiment){
      updateColor(sentimentScore);
      generateChord(sentimentScore);
    }

    var key = e.which;
    console.log(key);
    if((key<123 && key>96) || (key<90 && key>65)){
      if(counter < 5){
        var note = happyChords.cMaj[counter];
        counter++;
        play(findFrequency(note));
      } else if(!progressionInProgress){
        progressionInProgress = true;
        updateChord();
      }
    }
  });

});
