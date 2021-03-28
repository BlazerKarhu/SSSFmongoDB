const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stationSchema = new Schema({
  _id: Schema.Types.ObjectId,
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
  connections: [{type: Schema.Types.ObjectId, ref: 'connectionSchema'}],
  title: String,
  town: String,
  addressLinel: String,
  stateOrProvince: String,
  postcode: Number,
});

const connectionSchema = new Schema({
  _id: {type: Schema.Types.ObjectId, ref: 'stationSchema'},
  connectionTypeID: {type: Schema.Types.ObjectId, ref: 'connectionTypeSchema'},
  levelID: {type: Schema.Types.ObjectId, ref: 'levelsSchema'},
  currentTypeSchemaID: {type: Schema.Types.ObjectId, ref: 'currentTypeSchema'},
  quantity: Number,
});

const connectionTypeSchema = new Schema({
  _id: {type: Schema.Types.ObjectId, ref: 'stationSchema'},
  formalName: String,
  title: String,
});

const currentTypeSchema = new Schema({
  _id: Schema.Types.ObjectId,
  description: String,
  title: String,
});

const levelsSchema = new Schema({
  _id: Schema.Types.ObjectId,
  comment: String,
  isFastChargeable: Boolean,
  title: String,
});
module.exports = mongoose.model('Station', stationSchema);
module.exports = mongoose.model('Connection', connectionSchema);
module.exports = mongoose.model('ConnectionType', connectionTypeSchema);
module.exports = mongoose.model('CurrentType', currentTypeSchema);
module.exports = mongoose.model('Levels', levelsSchema);
