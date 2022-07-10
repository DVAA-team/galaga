import { HEIGHT_GAME, WIDTH_GAME } from './const';

interface ISwarm {
  x: number;
  y: number;
}

export default class GameEngine {
  private ctx: CanvasRenderingContext2D;

  // private score = 0;

  private animationFrameId: number | null = null;

  private swarm: ISwarm;

  private lastTime = performance.now();

  private elapsedTime = 0;

  constructor(ctx: CanvasRenderingContext2D) {
    this.swarm = {
      x: 200,
      y: 100,
    };
    this.ctx = ctx;
  }

  public start() {
    this.lastTime = performance.now();
    this._gamaLoop(performance.now());
  }

  public stop() {
    if (typeof this.animationFrameId === 'number') {
      window.cancelAnimationFrame(this.animationFrameId);
    }
  }

  private _gamaLoop(nowTime: DOMHighResTimeStamp) {
    const dt = nowTime - this.lastTime;

    // if (dt >= 1000 / 60) {
    this.lastTime = nowTime;
    this._draw(dt);
    // }

    this.animationFrameId = window.requestAnimationFrame(
      this._gamaLoop.bind(this)
    );
  }

  private _clear() {
    this.ctx.save();
    this.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    this.ctx.fillRect(0, 0, WIDTH_GAME, HEIGHT_GAME);
    this.ctx.restore();
  }

  private _draw(dt: number) {
    const A = 100;
    const B = 400;

    const Vx = 0.0005;
    this.elapsedTime += dt;

    const t = Math.cos(Vx * this.elapsedTime);

    this._clear();
    this.swarm.x = A + (B - A) * 0.5 * (1 - t);
    this.ctx.fillRect(this.swarm.x, this.swarm.y, 50, 50);
  }
}

// let animationFrameId: number | null = null;
// let last = performance.now();

// const gameLoop = (now: DOMHighResTimeStamp) => {
//   const delay = now - last;
//   last = now;
//   animationFrameId = window.requestAnimationFrame(gameLoop);
// };

// const gameOver = () => {
//   if (typeof animationFrameId === 'number') {
//     window.cancelAnimationFrame(animationFrameId);
//   }
// };
