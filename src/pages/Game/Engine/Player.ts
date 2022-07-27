import Sound from '@/pages/Game/Engine/Sound';
import {
  AbstractGameObject,
  GameObjectType,
  TGameObjectOptions,
} from './AbstractGameObject';
import { soundMap, SoundType, spriteMap, SpriteType } from './assets';
import { PLAYER_FIRE_RATE } from './const';
import { createPlayerProjectile } from './Projectile';
import Sprite from './Sprite';
import { Vector } from './Vector';

type TPlayerOptions = TGameObjectOptions & {
  onFire: (p: AbstractGameObject) => void;
};

export class Player extends AbstractGameObject {
  static type = GameObjectType.Player;

  private _onFire: (p: AbstractGameObject) => void;

  private _elapsedTimeOnFile = 0;

  private _idleSprite: Sprite | null = null;

  private _fireSound: Sound | null = null;

  private _killSound: Sound | null = null;

  private _explosionSprite: Sprite | null = null;

  private _dead = false;

  constructor(options: TPlayerOptions) {
    const { onFire, ...superOptions } = options;
    super(superOptions);
    this._onFire = onFire;
  }

  public async init(): Promise<boolean> {
    await soundMap.init();
    await spriteMap.init();

    this._fireSound = soundMap.getSoundByName(SoundType.fire);
    this._killSound = soundMap.getSoundByName(SoundType.kill);

    this._idleSprite = await spriteMap.getSpriteByName(SpriteType.player);
    this._explosionSprite = await spriteMap.getSpriteByName(
      SpriteType.playerExplosion
    );
    return true;
  }

  public update(dt: number): void {
    if (!this._idleSprite || !this._explosionSprite) {
      throw new Error('Не задан спрайт для бездействия игрока');
    }

    this._elapsedTimeOnFile += dt;
    this.position.x += this.velocity.x;

    if (this._dead) {
      const animated = this._explosionSprite.animateOnce(
        this.ctx,
        this.position.x - this.width / 2,
        this.position.y - this.height / 2,
        dt
      );
      if (!animated) {
        super.delete();
      }
    } else {
      this._idleSprite.draw(this.ctx, this.position.x, this.position.y);
    }

    this.draw();
  }

  public override delete() {
    this._killSound?.play();
    this._dead = true;
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

      this._fireSound?.play();
      this._onFire(
        createPlayerProjectile({
          ctx: this.ctx,
          position: new Vector(
            this.position.x + this.width / 2,
            this.position.y
          ),
          velocity: 10,
          debug: this.debug,
        })
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
