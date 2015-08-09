// run with electron-spawn
var ObservAudioBuffer = require('./')
var audioContext = new window.AudioContext()

var context = {
  fs: require('fs'),
  cwd: '/Users/matt/Code/loop/loop-drop-app/demo-project/Qwerty Keys Example',
  audio: audioContext
}

var buffer = ObservAudioBuffer(context)
buffer.resolved(function (data) {
  if (data) {
    // wait for buffer to load before triggering
    trigger(audioContext.currentTime)
    trigger(audioContext.currentTime + 0.5)
    trigger(audioContext.currentTime + 1)
    trigger(audioContext.currentTime + 1.25)
  }
})

buffer.set({
  src: './Snare Gold 8_0-1000.ogg'
})

function trigger (at) {
  var player = audioContext.createBufferSource()
  player.buffer = buffer.resolved()
  player.connect(audioContext.destination)
  player.start(at)
}
