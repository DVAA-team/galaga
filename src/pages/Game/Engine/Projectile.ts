import { AbstractGameObject, TGameObjectOptions } from './AbstractGameObject';
import {
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
};

export class Projectile extends AbstractGameObject {
  public type: ProjectileType;

  constructor(options: TProjectileOptions) {
    super(options);
    this.type = options.type;
  }

  // При использовании убрать eslint-disable-next-line
  // eslint-disable-next-line class-methods-use-this
  public async init(): Promise<boolean> {
    return true;
  }

  // При использовании _dt переименовать в dt и убрать eslint-disable-next-line
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(_dt: number): void {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.draw();
  }

  protected draw(): void {
    super.debugDraw('yellow');
  }
}

/**
 * Создает пулю игрока
 *
 * @param ctx - Контекст для рисования
 * @param position - Позиция спавна пуль
 * @param velocity - Скорость пули
 * @param debug - Режим отладки
 * @returns Объект пули
 */
export const createPlayerProjectile = (
  ctx: CanvasRenderingContext2D,
  position: Vector,
  velocity: number,
  debug?: boolean
) =>
  new Projectile({
    type: ProjectileType.player,
    ctx,
    position: position.subtract(PLAYER_BULLET_WIDTH / 2, PLAYER_BULLET_HEIGHT),
    velocity: new Vector(0, -velocity),
    height: PLAYER_BULLET_HEIGHT,
    width: PLAYER_BULLET_WIDTH,
    debug,
  });

/**
 * Создает пулю врага
 *
 * @param ctx - Контекст для рисования
 * @param position - Позиция спавна пуль
 * @param velocity - Скорость пули
 * @param debug - Режим отладки
 * @returns Объект пули
 */
export const createEnemyProjectile = (
  ctx: CanvasRenderingContext2D,
  position: Vector,
  velocity: number,
  debug?: boolean
) =>
  new Projectile({
    type: ProjectileType.enemy,
    ctx,
    position: position.subtract(ENEMY_BULLET_WIDTH / 2, ENEMY_BULLET_HEIGHT),
    velocity: new Vector(0, velocity),
    height: ENEMY_BULLET_HEIGHT,
    width: ENEMY_BULLET_WIDTH,
    debug,
  });
