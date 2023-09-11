import express from 'express';
import { __port__ } from './config/constants.js';
import products from './data/products.js';

const app = express();

app.listen(__port__, () => {
  console.log(`Running on ${__port__}`);
});

app.get('/', (req, res) => {
  res.send('Trex Backend API 1.0.0');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(product => product._id === req.params.id);
  res.json(product);
});
