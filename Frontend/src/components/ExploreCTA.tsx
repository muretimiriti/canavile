
import { Link as RouterLink } from "react-router-dom";
import "./ExploreCTA.css"; // Import custom CSS for styling

const ExploreCTA = () => {
  return (
    <div className="explore-cta">
      <div className="explore-cta-content">
        <h2 className="explore-cta-title">"We are all in the same place"</h2>
        <p className="explore-cta-description">
          Discover the unifying power of nature at our forest resort, where camping, team building, and serene nature walks come together to create an unforgettable experience for individuals and families.
        </p>
        <RouterLink to="/explore">
          <button className="explore-cta-button">Explore Now</button>
        </RouterLink>
      </div>
    </div>
  );
};

export default ExploreCTA;