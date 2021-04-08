const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const connectionSchema = new Schema({
  ConnectionTypeID: {type: mongoose.Types.ObjectId, ref: 'ConnectionType'},
  CurrentTypeID: {type: mongoose.Types.ObjectId, ref: 'CurrentType'},
  LevelID: {type: mongoose.Types.ObjectId, ref: 'Levels'},
  Quantity: Number,
});

module.exports = mongoose.model('Connection', connectionSchema);
