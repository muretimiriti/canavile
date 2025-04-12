import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faInfoCircle, faCompass, faEnvelope, faCalendarCheck, faTree, faDollarSign, faQuestion, faStar, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTwitter, faTiktok } from '@fortawesome/free-brands-svg-icons';
import "./Footer.css";     


export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="/"><FontAwesomeIcon icon={faHouse} className='icon'/>Home</a></li>
          <li><a href="/About"><FontAwesomeIcon icon={faInfoCircle} className='icon'/>About</a></li>
          <li><a href="/Explore"><FontAwesomeIcon icon={faCompass} className='icon'/>Explore</a></li>
          <li><a href="/Contact"><FontAwesomeIcon icon={faEnvelope} className='icon'/>Contact</a></li>
          <li><a href="/Booking"><FontAwesomeIcon icon={faCalendarCheck} className='icon'/>Booking</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Useful Links</h3>
        <ul>
          <li><a href="/ammenities"><FontAwesomeIcon icon={faTree} className='icon'/>Ammenities</a></li>
          <li><a href="/rates"><FontAwesomeIcon icon={faDollarSign} className='icon'/>Rates</a></li>
          <li><a href="/faq"><FontAwesomeIcon icon={faQuestion} className='icon'/>FAQ</a></li>
          <li><a href="/reviews"><FontAwesomeIcon icon={faStar} className='icon'/>Reviews</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h3>Connect with Us</h3>
        <ul>
          <li><a href="https://www.facebook.com">  <FontAwesomeIcon icon={faFacebookF} className='icon'/>Facebook</a></li>
          <li><a href="https://www.instagram.com"><FontAwesomeIcon icon={faInstagram} className='icon'/>Instagram</a></li>
          <li><a href="https://www.twitter.com"><FontAwesomeIcon icon={faTwitter} className='icon'/>Twitter</a></li>
          <li><a href="https://www.tiktok.com"><FontAwesomeIcon icon={faTiktok} className='icon'/>Tiktok</a></li>
        </ul>
      </div>
      <div  className="footer-section">
        <h3>Admin</h3>
        <ul>
          <li><a href="/admin/login"> <FontAwesomeIcon icon={faUserShield} className='icon'/>Admin Login</a></li>
        </ul>
      </div>
    </footer>
  );
};