class AudioContext {
  constructor() {
    this.isMock = true;
  }

  // eslint-disable-next-line class-methods-use-this
  decodeAudioData(_, cb) {
    cb();
  }
}

module.exports = AudioContext;
