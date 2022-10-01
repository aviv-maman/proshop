const dotenv = require('dotenv').config();

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...'.bgGray);
  console.log(err.name.bgRed, err.message.red.underline.bold);
  process.exit(1);
});

const app = require('./app');

const connectDB = require('./configs/db');

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.rainbow.bold)
);

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...'.bgWhite);
  console.log(err.name.bgRed, err.message.red.underline.bold);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
