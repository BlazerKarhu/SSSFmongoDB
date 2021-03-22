const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const catSchema = new Schema({
  name: String,
  age: {
    type: Number,
    min: [0, 'not born yet?'],
    max: [40, "That's an old one"],
  },
  genre: {type: String, enum: ['male', 'female', 'other']},
});

module.exports = mongoose.model('Cat', catSchema);
