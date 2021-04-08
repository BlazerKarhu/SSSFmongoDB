const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stationSchema = new Schema({
  Connections: [{type: mongoose.Types.ObjectId, ref: 'Connection'}],
  Title: String,
  Town: String,
  AddressLine1: String,
  StateOrProvince: String,
  Postcode: Number,
  Location: {
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
});

module.exports = mongoose.model('Station', stationSchema);
