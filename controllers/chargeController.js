'use strict';
// chargeController
const chargeModel = require('../models/chargeModel');

const {stationmodel, connectiontypemodel} = chargeModel;

const charge_station_list_get = async (req, res) => {
  try {
    console.log('Chargemodel ', chargeModel);
    console.log('station', stationmodel);
    const stations = await stationmodel.find();
    console.log('stations');
    res.send(stations);
  } catch (error) {
    console.error(error);
  }
};
const connectiontype_get = async (req, res) => {
  try {
    const connectiontype = await connectiontypemodel.find();
    res.send(connectiontype);
  } catch (error) {
    console.error(error);
  }
};
const charge_station_get = (req, res) => {
  const id = req.params.id;
  const station = stationmodel.filter((station) => station.id === id).pop();
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
  connectiontype_get,
};
