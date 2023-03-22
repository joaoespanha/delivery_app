const cors = require('cors');
const express = require('express');
const path = require('path');
const routes = require('../routes');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const imagePath = path.join(__dirname, '..', '..', '..', 'assets', 'public');

app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/images', express.static(imagePath));

app.use(routes);

module.exports = app;