const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  productId: String,
  title: String,
  description: String,
  price: Number, // Assuming price is stored as a Number
  dateOfSale: { type: Date, default: Date.now }, // Date field with default value of current date/time
  sold: Boolean,
  category: String
});

module.exports = mongoose.model('Transaction', transactionSchema);
