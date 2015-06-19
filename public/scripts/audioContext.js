
//======================================//
//            CONFIGURATION             //
//======================================//

var frequencies = {
  a0: 220.00,
  bb0: 233.08,
  b0: 246.94,
  c0: 261.63,
  db0: 277.18,
  d0: 293.66,
  eb0: 311.13,
  e0: 329.63,
  f0: 349.23,
  gb0: 369.99,
  g0: 392.00,
  ab0: 415.30,
  a: 440.00,
  bb: 466.16,
  b: 493.88,
  c: 523.25,
  db: 554.37,
  d: 587.33,
  eb: 622.25,
  e: 659.25,
  f: 698.46,
  gb: 739.99,
  g: 783.99,
  ab: 830.61,
  a2: 880.00,
  bb2: 932.33,
  b2: 987.77,
  c2: 1046.50,
  db2: 1108.73,
  d2: 1174.66,
  eb2: 1244.51,
  e2: 1318.51,
  f2: 1396.91,
  gb2: 1479.98,
  g2: 1567.98,
  ab2: 1661.22
}

var happyChords = {
  cMaj: ['c', 'e', 'g', 'c2', 'e2'],
  fMaj: ['f', 'a', 'c', 'f2', 'a2'],
  gMaj: ['g', 'b', 'd', 'g2', 'b2'],
}

var sadChords = {
  aMin: ['a', 'c0', 'e', 'a2', 'c'],
  dMin: ['d', 'f0', 'a', 'f', 'd2'],
  eMin: ['e0', 'g', 'b', 'b2', 'g2'],
  bDim: ['b', 'd', 'f', 'd0', 'b2']
}

var scales = {
  cMaj: ['c', 'd', 'e', 'f', 'g', 'a', 'b']
}

//======================================//
//           AUDIO CONTEXTS             //
//======================================//


var contextClass = (window.AudioContext ||
  window.webkitAudioContext ||
  window.mozAudioContext ||
  window.oAudioContext ||
  window.msAudioContext);

if (contextClass) {
  var context = new contextClass();
} else {
  alert('Web audio is not supported in this browser, please try another browser, or just save some time and use Google Chrome');
}

//Set default pan for manipulation in play
var pan = 1;

var findFrequency = function(note){
  return frequencies[note];
}

var play = function(freq) {

  var oscillator = context.createOscillator();
  oscillator.frequency.value = freq;
  oscillator.type = 'sine';

  var compressor = context.createDynamicsCompressor();
  compressor.threshold.value = -50;
  compressor.knee.value = 30;
  compressor.ratio.value = 12;
  compressor.reduction.value = -20;
  compressor.attack.value = 1;
  compressor.release.value = 0.25;

  var synthDelay = context.createDelay(5.0);
  synthDelay.delayTime.value = Math.floor(Math.random() * 1);

  var gainNode = context.createGain();
  gainNode.gain.value = 0.05;

  //Pan is only supported on Firefox and Chrome.
  if (contextClass==="AudioContext" || contextClass ==="mozAudioContext"){
    var panNode = context.createStereoPanner();
    panNode.pan.value = Math.random() * pan;
    pan = pan * -1;
    oscillator.connect(panNode);
    panNode.connect(synthDelay);
  } else {
    oscillator.connect(synthDelay);
  }

  synthDelay.connect(gainNode);
  gainNode.connect(compressor);
  compressor.connect(context.destination);
  oscillator.start(0);

  nowPlaying.push(oscillator);

}



//======================================//
//                STATE                 //
//======================================//


var nowPlaying = [];
var chordQueue = [happyChords.cMaj];
var chordProgression = [];




