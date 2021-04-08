const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const levelsSchema = new Schema({
  Comment: String,
  IsFastChargeable: Boolean,
  Title: String,
});

module.exports = mongoose.model('Levels', levelsSchema);
