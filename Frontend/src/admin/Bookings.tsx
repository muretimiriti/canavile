// filepath: /c:/Users/ADMIN/Desktop/canaville/Frontend/src/admin/Bookings.tsx

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { FiMenu, FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";
import AdminSidebar from "./AdminSidebar";
import "./Bookings.css";

const Bookings = () => {
  interface Booking {
    id: string;
    name: string;
    email: string;
    activities?: string[];
    food?: string[];
    drinks?: string[];
    accommodation?: string[];
    totalCost: number;
    status: string;
    timestamp: {
      seconds: number;
      nanoseconds: number;
    };
  }

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch bookings from Firestore
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Bookings"));
        const bookingsList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            email: data.email,
            activities: data.activities || [],
            food: data.food || [],
            drinks: data.drinks || [],
            accommodation: data.accommodation || [],
            totalCost: data.totalCost,
            status: data.status,
            timestamp: data.timestamp,
          };
        });
        setBookings(bookingsList);
      } catch (error) {
        console.error("Error fetching bookings: ", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className={`bookings-container ${isSidebarOpen ? "sidebar-open" : ""}`}>
      {/* Sidebar Toggle Button */}
      <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <FiMenu />
      </button>

      {/* Sidebar */}
      {isSidebarOpen && <AdminSidebar onClose={() => setIsSidebarOpen(false)} />}

      <div className="bookings-content">
        <h1>Bookings</h1>
        <p>View and manage all customer bookings.</p>

        {/* Bookings Table */}
        <div className="bookings-table">
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Activities</th>
                <th>Food</th>
                <th>Drinks</th>
                <th>Accommodation</th>
                <th>Total Cost</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.name}</td>
                    <td>{booking.email}</td>
                    <td>{booking.activities?.join(", ") || "N/A"}</td>
                    <td>{booking.food?.join(", ") || "N/A"}</td>
                    <td>{booking.drinks?.join(", ") || "N/A"}</td>
                    <td>{booking.accommodation?.join(", ") || "N/A"}</td>
                    <td>KES {booking.totalCost}</td>
                    <td className={`status ${booking.status}`}>
                      {booking.status === "Confirmed" && <FiCheckCircle className="status-icon success" />}
                      {booking.status === "Pending" && <FiClock className="status-icon pending" />}
                      {booking.status === "Cancelled" && <FiXCircle className="status-icon failed" />}
                      {booking.status}
                    </td>
                    <td>{new Date(booking.timestamp?.seconds * 1000).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="no-data">No bookings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookings;