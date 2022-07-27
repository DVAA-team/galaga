import { spriteMap, SpriteType } from '@/pages/Game/Engine/assets';
import Sprite from '@/pages/Game/Engine/Sprite';
import { AbstractGameObject, TGameObjectOptions } from './AbstractGameObject';
import {
  BULLET_OFFSET_X,
  BULLET_OFFSET_Y,
  ENEMY_BULLET_HEIGHT,
  ENEMY_BULLET_WIDTH,
  PLAYER_BULLET_HEIGHT,
  PLAYER_BULLET_WIDTH,
} from './const';
import { Vector } from './Vector';

export enum ProjectileType {
  player,
  enemy,
}

type TProjectileOptions = TGameObjectOptions & {
  type: ProjectileType;
  sprite: Sprite;
};

export class Projectile extends AbstractGameObject {
  public type: ProjectileType;

  private _sprite: Sprite;

  constructor(options: TProjectileOptions) {
    const { type, sprite, ...superOptions } = options;
    super(superOptions);
    this.type = type;
    this._sprite = sprite;
  }

  // При использовании убрать eslint-disable-next-line
  // eslint-disable-next-line class-methods-use-this
  public async init(): Promise<boolean> {
    return true;
  }

  // При использовании _dt переименовать в dt и убрать eslint-disable-next-line
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(_dt: number): void {
    if (!this._sprite) {
      throw new Error('Не задан спрайты пули');
    }
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this._sprite.draw(
      this.ctx,
      this.position.x - BULLET_OFFSET_X,
      this.position.y - BULLET_OFFSET_Y
    );
    this.draw();
  }

  protected draw(): void {
    super.debugDraw('yellow');
  }
}

type TCreateProjectileOptions = Omit<
  TProjectileOptions,
  'width' | 'height' | 'velocity' | 'type' | 'sprite'
> & {
  velocity: number;
};

const makeCreateProjectileFn = (
  type: ProjectileType,
  width: number,
  height: number
) => {
  let velocityDirection: number;
  let spriteName: string;
  if (type === ProjectileType.player) {
    velocityDirection = -1;
    spriteName = SpriteType.playerProjectile;
  } else {
    velocityDirection = 1;
    spriteName = SpriteType.enemyProjectile;
  }

  /**
   * Создает пулю
   *
   * @param options.ctx - Контекст для рисования
   * @param options.position - Позиция спавна пуль
   * @param options.velocity - Скорость пули
   * @param options.debug - Режим отладки
   * @returns Объект пули
   */
  return (options: TCreateProjectileOptions) => {
    const { ctx, position, velocity, debug } = options;
    return new Projectile({
      type,
      ctx,
      position: position.subtract(width / 2, height),
      velocity: new Vector(0, velocityDirection * velocity),
      height,
      width,
      debug,
      sprite: spriteMap.getSpriteByName(spriteName),
    });
  };
};

/**
 * Создает пулю игрока
 */
export const createPlayerProjectile = makeCreateProjectileFn(
  ProjectileType.player,
  PLAYER_BULLET_WIDTH,
  PLAYER_BULLET_HEIGHT
);

/**
 * Создает пулю врага
 */
export const createEnemyProjectile = makeCreateProjectileFn(
  ProjectileType.enemy,
  ENEMY_BULLET_WIDTH,
  ENEMY_BULLET_HEIGHT
);
