const express = require('express');
const cors = require('cors');
const colors = require('colors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/products', productRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
