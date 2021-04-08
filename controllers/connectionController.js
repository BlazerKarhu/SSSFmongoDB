'use strict';
const connectionModel = require('../models/connection');

const connection_list_get = async (req, res) => {
  try {
    const connections = await connectionModel.find();
    res.json(connections);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const connection_get = async (req, res) => {
  try {
    const connection = await connectionModel.findById(req.params.Id);
    res.json(connection);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = {
  connection_list_get,
  connection_get,
};
