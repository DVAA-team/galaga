import {
  AbstractGameObject,
  GameObjectType,
  TGameObjectOptions,
} from './AbstractGameObject';
import { PLAYER_FIRE_RATE } from './const';
import { createPlayerProjectile } from './Projectile';
import { Vector } from './Vector';

type TPlayerOptions = TGameObjectOptions & {
  onFire: (p: AbstractGameObject) => void;
};

export class Player extends AbstractGameObject {
  static type = GameObjectType.Player;

  private _onFire: (p: AbstractGameObject) => void;

  private _elapsedTimeOnFile = 0;

  constructor(options: TPlayerOptions) {
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
    this._elapsedTimeOnFile += dt;
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
    if (this._elapsedTimeOnFile >= PLAYER_FIRE_RATE) {
      this._elapsedTimeOnFile = 0;
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
export function isPlayer(val: typeof AbstractGameObject): val is typeof Player {
  return val.type === GameObjectType.Player;
}
