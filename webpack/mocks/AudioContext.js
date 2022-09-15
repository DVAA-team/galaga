class AudioContext {
  constructor() {
    this.isMock = true;
  }

  decodeAudioData(_, cb) {
    cb();
  }
}

module.exports = AudioContext;
