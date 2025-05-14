/**
 * Admin Dashboard Home Component
 * 
 * This component serves as the main dashboard for the admin interface.
 * Features include:
 * - Overview of key metrics (events, bookings, transactions)
 * - Recent bookings display
 * - Quick navigation to different admin sections
 * - Responsive sidebar navigation
 */

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { FiMenu, FiCalendar, FiBook, FiDollarSign } from "react-icons/fi";
import AdminSidebar from "./AdminSidebar";
import "./Home.css";

const Home = () => {
  // State for dashboard statistics
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);

  /**
   * Interface for booking data structure
   */
  interface Booking {
    id: string;
    name: string;
    service: string;
    date: string;
  }

  // State for recent activities and sidebar
  const [recentActivities, setRecentActivities] = useState<Booking[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  /**
   * Fetches dashboard statistics and recent bookings from Firestore
   * Updates state with the fetched data
   */
  useEffect(() => {
    const fetchData = async () => {
      // Fetch total events count
      const eventsSnapshot = await getDocs(collection(db, "events"));
      setTotalEvents(eventsSnapshot.size);

      // Fetch total bookings count
      const bookingsSnapshot = await getDocs(collection(db, "bookings"));
      setTotalBookings(bookingsSnapshot.size);

      // Fetch total transactions count
      const transactionsSnapshot = await getDocs(collection(db, "transactions"));
      setTotalTransactions(transactionsSnapshot.size);

      // Fetch and process recent bookings
      const recentBookings = bookingsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          service: data.service,
          date: data.date,
        };
      });

      // Display only the latest 5 bookings
      setRecentActivities(recentBookings.slice(0, 5));
    };

    fetchData();
  }, []);

  return (
    <div className={`home-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      {/* Sidebar Toggle Button */}
      <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <FiMenu />
      </button>

      {/* Admin Sidebar */}
      {isSidebarOpen && <AdminSidebar onClose={() => setIsSidebarOpen(false)} />}

      {/* Main Dashboard Content */}
      <div className="home-content">
        <h1>Welcome, Admin</h1>
        <p>Manage events, bookings, and transactions efficiently.</p>

        {/* Dashboard Statistics Cards */}
        <div className="dashboard-stats">
          {/* Events Statistics Card */}
          <div className="stat-card">
            <FiCalendar className="stat-icon" />
            <h3>{totalEvents}</h3>
            <p>Events</p>
            <Link to="/events">View Events</Link>
          </div>

          {/* Bookings Statistics Card */}
          <div className="stat-card">
            <FiBook className="stat-icon" />
            <h3>{totalBookings}</h3>
            <p>Bookings</p>
            <Link to="/bookings">View Bookings</Link>
          </div>

          {/* Transactions Statistics Card */}
          <div className="stat-card">
            <FiDollarSign className="stat-icon" />
            <h3>{totalTransactions}</h3>
            <p>Transactions</p>
            <Link to="/transactions">View Transactions</Link>
          </div>
        </div>

        {/* Recent Bookings Section */}
        <h2>Recent Bookings</h2>
        <div className="recent-activities">
          {recentActivities.length > 0 ? (
            recentActivities.map((activity) => (
              <div key={activity.id} className="activity-card">
                <p><strong>{activity.name}</strong> booked <strong>{activity.service}</strong> for {activity.date}</p>
              </div>
            ))
          ) : (
            <p>No recent bookings.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;