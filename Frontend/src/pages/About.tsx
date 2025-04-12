import { Link as RouterLink } from "react-router-dom";
import "./About.css"; // Import custom CSS for styling
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";

export const About = () => {
  return (
    <>
    <Navbar />
    <div className="about-container">
      {/* Main heading for the About Us page */}
      <h1 className="about-title">About Us</h1>

      {/* Section for the introduction */}
      <p className="about-introduction">
        We are dedicated to providing the best experience. Our forest resort offers a unique blend of nature and adventure, perfect for individuals, families, and teams.
      </p>

      {/* Section for the mission statement */}
      <div className="about-section">
        <h2 className="about-subtitle">Our Mission</h2>
        <p className="about-text">
          Our mission is to create unforgettable experiences by connecting people with nature. We strive to offer top-notch services and activities that promote relaxation, adventure, and team building.
        </p>
      </div>

      {/* Section for the vision statement */}
      <div className="about-section">
        <h2 className="about-subtitle">Our Vision</h2>
        <p className="about-text">
          Our vision is to be the leading forest resort, known for our exceptional services and commitment to sustainability. We aim to inspire a love for nature and foster a sense of community among our guests.
        </p>
      </div>

      {/* Section for the values */}
      <div className="about-section">
        <h2 className="about-subtitle">Our Values</h2>
        <p className="about-text">We value:</p>
        <p className="about-text">- Sustainability: We are committed to preserving the environment and promoting eco-friendly practices.</p>
        <p className="about-text">- Community: We believe in fostering a sense of community and creating a welcoming atmosphere for all our guests.</p>
        <p className="about-text">- Adventure: We offer a variety of activities that encourage exploration and adventure.</p>
        <p className="about-text">- Excellence: We strive to provide the highest quality services and experiences for our guests.</p>
      </div>

      {/* Call to action button */}
      <RouterLink to="/contact" className="about-button-link">
        <button className="about-button">Contact Us</button>
      </RouterLink>
    </div>
    <Footer/>
    </>
  );
};

export default About;