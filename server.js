const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');
const hotelRoutes = require('./routes/hotelRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const roomRoutes = require('./routes/roomRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/rooms', roomRoutes);



// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mern_auth')
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
