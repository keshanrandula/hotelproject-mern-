const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Hotel = require('../models/Hotel');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// POST /api/hotels
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, location } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : '';

    const hotel = new Hotel({ name, description, price, location, image: imagePath });
    await hotel.save();

    res.status(201).json(hotel);
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ message: 'Failed to upload hotel' });
  }
});

router.get('/', async (req, res) => {
  const hotels = await Hotel.find();
  res.json(hotels);
});

module.exports = router;
