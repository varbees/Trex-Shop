import express from 'express';
import { __port__ } from './config/constants.js';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('Trex Backend API 1.0.0');
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(__port__, () => {
  console.log(`Running on ${__port__}`);
});
