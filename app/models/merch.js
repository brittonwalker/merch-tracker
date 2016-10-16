var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MerchSchema = new Schema({
  name: String,
  quantity: Number,
  type: String,
  sizes: []
})

module.exports = mongoose.model('Merch', MerchSchema);
