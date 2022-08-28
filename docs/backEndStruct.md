# Структура backend <!-- omit in toc -->

Ниже указаны потенциальные места добавления кода в проекте

```
┌ <projectRoot>
├─┬ src
│ ├─┬ database
│ │ ├─ controllers <- Контроллеры БД
│ │ ├─ migrations
│ │ └─ models <- Модели таблиц
│ └─┬ server
│   ├─ controllers <- Контроллеры express, "бизнес логика"
│   ├─ middlewares <- Общие
│   └─ routes <- Логика для отдельных "ручек"

```

- [1. Контроллеры БД](#1-контроллеры-бд)
- [2. Модели таблиц БД](#2-модели-таблиц-бд)
- [3. Миграции](#3-миграции)
- [4. Контроллеры express](#4-контроллеры-express)
- [5. "Ручки"](#5-ручки)

## 1. Контроллеры БД

Занимаются подготовкой данные к записи в БД и обработкой прочитанных из БД данных.

Пример контроллера возвращающего пользователей:

```javascript
// src/database/controllers/userController.ts
import { User } from '@/database/models';
const getUserById = (id: number): Promise<User | null> =>
  User.findOne({ where: { id } });

export default {
  getUserById,
};
```

Подключение осуществляется в `src/database/controllers/index.ts`

```javascript
// src/database/controllers/index.ts

// ....

export { default as dbUserController } from './userController';
};
```

## 2. Модели таблиц БД

Содержат описание таблиц БД. Подробнее про конфигурацию моделей см. доку sequelize: по [моделям](https://sequelize.org/docs/v6/core-concepts/model-basics/#extending-model) по [TypeScript](https://sequelize.org/docs/v6/other-topics/typescript/#the-case-of-modelinit), по [типам дынных](https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types), по [опциям колонок](https://sequelize.org/docs/v6/core-concepts/model-basics/#column-options).

Также в каждом классе моделей необходимо определить статическую функцию `registration(sequelize: Sequelize) => void`.

Пример описания таблицы пользователей:

```javascript
// src/database/models/User.ts
/* eslint-disable no-use-before-define */
import type {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
  ModelStatic,
} from 'sequelize';
import { DataTypes, Model } from 'sequelize';

const modelName = 'User';
const tableName = 'Users';

export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>; // Поле опционально при создании записи

  declare firstName: string;

  declare secondName: string;

  declare avatar: CreationOptional<string>; // Поле опционально при создании записи

  // Обязательный метод, для регистрации модели
  static registration = (sequelize: Sequelize) => {
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        first_name: {
          type: DataTypes.STRING,
        },
        second_name: {
          type: DataTypes.STRING,
        },
        avatar: {
          type: DataTypes.STRING,
          defaultValue: '',
        },
      },
      {
        sequelize,
        modelName, // Указывать обязательно, иначе при prod сборке webpack заменит на случайные переменные
        tableName, // Указывать обязательно, иначе при prod сборке webpack заменит на случайные переменные
        /* другие опции модели */
      }
    );
  };
}

// Функция проверки является ли переданная модель моделью пользователя
export const isUserMode = (mode: ModelStatic<Model>): mode is typeof User => {
  return mode.tableName === User.tableName;
};
```

Подключение осуществляется в `src/database/models/index.ts`

```javascript
// src/database/models/index.ts

// ....

export { default as User, isUserMode } from './User';
};
```

## 3. Миграции

Возможно несколько вариантов написания миграций. Типовой файл транзакции должен именоваться по конвенции `XXXX-<Описание>.ts`, где `XXXX` - порядковый номер миграции.

Типовой файл миграции имеет вид:

```javascript
// src/database/migrations/0001-first-migration.ts
import type { TUmugMigrationFn } from '@/database/types';

export const up: TUmugMigrationFn = async ({
  context: { queryInterface, sequelize, transaction },
}) => {
  // Описание миграции
};

// Функция может отсутствовать если миграцию невозможно обратить
export const down: TUmugMigrationFn = async ({
  context: { queryInterface, sequelize, transaction },
}) => {
  // Описание отката миграции
};
```

Внутри миграция можно использовать модели:

```javascript
// src/database/migrations/0001-first-migration.ts
import type { TUmugMigrationFn } from '@/database/types';
import { User } from '@/database/models';

export const up: TUmugMigrationFn = async ({
  context: { queryInterface, sequelize, transaction },
}) => {
  User.registration(sequelize); // Регистрация модели, так-как транзакции собираются отельный сборкой webpack
  await User.create(
    {
      // Поля необходимые для создания пользователя
    },
    { transaction }
  );
};

// ...
```

Также можно пользоваться [интерфейсом запросов](https://sequelize.org/api/v6/class/src/dialects/abstract/query-interface.js~queryinterface):

```javascript
// src/database/migrations/0001-first-migration.ts
import type { TUmugMigrationFn } from '@/database/types';
import { User } from '@/database/models';

export const up: TUmugMigrationFn = async ({
  context: { queryInterface, sequelize, transaction },
}) => {
  await queryInterface.bulkInsert(
    'users',
    [
      {
        login: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        login: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    { transaction }
  );
};
```

**ВАЖНО:** Не забывайте указывать для любых методов общения с БД, что они выполняются в транзакции!!!

## 4. Контроллеры express

Занимаются обслуживаем конкретных ручек API. Для каждой сущности рекомендуется создавать отдельную папку со свои `index.ts` см. структуру `src/server/controllers/healthchecks`.

Пример контроллера пользователя:

```javascript
// src/server/controllers/users/userDetail.ts
import { Request, Response } from 'express';
import { dbUserController } from '@/database/controllers';

export default function userDetail(req: Request, res: Response) {
  const { userId } = req.params;
  dbUserController
    .getUserById(Number(userId))
    .then((user) => {
      if (user) {
        res.status(200).json(user.toJSON());
      } else {
        res.status(404).json({
          reason: `User with id ${userId} was not found`,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ reason: `${error}` });
    });
}
```

Свой `index.ts`:

```javascript
// src/server/controllers/users/index.ts
import userDetail from './userDetail';

export default {
  userDetail,
};
```

И подключение в общий `index.ts`:

```javascript
// src/server/controllers/index.ts
// ...
export { default as userController } from './users';
```

## 5. "Ручки"

Обобщение всех методов работы с конкретным маршрутом.

Пример "ручки" `/users`:

```javascript
// src/server/routes/api/users.ts
import { Router } from 'express';
import { userController } from '@/server/controllers';

const router: Router = Router();

router
  .route('/users/:userId')
  .get([
    /* TODO Валидация, подготовка запроса, и т.д. */
    userController.userDetail,
  ])
  .path([
    /* Обработка частичного обновления */
  ])
  .put([
    /* Обработка полного обновления */
  ])
  .delete([
    /* Обработка удаления */
  ]);

router
  .route('/users')
  .get([
    /* Обработка получения всех пользователе */
  ])
  .post([
    /* Обработка создания пользователя */
  ]);

export default router;
```

Подключение:

```javascript
// src/server/routes/api/index.ts
import users from './users';

// ...

router.use(checkDBConnection).use(users);

export default router;
```
