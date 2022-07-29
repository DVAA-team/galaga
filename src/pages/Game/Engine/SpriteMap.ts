import axios from 'axios';
import Sprite, { DEFAULT_ANIMATION, TSpriteOptions } from './Sprite';

type TSpriteInfo = Omit<TSpriteOptions, 'images'> & {
  row: number | [number, number];
  col: number | [number, number];
  scale?: number;
};

type TSpriteSize = '16' | '32' | '48' | '64';

type TSpriteMapOptions = {
  url: string;
  spriteSize: TSpriteSize;
  rows: number;
  cols: number;
  sprites: TSpriteInfo[];
};

const cutSpriteImage = (
  origImage: Blob,
  spriteSize: number,
  spriteInfo: TSpriteInfo
) => {
  const { row, col, scale = 1, animation = DEFAULT_ANIMATION } = spriteInfo;
  let x = 0;
  let y = 0;
  let width = 0;
  let hight = 0;

  if (Array.isArray(row)) {
    y = row[0] * spriteSize;
    hight = (row[1] - row[0] + 1) * spriteSize;
  } else {
    y = row * spriteSize;
    hight = spriteSize;
  }

  if (Array.isArray(col)) {
    x = col[0] * spriteSize;
    width = (col[1] - col[0] + 1) * spriteSize;
  } else {
    x = col * spriteSize;
    width = spriteSize;
  }

  const images: Promise<ImageBitmap>[] = [];

  for (let i = 0; i < animation.frames; i += 1) {
    images.push(
      createImageBitmap(origImage, x + i * width, y, width, hight, {
        resizeHeight: hight * scale,
        resizeWidth: width * scale,
        resizeQuality: 'pixelated',
      })
    );
  }
  return images;
};

class SpriteMap {
  private _spritesImages: TSpriteOptions[] = [];

  private _load: Promise<TSpriteOptions[]>;

  private _spriteSize: number;

  constructor(options: TSpriteMapOptions) {
    const { spriteSize: spriteSizeS, rows, cols, url, sprites } = options;

    this._spriteSize = parseInt(spriteSizeS, 10);

    for (let i = 0; i < sprites.length; i += 1) {
      const { row, col } = sprites[i];
      if (row > rows || col > cols || row < 0 || col < 0) {
        throw new Error('Не верно указаны индексы спрайта в карте спрайтов');
      }
    }

    this._load = axios
      .get<Blob>(url, { responseType: 'blob' })
      .then(({ data }) => {
        return Promise.all(
          sprites.map(async (sprite) => ({
            name: sprite.name,
            images: await Promise.all(
              cutSpriteImage(data, this._spriteSize, sprite)
            ),
            animation: sprite.animation,
          }))
        );
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  }

  public async init() {
    this._spritesImages = await this._load;
    if (this._spritesImages.length === 0) {
      throw new Error('Карта спрайтов не загружена');
    }
  }

  public getSpriteByName(spriteName: string) {
    const sprite = this._spritesImages.find(({ name }) => name === spriteName);
    if (sprite) {
      return new Sprite(sprite);
    }
    throw new Error(`Не найден спрайт с именем ${spriteName}`);
  }
}

export default SpriteMap;
