/**
 * Admin Sidebar Component
 * 
 * This component provides the navigation sidebar for the admin interface.
 * Features include:
 * - Navigation links to different admin sections
 * - Logout functionality
 * - Responsive design with mobile support
 * - Clean and modern UI with icons
 */

import React from "react";
import { FiHome, FiSettings, FiCalendar, FiDollarSign, FiLogOut, FiX } from "react-icons/fi";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // Ensure this is correctly imported
import "./AdminSidebar.css"; 

/**
 * Props interface for the Sidebar component
 */
interface SidebarProps {
  onClose: () => void;
}

/**
 * SidebarContent Component
 * Renders the main content of the sidebar including navigation items and logout button
 */
const SidebarContent: React.FC<SidebarProps> = ({ onClose }) => {
  const navigate = useNavigate();

  /**
   * Handles the logout process
   * Signs out the user and redirects to the home page
   */
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
      {/* Sidebar header with title and close button */}
      <div className="sidebar-header">
        <h2 className="sidebar-title">Admin Panel</h2>
        <button aria-label="Close menu" onClick={onClose} className="sidebar-close-button">
          <FiX />
        </button>
      </div>

      {/* Navigation items */}
      <NavItem icon={FiHome} to="/">Home</NavItem>
      <NavItem icon={FiCalendar} to="/admin/events">Events</NavItem>
      <NavItem icon={FiDollarSign} to="/admin/transactions">Transactions</NavItem>
      <NavItem icon={FiSettings} to="/admin/bookings">Bookings</NavItem>

      {/* Logout button */}
      <button className="logout-button" onClick={handleLogout}>
        <FiLogOut className="nav-icon" />
        Logout
      </button>
    </div>
  );
};

/**
 * NavItem Component
 * Renders a single navigation item with an icon and link
 */
const NavItem: React.FC<{ icon: React.ElementType; to: string; children: React.ReactNode }> = ({ icon, to, children }) => {
  return (
    <RouterLink to={to} className="nav-item">
      <span className="nav-icon">{React.createElement(icon)}</span>
      {children}
    </RouterLink>
  );
};

/**
 * Main AdminSidebar Component
 * Wraps the SidebarContent in a container with proper styling
 */
const AdminSidebar: React.FC<SidebarProps> = ({ onClose }) => {
  return (
    <div className="sidebar">
      <SidebarContent onClose={onClose} />
    </div>
  );
};

export default AdminSidebar;