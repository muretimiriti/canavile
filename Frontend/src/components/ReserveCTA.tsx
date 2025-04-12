
import { Link as RouterLink } from "react-router-dom";
import "./ReserveCTA.css"; // Import custom CSS for styling

const ReserveCTA = () => {
  return (
    <div className="reserve-cta">
      <div className="reserve-cta-content">
        <h2 className="reserve-cta-title">Ready to Book Your Stay?</h2>
        <p className="reserve-cta-description">
          Experience the best of nature and adventure at our forest resort. Click the button below to reserve your stay now!
        </p>
        <RouterLink to="/booking">
          <button className="reserve-cta-button">Reserve Now</button>
        </RouterLink>
      </div>
    </div>
  );
};

export default ReserveCTA;