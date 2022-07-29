import { Vector } from './Vector';

describe('Вектор', () => {
  test('должен правильно создаваться', () => {
    const X = 42;
    const Y = 24;
    const v = new Vector(X, Y);

    expect(v.x).toBe(X);
    expect(v.y).toBe(Y);
  });

  test('должен правильно вычитаться с одним параметром', () => {
    const a = new Vector(1, 2);
    const b = new Vector(2, 1);

    expect(a.subtract(b)).toEqual(new Vector(-1, 1));
  });

  test('должен правильно вычитаться с двумя параметрами', () => {
    const a = new Vector(1, 2);

    expect(a.subtract(2, 1)).toEqual(new Vector(-1, 1));
  });

  test('должен правильно суммироваться с одним параметром', () => {
    const a = new Vector(1, 2);
    const b = new Vector(2, 1);

    expect(a.add(b)).toEqual(new Vector(3, 3));
  });

  test('должен правильно суммироваться с двумя параметрами', () => {
    const a = new Vector(1, 2);

    expect(a.add(2, 1)).toEqual(new Vector(3, 3));
  });
});
