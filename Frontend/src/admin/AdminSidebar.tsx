import React from "react";
import { FiHome, FiSettings, FiCalendar, FiDollarSign, FiLogOut, FiX } from "react-icons/fi";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // Ensure this is correctly imported
import "./AdminSidebar.css"; 

interface SidebarProps {
  onClose: () => void;
}

const SidebarContent: React.FC<SidebarProps> = ({ onClose }) => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/"); // Redirect to HomePage after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="sidebar-content">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Admin Panel</h2>
        <button aria-label="Close menu" onClick={onClose} className="sidebar-close-button">
          <FiX />
        </button>
      </div>
      <NavItem icon={FiHome} to="/">Home</NavItem>
      <NavItem icon={FiCalendar} to="/admin/events">Events</NavItem>
      <NavItem icon={FiDollarSign} to="/admin/transactions">Transactions</NavItem>
      <NavItem icon={FiSettings} to="/admin/bookings">Bookings</NavItem>

      {/* Logout Button */}
      <button className="logout-button" onClick={handleLogout}>
        <FiLogOut className="nav-icon" />
        Logout
      </button>
    </div>
  );
};

const NavItem: React.FC<{ icon: React.ElementType; to: string; children: React.ReactNode }> = ({ icon, to, children }) => {
  return (
    <RouterLink to={to} className="nav-item">
      <span className="nav-icon">{React.createElement(icon)}</span>
      {children}
    </RouterLink>
  );
};

const AdminSidebar: React.FC<SidebarProps> = ({ onClose }) => {
  return (
    <div className="sidebar">
      <SidebarContent onClose={onClose} />
    </div>
  );
};

export default AdminSidebar;