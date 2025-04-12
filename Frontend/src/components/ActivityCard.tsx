import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ActivityCard.css"; // Import custom CSS for styling
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react"

interface ArrowProps {
  onClick?: () => void;
  // style?: React.CSSProperties;
}

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button className="slick-prev" onClick={onClick}>
      <ArrowLeft size={24} />
    </button>
  );
};

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => {
  return (
    <button className="slick-next" onClick={onClick}>
      <ArrowRight size={24} />
    </button>
  );
};

const ActivityCard: React.FC<{ title: string; description: string; backgroundColor: string }> = ({ title, description, backgroundColor }) => {
  const textColor = backgroundColor === "#234001" ? "#fff" : "#333";
  return (
    <div className="activity-card" style={{ backgroundColor }}>
      <h2 className="activity-card-title">{title}</h2>
      <p className="activity-card-description" style={{ color: textColor}}>{description}</p>
    </div>
  );
};

const ActivityCarousel: React.FC<{ activities: { title: string; description: string }[] }> = ({ activities }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <Slider {...settings}>
      {activities.map((activity, index) => {
        const backgroundColor = index % 2 ===0 ? "#234001" : "#f5f5dc";
        return (
        <ActivityCard 
          key={index} 
          title={activity.title} 
          description={activity.description} 
          backgroundColor={backgroundColor}
          />
      )
      })}
    </Slider>
  );
};

const ActivitySection = () => {
  const activities = [
    { title: "Camping", description: "Experience the great outdoors with our camping services." },
    { title: "Outdoor Movies", description: "Enjoy movies under the stars with our outdoor movie setup." },
    { title: "Camping Gear", description: "Rent high-quality camping gear for your adventures." },
    { title: "Team Building", description: "Strengthen your team with our engaging team-building activities." },
    { title: "Grounds for Hire", description: "Rent our beautiful grounds for your events and gatherings." },
    { title: "Group Activities", description: "Participate in fun and interactive group activities." },
  ];

  return (
    <div className="activity-section">
      <div className="activity-section-header">
        <motion.h1
         whileInView={{ opacity: 1, scale: 0.8 }}
         initial={{ opacity: 0, scale: 1 }}
         transition={{
           duration: 1.2,
           delay: 1,
         }}
         viewport={{ once: true }}
        >
          Embrace the Outdoors
          </motion.h1>
      </div>
      <ActivityCarousel activities={activities} />
    </div>
  );
};

export default ActivitySection;