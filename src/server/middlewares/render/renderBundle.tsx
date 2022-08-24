import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import htmlescape from 'htmlescape';

/**
 * Импортируем сборку клиента для запуска на сервере
 * Файл генерируется конфигом webpack (см. webpack/ssr-client.config.ts)
 */
import { Bundle } from 'builded-ssr-client';
import type { TRootState } from '@/store';

type TPageHtmlParams = {
  location: string;
  initialState: TRootState;
  serverData?: unknown;
  clientData?: unknown;
};

export default function renderBundle({
  serverData = {},
  clientData = {},
  location,
  initialState,
}: TPageHtmlParams): string {
  const bundleHtml = renderToString(
    <Bundle location={location} data={serverData} initialState={initialState} />
  );

  const html = renderToStaticMarkup(
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Galaga - Легендарная аркадная игра 80х"
        />
        <link rel="apple-touch-icon" href="logo192.png" />
        <link rel="manifest" href="manifest.json" />
        <title>Galaga</title>
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root" dangerouslySetInnerHTML={{ __html: bundleHtml }} />
        <script src="webClient.js"></script>
        <script
          dangerouslySetInnerHTML={{
            /**
             * переменная WebClient создается вебпаком см. webpack/web-client.config.ts
             * секция output ключ library. Эта переменная - это и есть само
             * приложение. Вызывая, WebClient.default() мы вызываем hydrateRoot
             * (см. дефолтный экспорт в файле src/ssr-client.tsx
             */
            __html: `WebClient.default(${htmlescape(initialState)},${htmlescape(
              clientData
            )});delete window.WebClient;`,
          }}
        />
      </body>
    </html>
  );

  return `<!doctype html>${html}`;
}
