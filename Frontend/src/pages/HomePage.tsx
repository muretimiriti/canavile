import React from "react";
import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
import ExploreCTA from "../components/ExploreCTA";
import ActivityCard from "../components/ActivityCard";
import UpcomingEvents from "../components/UpcomingEvents";
import "./Homepage.css"; // Import custom CSS for styling
import { motion } from "motion/react"
import { Footer } from "../components/Footer";

const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="homepage-container">
        <main className="main-section">
          {/* Hero Section */}
          <div className="hero-section">
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.8 }}
            >
              Welcome to Canaville  Resort
            </motion.h1>
            <motion.p
              className="hero-text"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1.2 }}
            >
              Discover the perfect blend of nature and adventure.
            </motion.p>
            <motion.p
              className="hero-text"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1.6 }}
            >
              Enjoy camping, team building, and serene nature walks at our picturesque resort.
            </motion.p>
            <motion.button
              className="hero-button"
              onClick={() => window.location.href = "/pages/Booking"}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 2 }}
            >
              Book Your Stay
            </motion.button>
          </div>

          {/* Featured Services Section */}
          <div className="featured-services">
            <motion.h2
              className="section-title"
              whileInView={{ opacity: 1, scale: 0.8 }}
              initial={{ opacity: 0, scale: 1 }}
              transition={{
                duration: 1,
                delay: 0.8,
              }}
              viewport={{ once: true }}
            >
              Featured Services
            </motion.h2>
            <ActivityCard />
          </div>

          {/* Upcoming Events Section */}
          <UpcomingEvents />

          {/* Call to Action Section */}
          <ExploreCTA />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;