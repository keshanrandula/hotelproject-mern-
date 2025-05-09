import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 
import Nav from './components/Nav';
import Footer from './components/Footer';// We'll create this CSS file

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
  }, [navigate]);

  return (
    <div className="hotel-home">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-overlay">
          <div className="container">
            <h1 className="hero-title">Welcome to Paradise Resort</h1>
            <p className="hero-subtitle">Luxury Redefined, Comfort Guaranteed</p>
            <button className="btn btn-primary btn-lg booking-btn">Book Now</button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">Our Amenities</h2>
          <div className="row">
            <div className="col-md-4 feature-card">
              <div className="card">
                <div className="card-body text-center">
                  <i className="fas fa-swimming-pool feature-icon"></i>
                  <h3 className="card-title">Infinity Pool</h3>
                  <p className="card-text">Enjoy our stunning infinity pool with ocean views.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 feature-card">
              <div className="card">
                <div className="card-body text-center">
                  <i className="fas fa-utensils feature-icon"></i>
                  <h3 className="card-title">Gourmet Dining</h3>
                  <p className="card-text">World-class cuisine prepared by award-winning chefs.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 feature-card">
              <div className="card">
                <div className="card-body text-center">
                  <i className="fas fa-spa feature-icon"></i>
                  <h3 className="card-title">Luxury Spa</h3>
                  <p className="card-text">Rejuvenate with our premium spa treatments.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Room Showcase */}
      <section className="room-showcase py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Our Rooms</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card room-card">
                <img src="https://images.unsplash.com/photo-1566669437685-5f2e2b210337" className="card-img-top" alt="Deluxe Room" />
                <div className="card-body">
                  <h3 className="card-title">Deluxe Room</h3>
                  <p className="card-text">Spacious rooms with stunning views and premium amenities.</p>
                  <button className="btn btn-outline-primary">View Details</button>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card room-card">
                <img src="https://images.unsplash.com/photo-1592229505726-ca121043b6ba" className="card-img-top" alt="Executive Suite" />
                <div className="card-body">
                  <h3 className="card-title">Executive Suite</h3>
                  <p className="card-text">Luxurious suites with separate living areas and premium services.</p>
                  <button className="btn btn-outline-primary">View Details</button>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card room-card">
                <img src="https://images.unsplash.com/photo-1582719471381-9712a3a3f131" className="card-img-top" alt="Presidential Suite" />
                <div className="card-body">
                  <h3 className="card-title">Presidential Suite</h3>
                  <p className="card-text">Ultimate luxury with panoramic views and personalized services.</p>
                  <button className="btn btn-outline-primary">View Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials py-5">
        <div className="container">
          <h2 className="text-center mb-5">What Our Guests Say</h2>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card testimonial-card">
                <div className="card-body">
                  <div className="d-flex mb-3">
                    <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Guest" className="rounded-circle testimonial-img" />
                    <div className="ms-3">
                      <h5 className="mb-0">Sarah Johnson</h5>
                      <small className="text-muted">New York, USA</small>
                    </div>
                  </div>
                  <p className="card-text">"The best hotel experience I've ever had! The service was impeccable and the rooms were stunning."</p>
                  <div className="text-warning">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <div className="card testimonial-card">
                <div className="card-body">
                  <div className="d-flex mb-3">
                    <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Guest" className="rounded-circle testimonial-img" />
                    <div className="ms-3">
                      <h5 className="mb-0">Michael Chen</h5>
                      <small className="text-muted">Tokyo, Japan</small>
                    </div>
                  </div>
                  <p className="card-text">"Absolutely breathtaking views and the staff went above and beyond to make our stay memorable."</p>
                  <div className="text-warning">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section py-5 bg-primary text-white">
        <div className="container text-center">
          <h2 className="mb-4">Ready for an Unforgettable Experience?</h2>
          <p className="lead mb-4">Book your stay now and enjoy exclusive benefits</p>
          <button className="btn btn-light btn-lg">Reserve Your Room</button>
        </div>
      </section>
    </div>
  );
}

export default Home;