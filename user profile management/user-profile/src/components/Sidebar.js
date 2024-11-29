// Sidebar.js
import React from 'react';
import './Sidebar.css'; // Include styles for the sidebar

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li><a href="#profile-management">Profile Management</a></li>
        <li><a href="#friends">Friends</a></li>
        <li><a href="#groups">Groups</a></li>
        <li><a href="#contact-us">Contact Us</a></li>
        <li><a href="#feedback">Feedback</a></li>
        <li><a href="#settings">Settings</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;
