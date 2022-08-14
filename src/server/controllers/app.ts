import { Request, Response } from 'express';

function getPageHtml() {
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Galaga - Легендарная аркадная игра 80х" />
    <link rel="apple-touch-icon" href="logo192.png" />
    <link rel="manifest" href="/manifest.json" />
    <title>Galaga</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <h1>Hello from bundle!</h1>
  </body>
</html>

  `;
}

export function renderApp(_req: Request, res: Response) {
  res.status(200).send(getPageHtml());
}
