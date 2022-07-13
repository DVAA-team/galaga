import {
  BOTTOM_PADDING,
  ENEMY_GAP,
  ENEMY_HEIGHT,
  ENEMY_WIDTH,
  LEFT_PADDING,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  RIGHT_PADDING,
  TOP_PADDING,
} from './const';
import { GameObject, isRectCollide } from './GameObject';
import { isPlayer, Player } from './Player';
import { Projectile, ProjectileType } from './Projectile';
import { isSwarm, Swarm } from './Swarm';
import { Vector } from './Vector';

export type GameEngineOptions = {
  ctx: CanvasRenderingContext2D;
  debug?: boolean;
  width: number;
  height: number;
  onScoreUpdate?: (newScore: number) => void;
  onGameOver?: (score: number) => void;
  onGameStart?: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

enum GameState {
  init,
  ready,
  run,
  gameOver,
}

export class GameEngine {
  private ctx: CanvasRenderingContext2D;

  private playerAction = {
    left: false,
    right: false,
    fire: false,
  };

  private gameState: GameState = GameState.init;

  private score = 0;

  private onScoreUpdate: (newScore: number) => void;

  private onGameOver: (score: number) => void;

  // private onGameStart: () => void;

  private animationFrameId = 0;

  private lastTime = performance.now();

  private objects: GameObject[] = [];

  private objectsClass: typeof GameObject[] = [];

  private gameAreaWidth: number;

  private gameAreaHeight: number;

  private debug: boolean;

  private _keyDownHandlerWithContext: (e: KeyboardEvent) => void;

  private _keyUpHandlerWithContext: (e: KeyboardEvent) => void;

  constructor({
    ctx,
    debug,
    width,
    height,
    onScoreUpdate,
    onGameOver,
  }: // onGameStart,
  GameEngineOptions) {
    this.ctx = ctx;
    this.debug = debug ?? false;
    this.gameAreaWidth = width;
    this.gameAreaHeight = height;
    this.onScoreUpdate = onScoreUpdate ?? noop;
    this.onGameOver = onGameOver ?? noop;
    // this.onGameStart = onGameStart ?? noop;

    this._keyDownHandlerWithContext = this._keyDownHandler.bind(this);
    this._keyUpHandlerWithContext = this._keyUpHandler.bind(this);
  }

  public get isReady() {
    return this.gameState === GameState.ready;
  }

  public start() {
    if (this.gameState === GameState.ready) {
      // Обработчики клавиатуры
      window.addEventListener('keydown', this._keyDownHandlerWithContext);
      window.addEventListener('keyup', this._keyUpHandlerWithContext);

      this.gameState = GameState.run;

      this.lastTime = performance.now();
      this.animationFrameId = requestAnimationFrame(this._gameLoop.bind(this));
    } else if (this.gameState === GameState.gameOver) {
      this.objects = [];
      this.score = 0;
      this.init().then(() => {
        // Обработчики клавиатуры
        window.addEventListener('keydown', this._keyDownHandlerWithContext);
        window.addEventListener('keyup', this._keyUpHandlerWithContext);

        this.gameState = GameState.run;

        this.lastTime = performance.now();
        this.animationFrameId = requestAnimationFrame(
          this._gameLoop.bind(this)
        );
      });
    } else {
      throw new Error('Ошибка старта игры, неверное состояние');
    }
  }

  public stop() {
    if (this.gameState !== GameState.run) {
      throw new Error('Ошибка остановки игры, неверное состояние');
    }

    this.playerAction.fire = false;
    this.playerAction.left = false;
    this.playerAction.right = false;

    window.removeEventListener('keydown', this._keyDownHandlerWithContext);
    window.removeEventListener('keyup', this._keyUpHandlerWithContext);
    this.onGameOver(this.score);

    window.setTimeout(() => {
      this.gameState = GameState.gameOver;
      cancelAnimationFrame(this.animationFrameId);
    }, 1000);
  }

  public addScore(score: number) {
    this.score += score;
    this.onScoreUpdate(this.score);
  }

  public registerObject(
    objectClass: typeof GameObject | typeof GameObject[]
  ): void {
    if (Array.isArray(objectClass)) {
      this.objectsClass.push(...objectClass);
    } else {
      this.objectsClass.push(objectClass);
    }
  }

  public async init() {
    this.objectsClass.forEach((ObjectClass) => {
      let object: GameObject | null = null;
      if (isPlayer(ObjectClass)) {
        //  Создание игроков
        object = new ObjectClass({
          ctx: this.ctx,
          debug: this.debug,
          position: new Vector(
            this.gameAreaWidth / 2 - PLAYER_WIDTH,
            this.gameAreaHeight - PLAYER_HEIGHT - BOTTOM_PADDING
          ),
          velocity: new Vector(0, 0),
          width: PLAYER_WIDTH,
          height: PLAYER_HEIGHT,
          onFire: (projectile) => {
            this.objects.push(projectile);
          },
        });
      } else if (isSwarm(ObjectClass)) {
        // Создание роя
        const formation = [
          [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
          [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
          [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const height =
          formation.length * (ENEMY_HEIGHT + ENEMY_GAP) - ENEMY_GAP;
        const width =
          formation.reduce((acc, row) => Math.max(acc, row.length), 0) *
            (ENEMY_WIDTH + ENEMY_GAP) -
          ENEMY_GAP;
        object = new ObjectClass({
          ctx: this.ctx,
          debug: this.debug,
          position: new Vector(this.gameAreaWidth / 2 - width / 2, TOP_PADDING),
          velocity: new Vector(2, 0),
          width,
          height,
          formation,
          onFire: (projectile) => {
            this.objects.push(projectile);
          },
        });
      }

      if (object) {
        this.objects.push(object);
      }
    });

    // Инициализация объектов, подгрузка спрайтов и тд.
    const objectInit = this.objects.map((object) =>
      object.init().catch((error) => console.error(error))
    );

    const initResult = await Promise.all(objectInit);
    if (!initResult.every((res) => res)) {
      throw new Error('Init objects failure');
    }

    this.gameState = GameState.ready;
    return true;
  }

  private _keyDownHandler({ key }: KeyboardEvent) {
    switch (key) {
      case 'ArrowLeft':
      case 'a':
        this.playerAction.left = true;
        break;
      case 'ArrowRight':
      case 'd':
        this.playerAction.right = true;
        break;
      case 'w':
      case ' ':
        this.playerAction.fire = true;
        break;
      default:
        break;
    }
  }

  private _keyUpHandler({ key }: KeyboardEvent) {
    switch (key) {
      case 'ArrowLeft':
      case 'a':
        this.playerAction.left = false;
        break;
      case 'ArrowRight':
      case 'd':
        this.playerAction.right = false;
        break;
      case 'w':
      case ' ':
        this.playerAction.fire = false;
        break;
      default:
        break;
    }
  }

  private _gameLoop(nowTime: DOMHighResTimeStamp) {
    const dt = nowTime - this.lastTime;
    this.lastTime = nowTime;

    this._clear();
    this._garbageCollector();

    let gameOver = true;

    this.objects.forEach((obj) => {
      obj.update(dt);
      if (obj instanceof Projectile) {
        if (this._outOfBoundary(obj.position, obj.width, obj.height)) {
          obj.delete();
        } else {
          for (let i = 0; i < this.objects.length; i += 1) {
            if (
              !(this.objects[i] instanceof Projectile) &&
              !this.objects[i].hasDelete
            ) {
              const objA = this.objects[i];

              if (isRectCollide(objA, obj)) {
                if (
                  objA instanceof Swarm &&
                  obj.type === ProjectileType.player
                ) {
                  objA.calcCollide(obj);
                  if (obj.hasDelete) {
                    this.addScore(100);
                  }
                } else if (
                  objA instanceof Player &&
                  obj.type === ProjectileType.enemy
                ) {
                  obj.delete();
                  objA.delete();
                  gameOver = true;
                }
              }
            }
          }
        }
      } else if (obj instanceof Swarm) {
        gameOver = false;
        if (
          obj.position.x < 10 ||
          obj.position.x + obj.width > this.gameAreaWidth - 10
        ) {
          obj.revertVelocityX();
        }
      } else if (obj instanceof Player) {
        if (this.playerAction.left && obj.position.x >= LEFT_PADDING) {
          obj.left();
        } else if (
          this.playerAction.right &&
          obj.position.x <= this.gameAreaWidth - obj.width - RIGHT_PADDING
        ) {
          obj.right();
        } else {
          obj.stop();
        }

        if (this.playerAction.fire) {
          obj.fire();
        }
      }
    });

    // console.log('this.objects.length :>> ', this.objects.length);
    this.animationFrameId = requestAnimationFrame(this._gameLoop.bind(this));
    // this.animationFrameId = window.setTimeout(this._gameLoop.bind(this), 100);
    if (gameOver) {
      this.stop();
    }
  }

  // private _deleteObject(object: GameObject) {
  //   const findObjIdx = this.objects.findIndex((o) => o === object);
  //   if (findObjIdx !== -1) {
  //     if (this.objects[findObjIdx] instanceof Swarm) {
  //     } else {
  //       this.objects.splice(findObjIdx, 1);
  //     }
  //   }
  // }

  private _garbageCollector() {
    let objectCount = this.objects.length;
    let deleteObjectCount = 0;
    for (let i = 0; i < objectCount; i += 1) {
      const object = this.objects[i];
      if (object.hasDelete) {
        this.objects.push(...this.objects.splice(i, 1));
        objectCount -= 1;
        deleteObjectCount += 1;
      } else if (object instanceof Swarm) {
        object.garbageCollector();
      }
    }
    this.objects.splice(objectCount, deleteObjectCount);
  }

  private _outOfBoundary(position: Vector, width: number, height: number) {
    if (position.y + height <= 0 || position.y >= this.gameAreaHeight) {
      return true;
    }
    if (position.x + width <= 0 || position.x >= this.gameAreaWidth) {
      return true;
    }
    return false;
  }

  private _clear() {
    this.ctx.clearRect(0, 0, this.gameAreaWidth, this.gameAreaHeight);
  }
}
