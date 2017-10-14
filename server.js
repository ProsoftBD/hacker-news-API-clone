/* eslint-disable no-console */

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
require('dotenv').config({
  path: `./.${process.env.NODE_ENV}.env`
});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routers/router');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI, { useMongoClient: true })
  .then(() => console.log(`connected to the ${process.env.NODE_ENV} database`))
  .catch(err => console.log(`error connecting to the Database ${err}`));

// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res
    .status(200)
    .send('<h1>Welcome to the Hacker News Clone API</h1> \n Go to /api for more...')
    .send();
});

app.use('/api', routes);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});

module.exports = app;
