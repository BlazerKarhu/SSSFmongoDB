'use strict';
const currentTypeModel = require('../models/currentType');

const current_list_get = async (req, res) => {
  try {
    const currents = await currentTypeModel.find();
    res.json(currents);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const current_get = async (req, res) => {
  try {
    const current = await currentTypeModel.findById(req.params.Id);
    res.json(current);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = {
  current_list_get,
  current_get,
};
