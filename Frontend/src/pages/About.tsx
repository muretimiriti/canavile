import { Link } from 'react-router-dom';
import "./About.css"; // Import custom CSS for styling
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";

export const About = () => {
  return (
    <>
    <Navbar />
    <div className="about-container">
      {/* Main heading for the About Us page */}
      <h1 className="about-title">About Canaville Resort</h1>

      {/* Section for the introduction */}
      <p className="about-introduction">
        Welcome to Canaville Resort, a hidden gem nestled in the heart of Juja Farm. 
        Our resort offers a perfect blend of natural beauty, modern comfort, and authentic experiences.
      </p>

      {/* Section for the mission statement */}
      <div className="about-section">
        <h2 className="about-subtitle">Our Mission</h2>
        <p className="about-text">
          To provide our guests with an unforgettable experience that combines luxury, 
          nature, and authentic Kenyan hospitality. We strive to create a sanctuary 
          where memories are made and cherished forever.
        </p>
      </div>

      {/* Section for the vision statement */}
      <div className="about-section">
        <h2 className="about-subtitle">Our Vision</h2>
        <p className="about-text">
          To be the premier destination for those seeking a unique blend of adventure, 
          relaxation, and cultural immersion in Kenya. We aim to set new standards in 
          eco-friendly tourism while preserving the natural beauty of our surroundings.
        </p>
      </div>

      {/* Section for the values */}
      <div className="about-section">
        <h2 className="about-subtitle">Our Values</h2>
        <ul className="values-list">
          <li className="about-text">Sustainability: We are committed to preserving the environment and promoting eco-friendly practices.</li>
          <li className="about-text">Community: We believe in fostering a sense of community and creating a welcoming atmosphere for all our guests.</li>
          <li className="about-text">Adventure: We offer a variety of activities that encourage exploration and adventure.</li>
          <li className="about-text">Excellence: We strive to provide the highest quality services and experiences for our guests.</li>
        </ul>
      </div>

      {/* Call to action button */}
      <Link to="/contact" className="about-button-link">
        <button className="about-button">Contact Us</button>
      </Link>
    </div>
    <Footer/>
    </>
  );
};

export default About;