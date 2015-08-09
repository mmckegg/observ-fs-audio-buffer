observ-fs-audio-buffer
===

Observable AudioBuffer for use with [fs](https://nodejs.org/api/fs.html).

[![NPM](https://nodei.co/npm/observ-fs-audio-buffer.png)](https://nodei.co/npm/observ-fs-audio-buffer/)

## Example

```js
var ObservAudioBuffer = require('observ-fs-audio-buffer')
var audioContext = new window.AudioContext()

var context = {
  fs: require('fs'),
  cwd: __dirname + '/audio-samples',
  audio: audioContext
}

var buffer = ObservAudioBuffer(context)
buffer.resolved(function(data) {
  if (data) {
    // wait for buffer to load before triggering
    trigger(audioContext.currentTime)
  }
})

buffer.set({
  src: './snare.ogg'
})

function trigger(at) {
  var player = audioContext.createBufferSource()
  player.buffer = buffer.resolved()
  player.connect(audioContext.destination)
  player.start(at)
}
```