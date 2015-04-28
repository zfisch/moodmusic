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

//generate frequencies for each note
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

//create library of chords to play
var happyChords = {
  cMaj: ['c', 'e', 'g', 'c', 'e'],
  fMaj: ['f', 'a', 'c', 'f', 'a'],
  gMaj: ['g', 'b', 'd', 'g', 'b'],
  // g7: ['g', 'b', 'd', 'f', 'g'],
}

var neutralChords = {
  cMaj7: ['c', 'e', 'g', 'b', 'c'],
  c6: ['c', 'e', 'g', 'a', 'c'],
  a7: ['a', 'db', 'e', 'g', 'a'],
  g13: ['g', 'b', 'd', 'f', 'a', 'c'],
  c69: ['c', 'e', 'g', 'a', 'd']
}

var sadChords = {
  aMin: ['a', 'c', 'e', 'a', 'c'],
  dMin7: ['d', 'f', 'a', 'c', 'd'],
  aMin7: ['a', 'c', 'e', 'g', 'a'],
  eMin7: ['e', 'g', 'b', 'd', 'e'],
  dMin9: ['d', 'f', 'a', 'c', 'e'],
  gDim: ['g', 'bb', 'db', 'g', 'db'],
  fMin: ['f', 'ab', 'c', 'f', 'ab']
}

//set default pan for manipulation in play
var pan = 1;

var play = function(note) {
  
  var oscillator = context.createOscillator();
  oscillator.frequency.value = frequencies[note];
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

  var analyser = context.createAnalyser();


  oscillator.connect(panNode);
  panNode.connect(synthDelay);
  synthDelay.connect(gainNode);
  gainNode.connect(compressor);
  compressor.connect(analyser);
  compressor.connect(context.destination);
  oscillator.start();

  analyser.fftSize = 2048;
  var bufferLength = analyser.frequencyBinCount;
  var dataArray = new Uint8Array(bufferLength);
  analyser.getByteTimeDomainData(dataArray);
  console.log(analyser);

  nowPlaying.push(oscillator);
  console.log(nowPlaying);
}

//sounds currently playing
var nowPlaying = [];
var chordQueue = [happyChords.cMaj];
var chordProgression = [];




