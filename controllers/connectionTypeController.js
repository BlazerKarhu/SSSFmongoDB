'use strict';
const connectionTypeModel = require('../models/connectionType');

const connectiontype_list_get = async (req, res) => {
  try {
    const connectionTypes = await connectionTypeModel.find();
    res.json(connectionTypes);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const connectiontype_get = async (req, res) => {
  try {
    const connectionType = await connectionTypeModel.findById(req.params.Id);
    res.json(connectionType);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = {
  connectiontype_list_get,
  connectiontype_get,
};
