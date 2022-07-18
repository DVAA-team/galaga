# Galaga

Легендарная аркадная игра 80х

## Badges
![Heroku](https://heroku-badge.herokuapp.com/?app=galaga-dvaa)

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
$ npm ci
$ npm run dev
```

## Сборка приложения

```
$ npm ci
$ npm run build
```

## Flow работы с проектом

- Форкаем проект
- В своем форке создаем новую ветку, делаем туда коммиты
- Когда все готово создаем PR в основной репо
- Прикрепляем PR к карточке trello
- Проходим ревью
- Вливаем в ветку main (через squash & merge)
- Оповещаем всех остальных (чтобы они подтянули изменения из main и сразу порешали merge conflict)

Шаблон названия веток: task-{номер задачи в trello}-{краткое описание})
Например: task-18-readme, task-2-webpack
