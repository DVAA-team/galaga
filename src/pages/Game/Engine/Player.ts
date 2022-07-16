import { PLAYER_FIRE_RATE } from './const';
import { GameObject, GameObjectOptions, GameObjectType } from './GameObject';
import { createPlayerProjectile } from './Projectile';
import { Vector } from './Vector';

type PlayerOptions = GameObjectOptions & {
  onFire: (p: GameObject) => void;
};

export class Player extends GameObject {
  static type = GameObjectType.Player;

  private _onFire: (p: GameObject) => void;

  private elapsedTimeOnFile = 0;

  constructor(options: PlayerOptions) {
    super(options);
    this._onFire = options.onFire;
  }

  // При использовании убрать eslint-disable-next-line
  // eslint-disable-next-line class-methods-use-this
  public async init(): Promise<boolean> {
    // Загрузка спрайтов и т.д.
    return true;
  }

  public update(dt: number): void {
    this.elapsedTimeOnFile += dt;
    this.position.x += this.velocity.x;
    this.draw();
  }

  /**
   * Движение игрока влево
   */
  public left() {
    this.velocity.x = -5;
  }

  /**
   * Движение игрока вправо
   */
  public right() {
    this.velocity.x = 5;
  }

  /**
   * Остановка игрока
   */
  public stop() {
    this.velocity.x = 0;
  }

  /**
   * Выстрел игрока
   */
  public fire() {
    if (this.elapsedTimeOnFile >= PLAYER_FIRE_RATE) {
      this.elapsedTimeOnFile = 0;
      this._onFire(
        createPlayerProjectile(
          this.ctx,
          new Vector(this.position.x + this.width / 2, this.position.y),
          10,
          this.debug
        )
      );
    }
  }

  protected draw(): void {
    super.debugDraw('green');
  }
}

/**
 * Проверяет на конструктор класса Player
 *
 * @param val - Конструктор объекта для проверки
 * @returns Возвращает true если переданный конструктор является
 * конструктором Player иначе false
 */
export function isPlayer(val: typeof GameObject): val is typeof Player {
  return val.type === GameObjectType.Player;
}
