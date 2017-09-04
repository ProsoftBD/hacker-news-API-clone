/* eslint-disable no-console */

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const routes = require('./routers/router');

const db = config.DB[process.env.NODE_ENV] || process.env.DB;
const PORT = config.PORT[process.env.NODE_ENV] || process.env.PORT;

mongoose.connect(db, (err) => {
  if (!err) {
    console.log(`connected to the Database: ${db}`);
  } else {
    console.log(`error connecting to the Database ${err}`);
  }
});

const app = express();
app.get('/', (req, res) => {
  res
    .status(200)
    .send('<h1>Welcome to the Hacker News Clone API</h1> \n Go to /api for more...')
    .send();
});

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
