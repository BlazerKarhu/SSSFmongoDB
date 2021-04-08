'use strict';
const port = 3000;
require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');

app.use(express.urlencoded({extended: false}));
app.use(express.json);

app.use('/cat', require('./routes/routes'));
//app.use('/station', require('./routes/chargeRoute'));
app.use('/station', require('./routes/stationRoute'));

app.get('/', (req, res) => {
  console.log('get /');
  res.send('You can get cats from /cat');
  res.send('You can get chargestations from /charge');
});

db.on('connected', () => {
  console.log('connected to port ', port);
  app.listen(port);
});
