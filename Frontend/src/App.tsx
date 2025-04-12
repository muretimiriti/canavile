import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Explore from "./pages/Explore";
import {Contact} from "./pages/Contact";
import Booking from "./pages/Booking";
import AdminLogin from "./admin/AdminLogin";
import AdminHome from "./admin/Home"; // Import the Admin Home component
import Events from "./admin/Events"; // Import the Events component
import Transactions from "./admin/Transaction"; // Import the Transactions component
import Bookings from "./admin/Bookings"; // Import the Bookings component
import Gallery from "./pages/Gallery";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<AdminHome />} /> {/* Add the route for Admin Home */}
        <Route path="/admin/events" element={<Events />} /> {/* Add the route for Events */}
        <Route path="/admin/transactions" element={<Transactions />} /> {/* Add the route for Transactions */}
        <Route path="/admin/bookings" element={<Bookings />} /> {/* Add the route for Bookings */}
      </Routes>
    </Router>
  );
}

export default App;