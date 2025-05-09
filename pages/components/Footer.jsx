import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaTripadvisor } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <div className="footer-logo">
              <img src="/logo.png" alt="Paradise Resort" width="50" height="50" />
              <h3>Paradise Resort</h3>
            </div>
            <p>
              Luxury redefined, comfort guaranteed. Experience world-class hospitality with breathtaking views and premium amenities.
            </p>
            <div className="footer-social">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTripadvisor /></a>
            </div>
          </div>
          
          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Rooms & Suites</a></li>
              <li><a href="#">Dining</a></li>
              <li><a href="#">Spa & Wellness</a></li>
              <li><a href="#">Gallery</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <MdLocationOn className="contact-icon" />
                <span>123 Ocean Drive, Miami, FL 33139</span>
              </div>
              <div className="contact-item">
                <MdPhone className="contact-icon" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <MdEmail className="contact-icon" />
                <span>info@paradiseresort.com</span>
              </div>
            </div>
          </div>
          
          <div className="footer-section newsletter">
            <h3>Newsletter</h3>
            <p>Subscribe to receive special offers and updates</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your Email Address" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Paradise Resort. All Rights Reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;