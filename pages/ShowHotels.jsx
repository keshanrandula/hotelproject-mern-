import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHotel, FaMapMarkerAlt, FaMoneyBillWave, FaStar, FaBookOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import './ShowHotels.css';

function ShowHotels() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/api/hotels');
        setHotels(res.data);
      } catch (err) {
        console.error('Failed to fetch hotels:', err);
        setError('Failed to load hotels. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return (
      <div className="hotel-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading hotels...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="hotel-error">
        <div className="alert alert-danger">
          {error}
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="hotel-listing-container">
      <div className="container">
        <div className="hotel-listing-header">
          <h1 className="text-center mb-4">
            <FaHotel className="me-2" />
            Available Hotels
          </h1>
          <p className="text-center mb-5">Find your perfect stay at the best prices</p>
        </div>

        {hotels.length === 0 ? (
          <div className="no-hotels text-center py-5">
            <h4>No hotels available at the moment</h4>
            <p>Please check back later or contact support</p>
          </div>
        ) : (
          <div className="row g-4">
            {hotels.map((hotel) => (
              <div key={hotel._id} className="col-lg-4 col-md-6">
                <div className="hotel-card">
                  <div className="hotel-image-container">
                    <img
                      src={`http://localhost:5000${hotel.image}`}
                      alt={hotel.name}
                      className="hotel-image"
                    />
                    <div className="hotel-rating">
                      <FaStar className="star-icon" />
                      <span>4.5</span>
                    </div>
                  </div>
                  <div className="hotel-details">
                    <h3 className="hotel-name">{hotel.name}</h3>
                    <p className="hotel-description">{hotel.description}</p>
                    
                    <div className="hotel-info">
                      <div className="info-item">
                        <FaMapMarkerAlt className="info-icon" />
                        <span>{hotel.location}</span>
                      </div>
                      <div className="info-item">
                        <FaMoneyBillWave className="info-icon" />
                        <span>${hotel.price} <small>/ night</small></span>
                      </div>
                    </div>

                    <Link 
                      to={`/book?hotelId=${hotel._id}&hotelName=${encodeURIComponent(hotel.name)}`}
                      className="btn btn-primary book-btn"
                    >
                      <FaBookOpen className="me-2" />
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowHotels;