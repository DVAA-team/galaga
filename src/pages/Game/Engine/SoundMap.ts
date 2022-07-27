import Sound from '@/pages/Game/Engine/Sound';
import axios from 'axios';

type TSound = {
  name: string;
  url: string;
};

type TAudioOptions = {
  sounds: TSound[];
};

class SoundMap {
  private _load: Promise<Sound[]>;

  private _sounds: Sound[] = [];

  private _audioContext = new AudioContext();

  constructor(options: TAudioOptions) {
    const { sounds } = options;
    this._load = Promise.all(
      sounds.map((sound) =>
        axios
          .get<ArrayBuffer>(sound.url, {
            responseType: 'arraybuffer',
          })
          .then((res) => this._decodeAudioData(res.data))
          .then((buffer) => new Sound(this._audioContext, sound.name, buffer))
      )
    );
  }

  public async init() {
    this._sounds = await this._load;
  }

  public getSoundByName(soundName: string) {
    const foundedSound = this._sounds.find((sound) => sound.name === soundName);
    if (foundedSound) {
      return foundedSound;
    }
    throw new Error(`Не найден звук с именем ${soundName}`);
  }

  private _decodeAudioData(audioData: ArrayBuffer) {
    return new Promise<AudioBuffer>((resolve, reject) => {
      this._audioContext.decodeAudioData(audioData, resolve, reject);
    });
  }
}

export default SoundMap;
