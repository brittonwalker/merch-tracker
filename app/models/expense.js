var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ExpenseSchema = new Schema({
  description: String,
  amount: Number
})

module.exports = mongoose.model('Expense', ExpenseSchema);
