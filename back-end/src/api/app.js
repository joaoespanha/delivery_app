const express = require('express');
const cors = require('cors');
const routes = require('../routes');
const path = require('path'); 

const app = express();

const imagePath = path.join(__dirname, '..', '..', '..', 'assets', 'public');


app.use(express.json());

app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/images', express.static(imagePath));

app.use(routes);
module.exports = app;