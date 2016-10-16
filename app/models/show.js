var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Merch = require('./merch');

var ShowSchema = new Schema({
  date: Date,
  venue: String,
  address: String,
  contact: String,
  pay: Number,
  city: String,
  coords: [],
  merch: []
})

module.exports = mongoose.model('Show', ShowSchema);
