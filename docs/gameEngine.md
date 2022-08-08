# Игровой движок <!-- omit in toc -->

Базовые классы:

- [UML диаграмма общих взаимосвязей](#uml-диаграмма-общих-взаимосвязей)
- [Базовые классы](#базовые-классы)
  - [GameEngine](#gameengine)
  - [AbstractGameObject](#abstractgameobject)
  - [Sound](#sound)
  - [Sprite](#sprite)
  - [Vector](#vector)
  - [Расчет столкновений](#расчет-столкновений)

## UML диаграмма общих взаимосвязей

```mermaid
classDiagram
  direction RL

  class AbstractGameObject {
    <<abstract>>
    +position : Vector
    +velocity : Vector
    +width : number
    +height : number
    #debug : boolean
    -hasDelete: boolean

    +delete() void
    +init()* void
    +update(dt : number)* void
    #draw() void
    #debugDraw(color : string) void
  }

  class Vector {
    +x : number
    +y : number
  }

  class Player {
    -fireSound : Sound
    -killSound : Sound
    -idleSprite : Sprite
    -explosionSprite : Sprite

    +left() void
    +right() void
    +stop() void
    +fire() void
  }

  class Enemy {
    -fireSound : Sound
    -killSound : Sound
    -idleSprite : Sprite
    -explosionSprite : Sprite
    -dead : boolean

    +fire() void
  }

  class Swarm {
    -enemys : Enemy[0..*]
    +calcCollide() void
    +garbageCollector() void
  }

  class Projectile {
    -sprite : Sprite
  }

  class Sound {
    +name : string
    -buffer : AudioBuffer
    +play() void
  }

  class Sprite {
    +name : string
    +width : number
    +height : number
    +images : ImageBitmap[1..*]
    +draw() void
    +animate() void
    +animateOnce() boolean
  }

  class GameEngine {
    -objects: AbstractGameObject[0..*]

    +init() : Promise<boolean>
    +start() void
    +stop() void
    +addScore(score : number) void
    -gameLoop(nowTime : number) void
    -garbageCollector() void
  }

  GameEngine o-- "0..*" Swarm
  GameEngine o-- "1..2" Player
  GameEngine o-- "0..*" Projectile
  AbstractGameObject <|-- Enemy
  AbstractGameObject <|-- Player
  AbstractGameObject <|-- Swarm
  AbstractGameObject o-- Vector
  AbstractGameObject <|-- Projectile
  Swarm o-- "1..*" Enemy
  Enemy o-- Sprite
  Enemy o-- Sound
  Player o-- Sprite
  Player o-- Sound

```

## Базовые классы

### GameEngine

Основной класс, здесь запускается игровой цикл, здесь запускается инициализация всех игровых объектов. А также содержатся вспомогательные методы по работе с различной логикой игры.

### AbstractGameObject

Абстрактный класс игрового объекта, содержит интерфейс необходимый для оперирования объектами в `GameEngine`

### Sound

Класс работы со звуками

### Sprite

Класс работы с изображениями.

```javascript
const sprite = new Sprite({
  name: '<имяСпрайта>',
  imahes:
});
```

### Vector

Класс для хранения и работы с векторной информацией. Хранит в себе две координаты по X и Y осям соответственно.

Поддерживаемые методы:

- **вычитание**
  - `v1.subtract(v2)` - вычитает из элементов `v1` элементы `v2`, возвращает новый вектор с результатом.
  - `v1.subtract(x1, y1)` - вычитает из элементов `v1` переданные аргументы, соответственно, возвращает новый вектор с результатом.
- **сложение**
  - `v1.add(v2)` - складывает одноименные элементы `v1` и `v1`, возвращает новый вектор с результатом.
  - `v1.add(x1, x2)` - складывает элементы `v1` и переданные аргументы соответственно, возвращает новый вектор с результатом.
- **длинна вектора** `v1.length()`.
- **скалярное произведение** `v1.dor(v2)`.
- **нормализованный вектор** `v1.normalize()`.

### Расчет столкновений

![rectCollide](./GameEngine/rectCollide.gif)
