const express = require('express');
const Reservation = require('../models/Reservation');

const router = express.Router();

// User: Make a reservation
router.post('/', async (req, res) => {
  const { roomId, userName, userEmail, checkIn, checkOut } = req.body;
  const reservation = new Reservation({ room: roomId, userName, userEmail, checkIn, checkOut });
  await reservation.save();
  res.json({ message: 'Reservation request sent' });
});

// Admin: View all reservations
router.get('/', async (req, res) => {
  const reservations = await Reservation.find().populate('room');
  res.json(reservations);
});

// Admin: Accept or reject
router.put('/:id', async (req, res) => {
  const { status } = req.body;
  const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(reservation);
});

module.exports = router;
