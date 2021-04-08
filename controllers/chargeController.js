'use strict';
// chargeController
const chargeModel = require('../models/chargeModel');

const {stationmodel, connectiontypemodel} = chargeModel;

const station_list_get = async (req, res) => {
  try {
    const topRight = req.query.topRight;
    const bottomLeft = req.query.bottomLeft;
    let start = 0;
    if (req.query.start) start = +req.query.start;

    let limit = 10;
    if (req.query.limit) start = +req.query.limit;

    let stations = [];

    if (topRight && bottomLeft) {
      const mapBounds = rectangleBounds(
        JSON.parse(topRight),
        JSON.parse(bottomLeft)
      );
      stations = await stationmodel.find({
        $geoWithin: {},
        $geometry: mapBounds,
      });
    } else {
      stations = await stationmodel
        .find()
        .skip(start)
        .limit(limit)
        .populate({
          path: 'Connections',
          populate: [
            {path: 'ConnectionTypeID'},
            {path: 'CurrentTypeID'},
            {path: 'LevelID'},
          ],
        });
    }
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

const charge_station_create_post = async (req, res) => {
  try {
    const connections = req.body.Connections;
    const newConnections = await Promise.all(
      connections.map(async (conn) => {
        let newConnection = new chargeModel.connectionmodel(conn);
        const result = await newConnection.save();
        return result._id;
      })
    );
    console.log('new connection', newConnections);

    const station = req.body.Station;
    station.Connections = newConnections;
    station.Location.type = 'Point';

    const newStation = new stationmodel(station);
    const result = await newStation.save();
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
  }
  console.log('text data', req.body);
  console.log('file data', req.file);
  res.send('From this endpoint you can add cats.');
};

module.exports = {
  station_list_get,
  charge_station_get,
  charge_station_create_post,
  connectiontype_get,
};
