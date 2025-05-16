const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: String,
  location: String,
  price: Number,
  description: String,
  image: String
});

module.exports = mongoose.model('Room', roomSchema);
