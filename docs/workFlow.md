# Порядок работы с проектом <!-- omit in toc -->

- [1. GitHub](#1-github)
- [2. Документация](#2-документация)
- [3. git, не очевидное](#3-git-не-очевидное)
- [4. Отладка](#4-отладка)

## 1. GitHub

- Форкаем проект
- В своем форке создаем новую ветку, делаем туда коммиты
- Когда все готово создаем PR в основной репо
- Прикрепляем PR к карточке trello
- Проходим ревью
- Вливаем в ветку main (через squash & merge)
- Оповещаем всех остальных (чтобы они подтянули изменения из main и сразу порешали merge conflict)

Шаблон названия веток: task-{номер задачи в trello}-{краткое описание})
Например: task-18-readme, task-2-webpack

## 2. Документация

1. Создаем файл для описания чего-либо в папке `docs`
2. Добавляем ссылку на созданный файл в `docs/README.md`

   ```markdown
   - [Название раздела](ИмяФайла.md) - Краткое описание
   ```

3. Пишем документацию. (Если необходимо добавить изображения создаем папку одноименную файлу)

## 3. git, не очевидное

Для разрешения конфликтов `package-lock.json` файла достаточно в процессе merge\`а в терминале выполнить команду `npm install`, которая объединит текущие дерево зависимостей/подзависимостей с тем которое вливается. [Официальная дока npm](https://docs.npmjs.com/cli/v6/configuring-npm/package-locks#resolving-lockfile-conflicts)

## 4. Отладка

В проекте присутствует библиотека [debug](https://github.com/debug-js/debug), работающая и в
браузере и в node`е. При обычном запуске проекта никакого отладочного вывода не будет, для
его включения необходимо:

1. В браузере установить в `localStorage` переменную `debug` со значением `*` и включить
   уровень журнала `Verbose` см. [подробнее.](https://github.com/debug-js/debug/blob/master/README.md#browser-support)

2. Для вывода отладочных сообщений на стороне сервера перед командой запуска добавить
   `DEBUG='galaga:*'`, что выведет все логи от нашего приложения. [Подробности для Windows.](https://github.com/debug-js/debug/blob/master/README.md#windows-command-prompt-notes)

Подробнее про значение переменной `DEBUG` см. [тут](https://github.com/debug-js/debug/blob/master/README.md#conventions)

Примеры использование в исходниках:

```javascript
// Импорт для клиентского кода
import createDebug from '@/utils/debug'; // для серверного использовать '@/server/utils/debug'

const debug = createDebug.extend('<NameSpace>');

// ....

debug('<Сообщение>');

// ....
```

Где `<NameSpace>` - либо название файла, либо название контекста в котором будет выведено
`<Сообщение>`. Формат сообщения можно посмотреть [подробнее.](https://github.com/debug-js/debug/blob/master/README.md#formatters)

Пример абстрактного класса HTTP клиента:

```javascript
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import createDebug from '@/utils/debug';

const debug = createDebug.extend('httpClient');

export abstract class AbstractHttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      /** Axios options */
    });

    // ....

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        debug(
          'success %s response: %o',
          `${response.config.baseURL}${response.config.url}`,
          response
        );
        return response;
      },
      (error: any) => {
        if (error instanceof AxiosError) {
          debug(
            'error %s %s response: %o',
            error.code,
            `${error.config.baseURL}${error.config.url}`,
            error.response
          );
        } else {
          debug('unknown error %O', error);
        }
        return Promise.reject(error);
      }
    );
  }
}

```

Пример express middleware для вывода информации по запросу:

```javascript
import { RequestHandler } from 'express';
import createDebug from '@/server/utils/debug';

const debug = createDebug.extend('request');

const debugMiddleware: RequestHandler = (req, res, next) => {
  const reqDesc = `${req.method} ${req.url}`;
  debug(`start %s\ncookies: %O`, reqDesc, req.cookies);
  res.once('finish', () => debug('end %s', reqDesc));
  next();
};

export default loggerMiddleware;
```
