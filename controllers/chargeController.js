'use strict';
// chargeController
const chargeModel = require('../models/chargeModel');

const {stations} = chargeModel;

const charge_station_list_get = async (req, res) => {
  try {
    res.send(await stations.find());
  } catch (error) {
    console.log(error);
  }
};

const charge_station_get = (req, res) => {
  const id = req.params.id;
  const station = stations.filter((station) => station.id === id).pop();
  res.json(station);
};

const charge_station_create_post = (req, res) => {
  console.log('text data', req.body);
  console.log('file data', req.file);
  res.send('From this endpoint you can add cats.');
};

module.exports = {
  charge_station_list_get,
  charge_station_get,
  charge_station_create_post,
};
