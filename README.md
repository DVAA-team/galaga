# Galaga

Легендарная аркадная игра 80х

## Badges

[![Deploy](https://github.com/DVAA-team/galaga/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/DVAA-team/galaga/actions/workflows/deploy.yml)

## Технологии

Проект создан на базе:

- React
- React Router
- React Hook Form
- Redux
- Typescript
- Webpack
- Tailwind CSS
- Docker
- Browser API

## Режим разработки

```
$ npm i
$ npm run dev
```

Запуститься два докер контейнера `postgres:14.5-alpine` c именем `galaga-db` и `dpage/pgadmin4` c именем `galaga-pgadmin`. [Подробнее про PGAdmin](https://www.pgadmin.org/screenshots/#9)

Дополнительные команды:

- `npm run lint` - Проверка типов и линтиг всего проекта
- `local:dev` - запуск webpack сборки локально
- `dc:up` - Запуск в docker-compose приложения и базы
- `dc:down` - Удалить запущенные контейнеры
- `dc:logs` - Вывести логи контейнеров, если добавить `-- -f`, логи будут обновляться, можно выводить логи только определенного контейнера `-- app`
- `dc:up:dev` - Запуск в docker-compose PGAdmin и базы, можно запустить только выбранный контейнер `-- db`
- `dc:down:dev` - Удалить запущенные контейнеры
- `dc:logs:dev` - Вывести логи контейнеров

Для корректного запуска необходимо создать файл `.env` в корне проекта со следующим содержимым

```
NODE_ENV=development
PORT=3000
DB_PORT=5432
DB_HOST=db
DEBUG="galaga:*"
POSTGRES_USER=<ЛюбоеИмяПользователяБД>
POSTGRES_PASSWORD=<ЛюбойПарольБД>
POSTGRES_DB=<НазваниеБД>
PGADMIN_DEFAULT_EMAIL=<ЛогинВPGAdmin>
PGADMIN_DEFAULT_PASSWORD=<ПарольВPGAdmin>
PGADMIN_LISTEN_PORT=80
```

При этом база `<НазваниеБД>` должна быть создана в ручную, можно через PGAdmin, приложение
автоматически добавляет суффиксы к имени базы для разных окружений `<НазваниеБД>_test`,
`<НазваниеБД>_dev` эти базы тоже должны быть созданы в ручную.

`DB_HOST` - для `prod` окружения указывается имя сервиса с базой данных указанное в `docker-compose.yml`, по умолчанию
`db`, для `dev` окружения необходимо указать `localhost`, так как приложение собирается локально.

`POSTGRES_PASSWORD` - пароль к базе данных внутри `postgres` (указывается в PGAdmin при подключении
к базе)

`PGADMIN_DEFAULT_PASSWORD` - Пароль к web-морде PGAdmin`а.

При добавлении коннекта к базе в PGAdmin хост указывается как имя сервиса с базой данных
указанное в `docker-compose.yml`, по умолчанию `db`. Если использовать сторонний софт, то хост
указывается как `localhost`

Посмотреть куда подключается приложение можно в логах, при установленной переменной `DEBUG="galaga:*"`, искать строчку:

```
  galaga:server:database waiting connection [postgres@db:5432?db=galaga_dev] .... +0ms
```

где:

- `postgres` - имя пользователя указанное в `POSTGRES_USER`
- `db` - хост БД указанный в `DB_HOST`
- `5432` - порт БД указанный в `DB_PORT`
- `galaga_dev` - имя базы данных с автоматическим суффиксом см. выше, указанное в `POSTGRES_DB`

_**Неочевидно!** При запуске приложение продует подключатся к базе 5 раз с интервалом в 5 сек.
Если подключение не установилось за этот промежуток времени, повторные попытки предприняты не
будут и приложение будет считать, что подключение отсутствует и отдавать
ошибку 500 на все запросы к API_

## Сборка приложения

```
$ npm i
$ npm run build
```

[Документация](docs/README.md)
