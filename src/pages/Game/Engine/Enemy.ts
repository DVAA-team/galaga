import { AbstractGameObject, GameObjectType } from './AbstractGameObject';

export class Enemy extends AbstractGameObject {
  static type = GameObjectType.Enemy;

  public inSwarm = true;

  // При использовании убрать eslint-disable-next-line
  // eslint-disable-next-line class-methods-use-this
  public async init(): Promise<boolean> {
    // Загрузка спрайтов и т.д.
    return true;
  }

  // При использовании _dt переименовать в dt и убрать eslint-disable-next-line
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(_dt: number): void {
    if (this.inSwarm) {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    } else {
      // Самостоятельная траектория
    }

    this.draw();
  }

  protected draw(): void {
    super.debugDraw('red');
  }
}
