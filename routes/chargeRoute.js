'use strict';
// chargeRoute
const express = require('express');
const {
  station_list_get,
  charge_station_get,
  charge_station_create_post,
  connectiontype_get,
} = require('../controllers/chargeController');
const {station_list_get} = require('../controllers/stationController');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: './uploads/'});

router.get('/', station_list_get);
router.get('/con', connectiontype_get);

router.get('/:id', charge_station_get);

router.post('/', upload.single('station'), charge_station_create_post);

router.put('/', (req, res) => {
  res.send('From this endpoint you can modify stations.');
});

router.delete('/', (req, res) => {
  res.send('From this endpoint you can delete stations.');
});

module.exports = router;
