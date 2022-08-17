import {
  AbstractGameObject,
  GameObjectType,
  TGameObjectOptions,
} from '@/pages/Game/Engine/AbstractGameObject';

type TStarOptions = TGameObjectOptions & {
  color: string;
  gameAreaHeight: number;
};

export class Star extends AbstractGameObject {
  static type = GameObjectType.Star;

  private _color: string;

  private _gameAreaHeight: number;

  constructor(options: TStarOptions) {
    const { color, gameAreaHeight, ...superOptions } = options;
    super(superOptions);
    this._color = color;
    this._gameAreaHeight = gameAreaHeight;
  }

  public init(): Promise<boolean> {
    this.velocity.y = 2;
    return Promise.resolve(true);
  }

  // При использовании _dt переименовать в dt и убрать eslint-disable-next-line
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public update(_dt: number): void {
    this.position.y += this.velocity.y;
    if (this.position.y >= this._gameAreaHeight) {
      this.position.y = 0;
    }
    this.draw();
  }

  protected draw(): void {
    this.ctx.fillStyle = this._color;
    this.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

/**
 * Проверяет на конструктор класса Player
 *
 * @param val - Конструктор объекта для проверки
 * @returns Возвращает true если переданный конструктор является
 * конструктором Player иначе false
 */
export function isStar(val: typeof AbstractGameObject): val is typeof Star {
  return val.type === GameObjectType.Star;
}
