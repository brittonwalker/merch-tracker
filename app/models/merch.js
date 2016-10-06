var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MerchSchema = new Schema({
  name: String,
  quantity: Number
})

module.exports = mongoose.model('Merch', MerchSchema);
