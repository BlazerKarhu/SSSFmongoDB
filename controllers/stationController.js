'use strict';
const stationModel = require('../models/station');
const connectionModel = require('../models/connection');
const rectangleBounds = require('../utils/rectangleBounds');

const station_list_get = async (req, res) => {
  try {
    const topRight = req.query.topRight;
    const bottomLeft = req.query.bottomLeft;
    let start = 0;
    if (req.query.start) start = +req.query.start;

    let limit = 10;
    if (req.query.limit) start = +req.query.limit;
    //test with limit
    //http://localhost:3000/station?start=10&limit=4

    let stations = [];

    if (topRight && bottomLeft) {
      const mapBounds = rectangleBounds(
        JSON.parse(topRight),
        JSON.parse(bottomLeft)
      );
      stations = await stationModel
        .find({
          Location: {
            $geoWithin: {
              $geometry: mapBounds,
            },
          },
        })
        .populate({
          path: 'Connections',
          populate: [
            {path: 'ConnectionTypeID'},
            {path: 'CurrentTypeID'},
            {path: 'LevelID'},
          ],
        });
    } else {
      stations = await stationModel
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
    res.json(stations);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const station_get = async (req, res) => {
  try {
    const stations = await stationModel.findById(req.params.id).populate({
      path: 'Connections',
      populate: [
        {path: 'ConnectionTypeID'},
        {path: 'CurrentTypeID'},
        {path: 'LevelID'},
      ],
    });
    res.json(stations);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const station_post = async (req, res) => {
  try {
    console.log('station_post', req.body);
    const connections = req.body.Connections;
    const newConnections = await Promise.all(
      connections.map(async (conn) => {
        let newConnection = new connectionModel(conn);
        const result = await newConnection.save();
        return result._id;
      })
    );
    console.log('nc', newConnections);

    const station = req.body.Station;
    station.Connections = newConnections;
    station.Location.type = 'Point';

    console.log('st', station);
    const newStation = new stationModel(station);
    console.log('ns', newStation);
    const rslt = await newStation.save();
    console.log(rslt);
    res.satus(200).json(rslt);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = {
  station_list_get,
  station_get,
  station_post,
};
