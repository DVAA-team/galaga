import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { store } from '@/store';
import { Provider } from 'react-redux';
// FIXME: (denis) статика вообще не работает. Здесь идет попытка
//  использовать библиотеку styled-components, но она не заиграла
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import SsrApp from '@/components/SsrApp/SsrApp';

interface IPageHtmlParams {
  bundleHtml: string;
  styled?: string;
}

function getPageHtml(params: IPageHtmlParams) {
  const { bundleHtml } = params;

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
        <script src="/ssr-client.js"></script>
      </body>
    </html>
  );

  return `<!doctype html>${html}`;
}

interface IRenderBundleArguments {
  location: string;
}

export default ({ location }: IRenderBundleArguments) => {
  const sheet = new ServerStyleSheet();

  const bundleHtml = renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <Provider store={store}>
        <SsrApp location={location} />
      </Provider>
    </StyleSheetManager>
  );

  const styledTags = sheet.getStyleTags();

  return {
    html: getPageHtml({ bundleHtml, styled: styledTags }),
  };
};
