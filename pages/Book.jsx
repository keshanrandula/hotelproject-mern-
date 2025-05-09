import { useState } from 'react';
import axios from 'axios';

import './Book.css';
import hotelImage from '../assets/r1.jpg'; // Make sure to import your image

function Book() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    roomType: '',
    checkIn: '',
    checkOut: ''
  });

  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post('http://localhost:5000/api/bookings', formData);
      if (res.status === 200) {
        setMessage({ text: 'Booking successful!', type: 'success' });
        setFormData({ name: '', email: '', roomType: '', checkIn: '', checkOut: '' });
      }
    } catch (error) {
      console.error(error);
      setMessage({ text: 'Error booking room. Please try again.', type: 'danger' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid book-form-container">
      <div className="row g-0">
        {/* Image Section (Left Side) */}
        <div className="col-lg-6 d-none d-lg-block">
          <div className="booking-image">
            <img 
              src={hotelImage} 
              alt="Luxury Hotel Room" 
              className="img-fluid h-100 w-100"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>

        {/* Form Section (Right Side) */}
        <div className="col-lg-6">
          <div className="card shadow-lg h-100">
            <div className="card-header bg-primary text-white">
              <h2 className="text-center mb-0">Book a Room</h2>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    name="name" 
                    placeholder="Enter your name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    name="email" 
                    placeholder="Enter your email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="roomType" className="form-label">Room Type</label>
                  <select 
                    className="form-select" 
                    id="roomType" 
                    name="roomType" 
                    value={formData.roomType} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="">Select Room Type</option>
                    <option value="Standard">Standard Room ($99/night)</option>
                    <option value="Deluxe">Deluxe Room ($149/night)</option>
                    <option value="Suite">Suite ($249/night)</option>
                  </select>
                </div>
                
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="checkIn" className="form-label">Check-In Date</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      id="checkIn" 
                      name="checkIn" 
                      value={formData.checkIn} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="checkOut" className="form-label">Check-Out Date</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      id="checkOut" 
                      name="checkOut" 
                      value={formData.checkOut} 
                      onChange={handleChange} 
                      required 
                    />
                  </div>
                </div>
                
                <div className="d-grid">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : 'Book Now'}
                  </button>
                </div>
              </form>
              
              {message && (
                <div className={`alert alert-${message.type} mt-3`}>
                  {message.text}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;