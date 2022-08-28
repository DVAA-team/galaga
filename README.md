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

Запуститься два докер контейнера `postgres:14.5-alpine` c именем `galaga-db` и `dpage/pgadmin4` c именем `galaga-pgadmin`. [Подробнее про pgadmin](https://www.pgadmin.org/screenshots/#9)

Дополнительные команды:

- `npm run lint` - Проверка типов и линтиг всего проекта
- `local:dev` - запуск webpack сборки локально
- `dc:up` - Запуск в docker-compose приложения и базы
- `dc:down` - Удалить запущенные контейнеры
- `dc:logs` - Вывести логи контейнеров, если добавить `-- -f`, логи будут обновляться, можно выводить логи только определенного контейнера `-- app`
- `dc:up:dev` - Запуск в docker-compose pgadmin и базы, можно запустить только выбранный контейнер `-- db`
- `dc:down:dev` - Удалить запущенные контейнеры
- `dc:logs:dev` - Вывести логи контейнеров

Для корректного запуска необходимо создать файл `.env` в корне проекта со следующим содержимым

```
NODE_ENV=development
PORT=3000
DB_PORT=5432
DB_HOST=db
DEBUG="galaga:*"
POSTGRES_USER=<ЛюбоеИмяПользователя>
POSTGRES_PASSWORD=<ЛюбойПароль>
POSTGRES_DB=<НазваниеБД>
PGADMIN_DEFAULT_EMAIL=<ЛогинВPGAdmin>
PGADMIN_DEFAULT_PASSWORD=<ПарольВPGAdmin>
PGADMIN_LISTEN_PORT=80
```

При этом база `<НазваниеБД>` должна быть создана в ручную, можно через PGAdmin

## Сборка приложения

```
$ npm i
$ npm run build
```

[Документация](docs/README.md)
