import { GameObject, GameObjectOptions } from './GameObject';
import { Vector } from './Vector';

export enum ProjectileType {
  player,
  enemy,
}

type ProjectileOptions = GameObjectOptions & {
  type: ProjectileType;
};

export class Projectile extends GameObject {
  public type: ProjectileType;

  constructor(options: ProjectileOptions) {
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
) => {
  const height = 3;
  const width = 3;

  return new Projectile({
    type: ProjectileType.player,
    ctx,
    height,
    position: position.subtract(width / 2, height),
    velocity: new Vector(0, -velocity),
    width,
    debug,
  });
};

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
) => {
  const height = 6;
  const width = 3;

  return new Projectile({
    type: ProjectileType.enemy,
    ctx,
    height,
    position: position.subtract(width / 2, height),
    velocity: new Vector(0, velocity),
    width,
    debug,
  });
};
