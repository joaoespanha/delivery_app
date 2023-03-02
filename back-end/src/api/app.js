const express = require('express');
const cors = require('cors');
const routes = require('../routes');

const app = express();

app.use(express.json());

app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(routes);

module.exports = app;