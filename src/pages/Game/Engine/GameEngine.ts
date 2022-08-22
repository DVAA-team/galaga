import { isStar } from './Star';
import { AbstractGameObject, isRectCollide } from './AbstractGameObject';
import {
  BG_COLOR,
  BOTTOM_PADDING,
  ENEMY_GAP,
  ENEMY_HEIGHT,
  ENEMY_WIDTH,
  LEFT_PADDING,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  RIGHT_PADDING,
  STAR_COLORS,
  STAR_COUNT,
  TOP_PADDING,
} from './const';
import { isPlayer, Player } from './Player';
import { Projectile, ProjectileType } from './Projectile';
import { isSwarm, Swarm } from './Swarm';
import { Vector } from './Vector';

export type TGameEngineOptions = {
  ctx: CanvasRenderingContext2D;
  debug?: boolean;
  onScoreUpdate?: (newScore: number) => void;
  onGameOver?: (score: number) => void;
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
  static gameAreaWidth = 750;

  static gameAreaHeight = 800;

  private _ctx: CanvasRenderingContext2D;

  private _playerAction = {
    left: false,
    right: false,
    fire: false,
  };

  private _gameState: GameState = GameState.init;

  private _score = 0;

  private _onScoreUpdate: (newScore: number) => void;

  private _onGameOver: (score: number) => void;

  private _lastTime = performance.now();

  private _objects: AbstractGameObject[] = [];

  private _bgObjects: AbstractGameObject[] = [];

  private _objectsClass: typeof AbstractGameObject[] = [];

  private _debug: boolean;

  private _keyDownHandlerWithContext: (e: KeyboardEvent) => void;

  private _keyUpHandlerWithContext: (e: KeyboardEvent) => void;

  constructor({ ctx, debug, onScoreUpdate, onGameOver }: TGameEngineOptions) {
    this._ctx = ctx;
    this._debug = debug ?? false;

    ctx.canvas.width = GameEngine.gameAreaWidth;
    ctx.canvas.height = GameEngine.gameAreaHeight;

    this._onScoreUpdate = onScoreUpdate ?? noop;
    this._onGameOver = onGameOver ?? noop;

    this._keyDownHandlerWithContext = this._keyDownHandler.bind(this);
    this._keyUpHandlerWithContext = this._keyUpHandler.bind(this);
  }

  /**
   * Запускает и перезапускает игру
   */
  public start() {
    const run = () => {
      // Обработчики клавиатуры
      window.addEventListener('keydown', this._keyDownHandlerWithContext);
      window.addEventListener('keyup', this._keyUpHandlerWithContext);

      this._gameState = GameState.run;

      // Запускаем основной цикл игры
      this._lastTime = performance.now();
      requestAnimationFrame(this._gameLoop.bind(this));
    };

    if (this._gameState === GameState.ready) {
      // Первый запуск
      run();
    } else if (this._gameState === GameState.gameOver) {
      // Перезапуск
      this._objects = [];
      this._bgObjects = [];
      this._score = 0;
      this.init().then(run);
    } else {
      throw new Error(
        `Ошибка старта игры, неверное состояние ${this._gameState}`
      );
    }
  }

  /**
   * Остановка игры
   */
  public stop() {
    window.removeEventListener('keydown', this._keyDownHandlerWithContext);
    window.removeEventListener('keyup', this._keyUpHandlerWithContext);

    // Устраняет залипание клавиш, если были нажаты в момент остановки
    this._playerAction.fire = false;
    this._playerAction.left = false;
    this._playerAction.right = false;
  }

  /**
   * Экстренное завершение игры
   */
  public emergencyStop() {
    this.stop();
    this._gameState = GameState.gameOver;
  }

  /**
   * Добавляет очки
   *
   * @param score - Добавляемое количество очков
   */
  public addScore(score: number) {
    this._score += score;
    this._onScoreUpdate(this._score);
  }

  /**
   * Регистрирует конструкторы возможных объектов
   *
   * @param objectClass - Конструктор игрового объекта или массив конструкторов
   */
  public registerObject(
    objectClass: typeof AbstractGameObject | typeof AbstractGameObject[]
  ): void {
    if (Array.isArray(objectClass)) {
      this._objectsClass.push(...objectClass);
    } else {
      this._objectsClass.push(objectClass);
    }
  }

  /**
   * Инициализация всех игровых объектов.
   *
   * @returns Возвращает true при удачной инициализации игровых объектов
   */
  public async init() {
    this._clear();

    this._objectsClass.forEach((ObjectClass) => {
      let object: AbstractGameObject | null = null;
      if (isPlayer(ObjectClass)) {
        //  Создание игроков
        object = new ObjectClass({
          ctx: this._ctx,
          debug: this._debug,
          position: new Vector(
            GameEngine.gameAreaWidth / 2 - PLAYER_WIDTH,
            GameEngine.gameAreaHeight -
              PLAYER_HEIGHT -
              BOTTOM_PADDING -
              PLAYER_HEIGHT / 2
          ),
          velocity: new Vector(0, 0),
          width: PLAYER_WIDTH,
          height: PLAYER_HEIGHT,
          onFire: (projectile) => {
            this._objects.push(projectile);
          },
        });
      } else if (isSwarm(ObjectClass)) {
        // Создание роя
        const formation = [
          [0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0],
          [0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0],
          [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0],
          [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
          [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ];
        const height =
          formation.length * (ENEMY_HEIGHT + ENEMY_GAP) - ENEMY_GAP;
        const width =
          formation.reduce((acc, row) => Math.max(acc, row.length), 0) *
            (ENEMY_WIDTH + ENEMY_GAP) -
          ENEMY_GAP;
        object = new ObjectClass({
          ctx: this._ctx,
          debug: this._debug,
          position: new Vector(
            GameEngine.gameAreaWidth / 2 - width / 2,
            TOP_PADDING
          ),
          velocity: new Vector(2, 0),
          width,
          height,
          formation,
          onFire: (projectile) => {
            this._objects.push(projectile);
          },
        });
      } else if (isStar(ObjectClass)) {
        let starCount = STAR_COUNT;
        const getRandomInt = (min: number, max: number) => {
          return (
            Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) +
            Math.ceil(min)
          );
        };
        while (starCount > 0) {
          this._bgObjects.push(
            new ObjectClass({
              color: STAR_COLORS[getRandomInt(0, STAR_COLORS.length - 1)],
              gameAreaHeight: GameEngine.gameAreaHeight,
              ctx: this._ctx,
              height: 2,
              width: 2,
              position: new Vector(
                getRandomInt(0, GameEngine.gameAreaWidth),
                getRandomInt(0, GameEngine.gameAreaHeight)
              ),
              velocity: new Vector(0, 0),
              debug: false,
            })
          );
          starCount -= 1;
        }
      }

      if (object) {
        this._objects.push(object);
      }
    });

    // Инициализация объектов, подгрузка спрайтов и тд.
    const objectInit = this._objects.map((object) =>
      object.init().catch((error) => console.error(error))
    );
    const bgObjectInit = this._bgObjects.map((bgObject) =>
      bgObject.init().catch((error) => console.error(error))
    );

    const initResult = await Promise.all(objectInit.concat(bgObjectInit));
    if (!initResult.every((res) => res)) {
      throw new Error('Init objects failure');
    }

    this._gameState = GameState.ready;
    return true;
  }

  /**
   * Обработчики нажатия клавиши
   *
   * @param param0 - Событие клавиатуры
   */
  private _keyDownHandler({ code }: KeyboardEvent) {
    switch (code) {
      case 'ArrowLeft':
      case 'KeyA':
        this._playerAction.left = true;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this._playerAction.right = true;
        break;
      case 'Space':
        this._playerAction.fire = true;
        break;
      default:
        break;
    }
  }

  /**
   * Обработчики отпускания клавиши
   *
   * @param param0 - Событие клавиатуры
   */
  private _keyUpHandler({ code }: KeyboardEvent) {
    switch (code) {
      case 'ArrowLeft':
      case 'KeyA':
        this._playerAction.left = false;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this._playerAction.right = false;
        break;
      case 'Space':
        this._playerAction.fire = false;
        break;
      default:
        break;
    }
  }

  /**
   * Главный игровой цикл.
   *
   * @param nowTime - Время в мсек прошедшее с последнего вызова
   */
  private _gameLoop(nowTime: DOMHighResTimeStamp) {
    const dt = nowTime - this._lastTime;
    this._lastTime = nowTime;

    this._clear();
    this._garbageCollector();

    let isGameOver = true;
    let hasPlayers = false;
    let hasSwarm = false;

    for (let i = 0; i < this._bgObjects.length; i += 1) {
      this._bgObjects[i].update(dt);
    }

    for (let i = 0; i < this._objects.length; i += 1) {
      this._objects[i].update(dt);

      if (this._objects[i] instanceof Projectile) {
        // Обработка пуль
        const projectile = this._objects[i] as Projectile;
        if (
          this._outOfBoundary(
            projectile.position,
            projectile.width,
            projectile.height
          )
        ) {
          projectile.delete();
        } else {
          // Проверка на пересечения
          for (let j = 0; j < this._objects.length; j += 1) {
            if (
              !(this._objects[j] instanceof Projectile) &&
              !this._objects[j].hasDelete
            ) {
              // Обрабатывает только те объекты которые не являются пулями и еще не удалены
              const gameObject = this._objects[j];

              if (isRectCollide(gameObject, projectile)) {
                if (
                  gameObject instanceof Swarm &&
                  projectile.type === ProjectileType.player
                ) {
                  // Пуля игрока столкнулась с роем
                  const score = gameObject.calcCollide(projectile);
                  if (score) {
                    this.addScore(score);
                  }
                } else if (
                  gameObject instanceof Player &&
                  projectile.type === ProjectileType.enemy
                ) {
                  // Пуля роя столкнулась с игроком
                  projectile.delete();
                  gameObject.delete();
                  isGameOver = true;
                }
              }
            }
          }
        }
      } else if (this._objects[i] instanceof Swarm) {
        // Обработка перемещения роя
        hasSwarm = true;
        const swarm = this._objects[i] as Swarm;
        isGameOver = false; // Если рой все еще присутствует на игровом поле игра не окончена
        if (
          swarm.position.x < 10 ||
          swarm.position.x + swarm.width > GameEngine.gameAreaWidth - 10
        ) {
          swarm.revertVelocityX();
        }
      } else if (this._objects[i] instanceof Player) {
        // Обработка перемещения игрока
        hasPlayers = true;
        const player = this._objects[i] as Player;
        if (this._playerAction.left && player.position.x >= LEFT_PADDING) {
          player.left();
        } else if (
          this._playerAction.right &&
          player.position.x <=
            GameEngine.gameAreaWidth - player.width - RIGHT_PADDING
        ) {
          player.right();
        } else {
          player.stop();
        }

        if (this._playerAction.fire) {
          player.fire();
        }
      }
    }

    const isGameStateRun = this._gameState === GameState.run;

    if (hasPlayers && hasSwarm && isGameStateRun) {
      requestAnimationFrame(this._gameLoop.bind(this));
    } else {
      this._gameState = GameState.gameOver;
      this._onGameOver(this._score);
    }
    if (isGameOver) {
      this.stop();
    }
  }

  /**
   * Удаляет игровые объекта помеченные на удаление
   */
  private _garbageCollector() {
    let objectCount = this._objects.length;
    let deleteObjectCount = 0;
    for (let i = 0; i < objectCount; i += 1) {
      const object = this._objects[i];
      if (object instanceof Swarm) {
        // Если объект рой, запускаем внутренний garbageCollector
        object.garbageCollector();
      }
      if (object.hasDelete) {
        this._objects.push(...this._objects.splice(i, 1));
        objectCount -= 1;
        deleteObjectCount += 1;
      }
    }
    this._objects.splice(objectCount, deleteObjectCount);
  }

  /**
   * Проверяет объект на нахождение в границах игрового поля
   *
   * @param position - Позиция проверяемого объекта
   * @param width - Ширина проверяемого объекта
   * @param height - Высота проверяемого объекта
   * @returns Возражает true если объект находится за границами игрового поля
   */
  // eslint-disable-next-line class-methods-use-this
  private _outOfBoundary(position: Vector, width: number, height: number) {
    if (position.y + height <= 0 || position.y >= GameEngine.gameAreaHeight) {
      return true;
    }
    if (position.x + width <= 0 || position.x >= GameEngine.gameAreaWidth) {
      return true;
    }
    return false;
  }

  /**
   * Очистка игрового поля
   */
  private _clear() {
    this._ctx.fillStyle = BG_COLOR;
    this._ctx.fillRect(
      0,
      0,
      GameEngine.gameAreaWidth,
      GameEngine.gameAreaHeight
    );
  }
}
