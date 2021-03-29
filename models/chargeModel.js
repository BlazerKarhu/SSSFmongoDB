const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stationSchema = new Schema({
  location: {
    type: {
      type: String,
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  connections: [{type: Schema.Types.ObjectId, ref: 'Connection'}],
  title: String,
  town: String,
  addressLinel: String,
  stateOrProvince: String,
  postcode: Number,
});

const connectionSchema = new Schema({
  connectionTypeID: {type: Schema.Types.ObjectId, ref: 'Connection'},
  levelID: {type: Schema.Types.ObjectId, ref: 'Levels'},
  currentTypeSchemaID: {type: Schema.Types.ObjectId, ref: 'CurrentType'},
  quantity: Number,
});

const connectionTypeSchema = new Schema({
  formalName: String,
  title: String,
});

const currentTypeSchema = new Schema({
  description: String,
  title: String,
});

const levelsSchema = new Schema({
  comment: String,
  isFastChargeable: Boolean,
  title: String,
});
const stationmodel = mongoose.model('Station', stationSchema);
const connectionmodel = mongoose.model('Connection', connectionSchema);
const connectiontypemodel = mongoose.model(
  'ConnectionType',
  connectionTypeSchema
);
const currenttypemodel = mongoose.model('CurrentType', currentTypeSchema);
const levelsmodel = mongoose.model('Levels', levelsSchema);
module.exports = {
  stationmodel,
  connectionmodel,
  connectiontypemodel,
  currenttypemodel,
  levelsmodel,
};
