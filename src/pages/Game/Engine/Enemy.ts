import {
  soundMap,
  SoundType,
  spriteMap,
  SpriteType,
} from '@/pages/Game/Engine/assets';
import { BASE_SCORE } from '@/pages/Game/Engine/const';
import { createEnemyProjectile } from '@/pages/Game/Engine/Projectile';
import Sound from '@/pages/Game/Engine/Sound';
import Sprite from '@/pages/Game/Engine/Sprite';
import { Vector } from '@/pages/Game/Engine/Vector';
import {
  AbstractGameObject,
  GameObjectType,
  TGameObjectOptions,
} from './AbstractGameObject';

type TEnemyOptions = TGameObjectOptions & {
  type: number;
  onFire: (p: AbstractGameObject) => void;
};

export class Enemy extends AbstractGameObject {
  static type = GameObjectType.Enemy;

  public inSwarm = true;

  public readonly score: number = 0;

  private _type = 0;

  private _onFire: (p: AbstractGameObject) => void;

  private _fireSound: Sound | null = null;

  private _killSound: Sound | null = null;

  private _idleSprite: Sprite | null = null;

  private _explosionSprite: Sprite | null = null;

  private _dead = false;

  constructor(options: TEnemyOptions) {
    const { type, onFire, ...superOptions } = options;
    super(superOptions);
    this._type = type;
    this._onFire = onFire;
    this.score = BASE_SCORE * type;
  }

  public get isDead() {
    return this._dead;
  }

  public async init(): Promise<boolean> {
    await soundMap.init();
    await spriteMap.init();

    this._fireSound = soundMap.getSoundByName(SoundType.fire);
    this._killSound = soundMap.getSoundByName(SoundType.kill);

    this._idleSprite = spriteMap.getSpriteByName(
      `${SpriteType.enemy}_${this._type}`
    );
    this._explosionSprite = spriteMap.getSpriteByName(
      SpriteType.enemyExplosion
    );
    return true;
  }

  public update(dt: number): void {
    if (!this._idleSprite || !this._explosionSprite) {
      throw new Error(`Не задан спрайт для бездействия врага ${this._type}`);
    }

    if (!this.isDead) {
      if (this.inSwarm) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
      } else {
        // Самостоятельная траектория
      }
    }

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
      this._idleSprite.animate(this.ctx, this.position.x, this.position.y, dt);
    }

    this.draw();
  }

  public override delete() {
    this._killSound?.play();
    this._dead = true;
  }

  public fire() {
    this._fireSound?.play();
    this._onFire(
      createEnemyProjectile({
        ctx: this.ctx,
        position: new Vector(
          this.position.x + this.width / 2,
          this.position.y + this.height
        ),
        velocity: 5,
        debug: this.debug,
      })
    );
  }

  protected draw(): void {
    super.debugDraw('red');
  }
}
