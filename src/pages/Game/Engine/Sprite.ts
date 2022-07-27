type TAnimation = {
  frames: number;
  duration: number;
};

export type TSpriteOptions = {
  name: string;
  images: ImageBitmap[];
  animation?: TAnimation;
};

export const DEFAULT_ANIMATION: TAnimation = {
  frames: 1,
  duration: 1,
};

class Sprite {
  public name: string;

  public width: number;

  public height: number;

  public images: ImageBitmap[];

  private _currentFrame = 0;

  private _lastFrameTime = 0;

  private _frameTime = 0;

  private _animated = false;

  constructor(options: TSpriteOptions) {
    const { name, images, animation = DEFAULT_ANIMATION } = options;

    this.name = name;
    this.images = images;

    this.width = images.reduce((acc, i) => Math.max(acc, i.width), 0);
    this.height = images.reduce((acc, i) => Math.max(acc, i.height), 0);

    this._frameTime = animation.duration / images.length;
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number, frame = 0) {
    ctx.drawImage(this.images[frame], x, y);
  }

  animate(ctx: CanvasRenderingContext2D, x: number, y: number, dt: number) {
    ctx.drawImage(this.images[this._currentFrame], x, y);
    this._lastFrameTime += dt;

    if (this._lastFrameTime >= this._frameTime) {
      this._lastFrameTime = 0;
      this._currentFrame += 1;
      if (this._currentFrame > this.images.length - 1) {
        this._currentFrame = 0;
      }
    }
  }

  animateOnce(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    dt: number
  ): boolean {
    if (this._animated) {
      return false;
    }

    ctx.drawImage(this.images[this._currentFrame], x, y);
    this._lastFrameTime += dt;

    if (this._lastFrameTime >= this._frameTime) {
      this._lastFrameTime = 0;
      this._currentFrame += 1;
      if (this._currentFrame > this.images.length - 1) {
        this._currentFrame = 0;
        this._animated = true;
        return false;
      }
    }
    return true;
  }
}

export default Sprite;
