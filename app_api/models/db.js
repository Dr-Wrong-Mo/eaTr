const mongoose = require('mongoose');
const readLine = require('readline');

let dbURL = process.env.DB_HOST;

console.log('dbURL is set to', dbURL);
console.log('NODE_ENV is set to ', process.env.NODE_ENV);

const connect = () => {
  setTimeout(
    () =>
      mongoose.connect(dbURL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }),
    1000
  );
};

mongoose.connection.on('connected', () => {
  let msg = 'Mongoose is';
  switch (mongoose.connection.readyState) {
    case 0:
      console.log(`${msg} disconnected`);
      break;
    case 1:
      console.log(`${msg} connected`);
      break;
    case 2:
      console.log(`${msg} connecting`);
      break;
    case 3:
      console.log(`${msg} disconnecting`);
      break;
    default:
      console.log(`${msg} `);
  }
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err);
  return connect();
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose is disconnected');
});

if (process.platform === 'win32') {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.on('SIGINT', () => {
    process.emit('SIGINT');
  });
}

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};

process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});

require('./recipes');
require('./shoppingList');

connect();
