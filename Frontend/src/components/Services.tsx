import React from "react";
import "./Services.css"; // Import custom CSS for styling

export const Services = () => {
  const services = [
    { title: "Camping", description: "Experience the great outdoors with our camping services." },
    { title: "Outdoor Movies", description: "Enjoy movies under the stars with our outdoor movie setup." },
    { title: "Camping Gear", description: "Rent high-quality camping gear for your adventures." },
    { title: "Team Building", description: "Strengthen your team with our engaging team-building activities." },
    { title: "Grounds for Hire", description: "Rent our beautiful grounds for your events and gatherings." },
    { title: "Team Activities", description: "Participate in fun and interactive team activities." },
  ];

  return (
    <div className="services-container">
      <h2 className="services-title">Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <ServiceCard key={index} title={service.title} description={service.description} />
        ))}
      </div>
    </div>
  );
};

interface ServiceCardProps {
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description }) => {
  return (
    <div className="service-card">
      <h3 className="service-card-title">{title}</h3>
      <p className="service-card-description">{description}</p>
    </div>
  );
};