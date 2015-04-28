
//======================================//
//            CONFIGURATION             //
//======================================//

var frequencies = {
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
  ab: 830.61
}

var happyChords = {
  cMaj: ['c', 'e', 'g', 'c', 'e'],
  fMaj: ['f', 'a', 'c', 'f', 'a'],
  gMaj: ['g', 'b', 'd', 'g', 'b'],
}

//These are not currently in use.
var neutralChords = {
  g7: ['g', 'b', 'd', 'f', 'g'],
  cMaj7: ['c', 'e', 'g', 'b', 'c'],
  c6: ['c', 'e', 'g', 'a', 'c'],
  a7: ['a', 'db', 'e', 'g', 'a'],
  g13: ['g', 'b', 'd', 'f', 'a'],
  c69: ['c', 'e', 'g', 'a', 'd'],
  dMin7: ['d', 'f', 'a', 'c', 'd'],
  aMin7: ['a', 'c', 'e', 'g', 'a'],
  eMin7: ['e', 'g', 'b', 'd', 'e'],
  dMin9: ['d', 'f', 'a', 'c', 'e'],
  gDim: ['g', 'bb', 'db', 'g', 'db'],
  fMin: ['f', 'ab', 'c', 'f', 'ab']

}

var sadChords = {
  aMin: ['a', 'c', 'e', 'a', 'c'],
  dMin: ['d', 'f', 'a', 'f', 'd'],
  eMin: ['e', 'g', 'b', 'b', 'g'],
  bDim: ['b', 'd', 'f', 'd', 'b']
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

//set default pan for manipulation in play
var pan = 1;

var findFrequency = function(note){
  return frequencies[note];
}

var play = function(freq) {
  
  var oscillator = context.createOscillator();
  oscillator.frequency.value = freq;
  oscillator.type = oscillator.SINE;
  
  var compressor = context.createDynamicsCompressor();
  compressor.threshold.value = -50;
  compressor.knee.value = 30;
  compressor.ratio.value = 12;
  compressor.reduction.value = -20;
  compressor.attack.value = 1;
  compressor.release.value = 0.25;
  

  var panNode = context.createStereoPanner();
  panNode.pan.value = Math.random() * pan;
  pan = pan * -1;

  var synthDelay = context.createDelay(5.0);
  synthDelay.delayTime.value = Math.floor(Math.random() * 1);

  var gainNode = context.createGain();
  gainNode.gain.value = 0.05;


  oscillator.connect(panNode);
  panNode.connect(synthDelay);
  synthDelay.connect(gainNode);
  gainNode.connect(compressor);
  
  compressor.connect(context.destination);
  oscillator.start();

  nowPlaying.push(oscillator);
  console.log(nowPlaying);
}

//DISTORTION NEEDS LOVE TO WORK

// var addDistortion = function(tone){

//   var distortion = context.createWaveShaper();

//   function makeDistortionCurve(amount) {
//     var k = typeof amount === 'number' ? amount : 50,
//       n_samples = 44100,
//       curve = new Float32Array(n_samples),
//       deg = Math.PI / 180,
//       i = 0,
//       x;
//     for ( ; i < n_samples; ++i ) {
//       x = i * 2 / n_samples - 1;
//       curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
//     }
//     return curve;
//   };

//   distortion.curve = makeDistortionCurve(800);
//   distortion.oversample = '10x';

//   var gainNode = context.createGain();
//   gainNode.gain.value = 0.05;
  
//   tone.connect(distortion);
//   distortion.connect(gainNode);
//   gainNode.connect(context.destination);
// }

// var removeDistortion = function(tone){
//   tone.disconnect();
//   play(tone.frequency.value);
// }


//======================================//
//                STATE                 //
//======================================//


var nowPlaying = [];
var chordQueue = [happyChords.cMaj];
var chordProgression = [];




