const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  roomType: { type: String, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  status: { type: String, default: 'Pending' }  // New field: Pending, Accepted, Rejected
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
