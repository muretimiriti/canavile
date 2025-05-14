/**
 * Admin Bookings Component
 * 
 * This component provides the admin interface for managing bookings at Canaville Resort.
 * Features include:
 * - View all bookings
 * - Filter bookings by status
 * - Update booking status
 * - View booking details
 * - Responsive sidebar navigation
 */

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { FiMenu, FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";
import AdminSidebar from "./AdminSidebar";
import "./Bookings.css";

const Bookings = () => {
  // Interface for booking data structure
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

  // State management
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  /**
   * Fetches all bookings from Firestore
   * Updates the bookings state with the fetched data
   */
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

  /**
   * Formats the timestamp to a readable date string
   * @param {Object} timestamp - Firestore timestamp object
   * @returns {string} Formatted date string
   */
  const formatDate = (timestamp: { seconds: number; nanoseconds: number }) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
  };

  /**
   * Renders the status badge with appropriate styling
   * @param {string} status - Booking status
   * @returns {JSX.Element} Status badge component
   */
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "Confirmed":
        return (
          <span className="status-badge confirmed">
            <FiCheckCircle /> Confirmed
          </span>
        );
      case "Pending":
        return (
          <span className="status-badge pending">
            <FiClock /> Pending
          </span>
        );
      case "Cancelled":
        return (
          <span className="status-badge cancelled">
            <FiXCircle /> Cancelled
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-bookings">
      {/* Mobile menu button */}
      <button
        className="mobile-menu-button"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <FiMenu />
      </button>

      {/* Admin sidebar */}
      {isSidebarOpen && <AdminSidebar onClose={() => setIsSidebarOpen(false)} />}

      {/* Main content */}
      <div className="bookings-content">
        <h1>Bookings</h1>
        
        {/* Bookings table */}
        <div className="bookings-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total Cost</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.name}</td>
                  <td>{booking.email}</td>
                  <td>{formatDate(booking.timestamp)}</td>
                  <td>{renderStatusBadge(booking.status)}</td>
                  <td>Ksh {booking.totalCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookings;