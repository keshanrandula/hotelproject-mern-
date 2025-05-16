const express = require('express');
const multer = require('multer');
const path = require('path');
const Room = require('../models/Room');

const router = express.Router();

// Image upload
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, 'uploads/'),
  filename: (_, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Add Room
router.post('/', upload.single('image'), async (req, res) => {
  const { name, location, price, description } = req.body;
  const room = new Room({
    name,
    location,
    price,
    description,
    image: req.file?.filename || ''
  });
  await room.save();
  res.json({ message: 'Room added successfully' });
});

// Get All Rooms
router.get('/', async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
});

module.exports = router;
