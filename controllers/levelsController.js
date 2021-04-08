'use strict';
const levelsModel = require('../models/levels');

const levels_list_get = async (req, res) => {
  try {
    const levels = await levelsModel.find();
    res.json(levels);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const levels_get = async (req, res) => {
  try {
    const level = await levelsModel.findById(req.params.Id);
    res.json(level);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

module.exports = {
  levels_list_get,
  levels_get,
};
