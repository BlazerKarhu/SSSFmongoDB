'use strict';
const port = 3000;

require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./db');

const stationRoute = require('./routes/stationRoute');
const connectionRoute = require('./routes/connectionRoute');
const connectionTypeRoute = require('./routes/connectionTypeRoute');
const currentTypeRoute = require('./routes/currentTypeRoute');
const levelsRoute = require('./routes/levelsRoute');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//app.use('/cat', require('./routes/routes'));
//app.use('/station', require('./routes/chargeRoute'));
app.use('/station', stationRoute);
app.use('/connection', connectionRoute);
app.use('/connectiontype', connectionTypeRoute);
app.use('/currenttype', currentTypeRoute);
app.use('/level', levelsRoute);

app.get('/', (req, res) => {
  console.log('get /');
  res.send(
    'You can get cats from /cat <br> You can get chargestations from /charge'
  );
});

db.on('connected', () => {
  app.listen(port);
  console.log(`App listening on port ${port}!`);
});
