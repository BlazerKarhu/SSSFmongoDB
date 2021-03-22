'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');

app.use(express.urlencoded({extended: false}));

app.use('/cat', require('./routes'));

db.on('connected', () => {
  console.log('connected to port 3000');
  app.listen(3000);
});
