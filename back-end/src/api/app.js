const express = require('express');
const routes = require('../routes');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(routes);

module.exports = app;