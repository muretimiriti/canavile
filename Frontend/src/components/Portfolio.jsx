import React from "react";
import { Link as RouterLink } from "react-router-dom";
import "./Portfolio.css"; // Import custom CSS for styling

const Portfolio = () => {
  return (
    <div className="portfolio-container">
      <div className="portfolio-content">
        <div className="portfolio-text">
          <h1 className="portfolio-title">Embrace the Outdoors</h1>
          <p className="portfolio-description">
            Elevate Your Camping and Team Building Adventures at Our Picturesque Forest Resort. Immerse Yourself in Nature's Tranquility and Rejuvenate Your Mind and Body. Explore our Serene Nature Walks, Outdoor Movie Screenings.
          </p>
          <RouterLink to="/booking">
            <button className="portfolio-button">Reserve Your Stay</button>
          </RouterLink>
        </div>
        <div className="portfolio-cards">
          <Card />
          <Card />
        </div>
      </div>
      <div className="portfolio-extra-card">
        <Card />
      </div>
    </div>
  );
};

const Card = () => {
  return (
    <div className="card">
      <h2 className="card-title">Card Title</h2>
      <p className="card-description">
        Card content goes here. This is a placeholder for the card description.
      </p>
    </div>
  );
};

export default Portfolio;