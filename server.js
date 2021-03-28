'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');

app.use(express.urlencoded({extended: false}));

app.use('/cat', require('./routes/routes'));
app.use('/charge', require('./routes/chargeRoute'));

app.get('/', (req, res) => {
  console.log('get /');
  res.send('You can get cats from /cat');
  res.send('You can get chargestations from /charge');
});

db.on('connected', () => {
  console.log('connected to port 3000');
  app.listen(3000);
});
