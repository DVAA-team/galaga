// server.js
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./dist'));

app.get('/*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.get('/service-worker.js', (req, res) => {
  res.sendFile(`${__dirname}/dist/serviceWorker.js`);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
