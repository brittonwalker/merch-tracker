var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Merch = require('./merch');

var ShowSchema = new Schema({
  date: Date,
  venue: String,
  contact: String,
  pay: Number
  // merch: [Merch]
})

module.exports = mongoose.model('Show', ShowSchema);
