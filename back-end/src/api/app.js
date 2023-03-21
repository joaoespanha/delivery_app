const express = require('express');
const cors = require('cors');
const path = require('path'); 
const routes = require('../routes');

const app = express();

const imagePath = path.join(__dirname, '..', '..', '..', 'assets', 'public');

app.use(express.json());

app.use(cors({
  origin: 'https://delivery-frontend-production.up.railway.app',
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/images', express.static(imagePath));

app.use(routes);
module.exports = app;