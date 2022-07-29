export class Vector {
  public x: number;

  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * Вычитание векторов.
   *
   * Вычитаются одноименные координаты
   *
   * @param vector - Вычитаемый вектор
   * @returns Результат в виде вектора
   */
  public subtract(vector: Vector): Vector;

  /**
   * Вычитание из вектора констант.
   *
   * @param x - Вычитаемая составляющая X
   * @param y - Вычитаемая составляющая Y
   * @returns Результат в виде вектора
   */
  public subtract(x: number, y: number): Vector;

  public subtract(...[a, b]: unknown[]): Vector {
    if (typeof a === 'number' && typeof b === 'number') {
      return new Vector(this.x - a, this.y - b);
    }
    if (a instanceof Vector) {
      return new Vector(this.x - a.x, this.y - a.y);
    }
    throw new Error('Unknowns arguments');
  }

  /**
   * Сложение векторов.
   *
   * Складываются одноименные координаты
   *
   * @param vector - Прибавляемый вектор вектор
   * @returns Результат в виде вектора
   */
  public add(vector: Vector): Vector;

  /**
   *  Прибавление к вектору констант.
   *
   *
   * @param x - Прибавляемая составляющая X
   * @param y - Прибавляемая составляющая Y
   * @returns Результат в виде вектора
   */
  public add(x: number, y: number): Vector;

  public add(...[a, b]: unknown[]): Vector {
    if (typeof a === 'number' && typeof b === 'number') {
      return new Vector(this.x + a, this.y + b);
    }
    if (a instanceof Vector) {
      return new Vector(this.x + a.x, this.y + a.y);
    }
    throw new Error('Unknowns arguments');
  }

  /**
   * Расчет длинны вектора
   *
   * @returns Длинна вектора
   */
  public length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  /**
   * Скалярное произведение.
   *
   * Результирующий вектор будет направлен от вектора переданного в аргументе
   *
   * @param vector - Вектор для произведения
   * @returns Результирующий вектор
   */
  public dot(vector: Vector) {
    return this.x * vector.x + this.y * vector.y;
  }

  /**
   * Получить нормальный вектор.
   *
   * @returns Возвращает нормализованный вектор
   */
  public normalize() {
    return new Vector(this.x / this.length(), this.y / this.length());
  }
}
