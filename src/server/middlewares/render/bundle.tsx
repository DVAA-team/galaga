import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { store } from '@/store';
import { Provider } from 'react-redux';
import path from 'path';
import * as fs from 'fs';
import requireFromString from 'require-from-string';
import { StaticRouter } from 'react-router-dom/server';
import htmlescape from 'htmlescape';
import { DIST_DIR } from '../../../../webpack/env';

interface IPageHtmlParams {
  bundleHtml: string;
  location: string;
}

function getPageHtml(params: IPageHtmlParams) {
  const { bundleHtml, location } = params;
  const data = {
    location,
    reduxInitState: {
      test: 123,
    },
  };
  const html = renderToStaticMarkup(
    <html>
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
        <title>Galaga</title>
      </head>
      <body>
        {/* eslint-disable-next-line @typescript-eslint/naming-convention */}
        <div id="root" dangerouslySetInnerHTML={{ __html: bundleHtml }} />
        <script src="/webClient.js"></script>
        <script
          dangerouslySetInnerHTML={{
            // переменная WebClient создается вебпаком см. web-client.config.ts
            // секция output ключ library. Эта переменная - это и есть само
            // приложение. Вызывая, WebClient.default() мы вызываем hydrateRoot
            // (см. дефолтный экспорт в файле src/ssr-client.tsx
            // eslint-disable-next-line @typescript-eslint/naming-convention
            __html: `WebClient.default(${htmlescape(data)});`,
          }}
        />
      </body>
    </html>
  );

  return `<!doctype html>${html}`;
}

interface IRenderBundleArguments {
  location: string;
}

export default ({ location }: IRenderBundleArguments) => {
  const pathBundle = path.join(DIST_DIR, 'ssrClient.js');

  const ssrContent = fs
    .readFileSync(pathBundle, {
      encoding: 'utf-8',
    })
    .toString();

  const { Bundle } = requireFromString(ssrContent, pathBundle);

  const bundleHtml = renderToString(
    <Provider store={store}>
      <StaticRouter location={location}>
        <Bundle />
      </StaticRouter>
    </Provider>
  );

  return { html: getPageHtml({ bundleHtml, location }) };
};
