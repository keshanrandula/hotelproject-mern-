const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: String,
  location: String,
  image: String, // stores image path like "/uploads/filename.jpg"
});

module.exports = mongoose.model('Hotel', hotelSchema);
