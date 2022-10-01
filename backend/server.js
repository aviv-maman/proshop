import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import products from './data/products.js';

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));
