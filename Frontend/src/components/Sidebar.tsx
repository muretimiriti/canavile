import React from "react";
import { FiHome, FiSettings, FiGrid, FiX } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";
import "./Sidebar.css"; // Import custom CSS for styling

interface SidebarProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose }: SidebarProps) => {
  return (
    <div className="sidebar-content">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Dashboard</h2>
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="sidebar-close-button"
        >
          <FiX />
        </button>
      </div>
      <NavItem icon={FiHome} to="/">Home</NavItem>
      <NavItem icon={FiGrid} to="/about">About</NavItem>
      <NavItem icon={FiGrid} to="/explore">Explore</NavItem>
      <NavItem icon={FiGrid} to="/contact">Contact</NavItem>
      <NavItem icon={FiGrid} to="/booking">Booking</NavItem>
      <NavItem icon={FiSettings} to="/settings">Settings</NavItem>
    </div>
  );
};

const NavItem = ({ icon, to, children }: { icon: React.ElementType; to: string; children: React.ReactNode }) => {
  return (
    <RouterLink to={to} className="nav-item">
      {icon && <span className="nav-icon">{React.createElement(icon)}</span>}
      {children}
    </RouterLink>
  );
};

export const Sidebar = ({ onClose }: SidebarProps) => {
  return (
    <div className="sidebar-drawer">
      <div className="drawer-backdrop" onClick={onClose}></div>
      <div className="drawer-content">
        <SidebarContent onClose={onClose} />
      </div>
    </div>
  );
};

export default Sidebar;