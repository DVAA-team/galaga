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
  }: GameEngineOptions) {
    this.ctx = ctx;
    this.debug = debug ?? false;
    this.gameAreaWidth = width;
    this.gameAreaHeight = height;
    this.onScoreUpdate = onScoreUpdate ?? noop;
    this.onGameOver = onGameOver ?? noop;

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

      this.gameState = GameState.run;

      // Запускаем основной цикл игры
      this.lastTime = performance.now();
      this.animationFrameId = requestAnimationFrame(this._gameLoop.bind(this));
    };

    if (this.gameState === GameState.ready) {
      // Первый запуск
      run();
    } else if (this.gameState === GameState.gameOver) {
      // Перезапуск
      this.objects = [];
      this.score = 0;
      this.init().then(run);
    } else {
      throw new Error('Ошибка старта игры, неверное состояние');
    }
  }

  /**
   * Остановка игры
   */
  public stop() {
    if (this.gameState !== GameState.run) {
      throw new Error('Ошибка остановки игры, неверное состояние');
    }

    window.removeEventListener('keydown', this._keyDownHandlerWithContext);
    window.removeEventListener('keyup', this._keyUpHandlerWithContext);

    // Устраняет залипание клавиш, если были нажаты в момент остановки
    this.playerAction.fire = false;
    this.playerAction.left = false;
    this.playerAction.right = false;

    this.onGameOver(this.score);

    // Остановка основного цикла спустя 1 сек, для отрисовки возможных анимаций взрыва и т.д.
    window.setTimeout(() => {
      this.gameState = GameState.gameOver;
      cancelAnimationFrame(this.animationFrameId);
    }, 1000);
  }

  /**
   * Добавляет очки
   *
   * @param score - Добавляемое количество очков
   */
  public addScore(score: number) {
    this.score += score;
    this.onScoreUpdate(this.score);
  }

  /**
   * Регистрирует конструкторы возможных объектов
   *
   * @param objectClass - Конструктор игрового объекта или массив конструкторов
   */
  public registerObject(
    objectClass: typeof GameObject | typeof GameObject[]
  ): void {
    if (Array.isArray(objectClass)) {
      this.objectsClass.push(...objectClass);
    } else {
      this.objectsClass.push(objectClass);
    }
  }

  /**
   * Инициализация всех игровых объектов.
   *
   * @returns Возвращает true при удачной инициализации игровых объектов
   */
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

  /**
   * Обработчики нажатия клавиши
   *
   * @param param0 - Событие клавиатуры
   */
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

  /**
   * Обработчики отпускания клавиши
   *
   * @param param0 - Событие клавиатуры
   */
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

  /**
   * Главный игровой цикл.
   *
   * @param nowTime - Время в мсек прошедшее с последнего вызова
   */
  private _gameLoop(nowTime: DOMHighResTimeStamp) {
    const dt = nowTime - this.lastTime;
    this.lastTime = nowTime;

    this._clear();
    this._garbageCollector();

    let gameOver = true;

    for (let i = 0; i < this.objects.length; i += 1) {
      this.objects[i].update(dt);

      if (this.objects[i] instanceof Projectile) {
        // Обработка пуль
        const projectile = this.objects[i] as Projectile;
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
          for (let j = 0; j < this.objects.length; j += 1) {
            if (
              !(this.objects[j] instanceof Projectile) &&
              !this.objects[j].hasDelete
            ) {
              // Обрабатывает только те объекты которые не являются пулями и еще не удалены
              const gameObject = this.objects[j];

              if (isRectCollide(gameObject, projectile)) {
                if (
                  gameObject instanceof Swarm &&
                  projectile.type === ProjectileType.player
                ) {
                  // Пуля игрока столкнулась с роем
                  gameObject.calcCollide(projectile);
                  if (projectile.hasDelete) {
                    this.addScore(100);
                  }
                } else if (
                  gameObject instanceof Player &&
                  projectile.type === ProjectileType.enemy
                ) {
                  // Пуля роя столкнулась с игроком
                  projectile.delete();
                  gameObject.delete();
                  gameOver = true;
                }
              }
            }
          }
        }
      } else if (this.objects[i] instanceof Swarm) {
        // Обработка перемещения роя
        const swarm = this.objects[i] as Swarm;
        gameOver = false; // Если рой все еще присутствует на игровом поле игра не окончена
        if (
          swarm.position.x < 10 ||
          swarm.position.x + swarm.width > this.gameAreaWidth - 10
        ) {
          swarm.revertVelocityX();
        }
      } else if (this.objects[i] instanceof Player) {
        // Обработка перемещения игрока
        const player = this.objects[i] as Player;
        if (this.playerAction.left && player.position.x >= LEFT_PADDING) {
          player.left();
        } else if (
          this.playerAction.right &&
          player.position.x <= this.gameAreaWidth - player.width - RIGHT_PADDING
        ) {
          player.right();
        } else {
          player.stop();
        }

        if (this.playerAction.fire) {
          player.fire();
        }
      }
    }

    this.animationFrameId = requestAnimationFrame(this._gameLoop.bind(this));
    if (gameOver) {
      this.stop();
    }
  }

  /**
   * Удаляет игровые объекта помеченные на удаление
   */
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
        // Если объект рой, запускаем внутренний garbageCollector
        object.garbageCollector();
      }
    }
    this.objects.splice(objectCount, deleteObjectCount);
  }

  /**
   * Проверяет объект на нахождение в границах игрового поля
   *
   * @param position - Позиция проверяемого объекта
   * @param width - Ширина проверяемого объекта
   * @param height - Высота проверяемого объекта
   * @returns Возражает true если объект находится за границами игрового поля
   */
  private _outOfBoundary(position: Vector, width: number, height: number) {
    if (position.y + height <= 0 || position.y >= this.gameAreaHeight) {
      return true;
    }
    if (position.x + width <= 0 || position.x >= this.gameAreaWidth) {
      return true;
    }
    return false;
  }

  /**
   * Очистка игрового поля
   */
  private _clear() {
    this.ctx.clearRect(0, 0, this.gameAreaWidth, this.gameAreaHeight);
  }
}
