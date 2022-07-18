import {
  AbstractGameObject,
  GameObjectType,
  isRectCollide,
  TGameObjectOptions,
} from './AbstractGameObject';
import { ENEMY_FIRE_RATE, ENEMY_GAP, ENEMY_HEIGHT, ENEMY_WIDTH } from './const';
import { Enemy } from './Enemy';
import { createEnemyProjectile, Projectile } from './Projectile';
import { Vector } from './Vector';

type TSwarmOptions = TGameObjectOptions & {
  formation: number[][];
  onFire: (p: AbstractGameObject) => void;
};

export class Swarm extends AbstractGameObject {
  private _formation: number[][] = [[]];

  private _enemys: Enemy[] = [];

  private _onFire: (p: AbstractGameObject) => void;

  constructor(options: TSwarmOptions) {
    super(options);
    this._formation = options.formation;
    this._onFire = options.onFire;
  }

  static type = GameObjectType.Swarm;

  private _elapsedTimeOnFile = 0;

  public async init(): Promise<boolean> {
    // Загрузка спрайтов и т.д.

    // Инициализация врагов внутри роя
    for (let i = 0; i < this._formation.length; i += 1) {
      for (let j = 0; j < this._formation[i].length; j += 1) {
        const enemyType = this._formation[i][j];
        if (enemyType === 1) {
          this._enemys.push(
            new Enemy({
              ctx: this.ctx,
              position: new Vector(
                this.position.x + (ENEMY_WIDTH + ENEMY_GAP) * j,
                this.position.y + (ENEMY_HEIGHT + ENEMY_GAP) * i
              ),
              velocity: new Vector(0, 0),
              height: ENEMY_HEIGHT,
              width: ENEMY_WIDTH,
              debug: this.debug,
            })
          );
        }
      }
    }

    return true;
  }

  /**
   * Проверка столкновения каждого врага из роя и пули
   *
   * @param projectile - Пуля для проверки столкновения
   */
  public calcCollide(projectile: Projectile) {
    for (let i = 0; i < this._enemys.length; i += 1) {
      const enemy = this._enemys[i];
      if (isRectCollide(enemy, projectile) && !enemy.hasDelete) {
        enemy.delete();
        projectile.delete();
        const liveEnemy = this._enemys.reduce(
          (acc, e) => (e.hasDelete ? acc : acc + 1),
          0
        );
        if (liveEnemy === 0) {
          this.delete(); // Удаляем рой, так как нет больше врагов
        }
        break; // Выходим из цикла, так как столкновение найдено
      }
    }
  }

  /**
   * Удаляет врагов внутри роя, которые помечены как удаленные
   */
  public garbageCollector() {
    let enemyCount = this._enemys.length;
    let deleteEnemyCount = 0;
    for (let i = 0; i < enemyCount; i += 1) {
      const enemy = this._enemys[i];
      if (enemy.hasDelete) {
        this._enemys.push(...this._enemys.splice(i, 1));
        enemyCount -= 1;
        deleteEnemyCount += 1;
      }
    }
    this._enemys.splice(enemyCount, deleteEnemyCount);
  }

  public update(dt: number): void {
    this._elapsedTimeOnFile += dt;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    const fireEnemyIdx = Math.floor(Math.random() * this._enemys.length);

    this._enemys.forEach((enemy, idx) => {
      if (enemy.inSwarm) {
        // eslint-disable-next-line no-param-reassign
        enemy.velocity = this.velocity;
      }
      enemy.update(dt);
      // Стрельба случайного врага из роя
      if (idx === fireEnemyIdx && this._elapsedTimeOnFile >= ENEMY_FIRE_RATE) {
        this._elapsedTimeOnFile = 0;
        this._onFire(
          createEnemyProjectile(
            this.ctx,
            new Vector(
              enemy.position.x + enemy.width / 2,
              enemy.position.y + enemy.height
            ),
            5,
            this.debug
          )
        );
      }
    });
    this.draw();
  }

  /**
   * Изменение направления движения роя
   */
  public revertVelocityX() {
    this.velocity.x = -this.velocity.x;
  }

  protected draw(): void {
    super.debugDraw('green');
  }
}

/**
 * Проверяет на конструктор класса Swarm
 *
 * @param val - Конструктор объекта для проверки
 * @returns Возвращает true если переданный конструктор является
 * конструктором Swarm иначе false
 */
export function isSwarm(val: typeof AbstractGameObject): val is typeof Swarm {
  return val.type === GameObjectType.Swarm;
}
