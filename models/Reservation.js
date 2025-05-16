const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  userName: String,
  userEmail: String,
  checkIn: Date,
  checkOut: Date,
  status: { type: String, default: 'Pending' } // Pending, Accepted, Rejected
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
