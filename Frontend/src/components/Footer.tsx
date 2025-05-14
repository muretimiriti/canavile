import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faInfoCircle, faCompass, faEnvelope, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTwitter, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import "./Footer.css";     

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><Link to="/"><FontAwesomeIcon icon={faHouse} className='icon'/>Home</Link></li>
          <li><Link to="/about"><FontAwesomeIcon icon={faInfoCircle} className='icon'/>About</Link></li>
          <li><Link to="/explore"><FontAwesomeIcon icon={faCompass} className='icon'/>Explore</Link></li>
          <li><Link to="/contact"><FontAwesomeIcon icon={faEnvelope} className='icon'/>Contact</Link></li>
          <li><Link to="/booking"><FontAwesomeIcon icon={faCalendarCheck} className='icon'/>Booking</Link></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Connect With Us</h3>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTiktok} />
          </a>
        </div>
      </div>
    </footer>
  );
};