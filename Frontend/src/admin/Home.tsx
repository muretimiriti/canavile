import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { FiMenu, FiCalendar, FiBook, FiDollarSign } from "react-icons/fi";
import AdminSidebar from "./AdminSidebar";
import "./Home.css";

const Home = () => {
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  interface Booking {
    id: string;
    name: string;
    service: string;
    date: string;
  }

  const [recentActivities, setRecentActivities] = useState<Booking[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch dashboard stats
  useEffect(() => {
    const fetchData = async () => {
      const eventsSnapshot = await getDocs(collection(db, "events"));
      setTotalEvents(eventsSnapshot.size);

      const bookingsSnapshot = await getDocs(collection(db, "bookings"));
      setTotalBookings(bookingsSnapshot.size);

      const transactionsSnapshot = await getDocs(collection(db, "transactions"));
      setTotalTransactions(transactionsSnapshot.size);

      // Fetch latest bookings
      const recentBookings = bookingsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          service: data.service,
          date: data.date,
        };
      });

      setRecentActivities(recentBookings.slice(0, 5)); // Show only the latest 5 activities
    };

    fetchData();
  }, []);

  return (
    <div className={`home-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      {/* Sidebar Toggle Button */}
      <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <FiMenu />
      </button>

      {/* Sidebar */}
      {isSidebarOpen && <AdminSidebar onClose={() => setIsSidebarOpen(false)} />}

      <div className="home-content">
        <h1>Welcome, Admin</h1>
        <p>Manage events, bookings, and transactions efficiently.</p>

        {/* Dashboard Stats */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <FiCalendar className="stat-icon" />
            <h3>{totalEvents}</h3>
            <p>Events</p>
            <Link to="/events">View Events</Link>
          </div>
          <div className="stat-card">
            <FiBook className="stat-icon" />
            <h3>{totalBookings}</h3>
            <p>Bookings</p>
            <Link to="/bookings">View Bookings</Link>
          </div>
          <div className="stat-card">
            <FiDollarSign className="stat-icon" />
            <h3>{totalTransactions}</h3>
            <p>Transactions</p>
            <Link to="/transactions">View Transactions</Link>
          </div>
        </div>

        {/* Recent Activities */}
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