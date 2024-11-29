import React, { useState } from "react";
import { FaUser, FaUserFriends, FaUsers, FaEnvelope, FaCommentDots, FaCog } from "react-icons/fa";
import ProfileManagement from "./components/ProfileManagement";
import Friends from "./components/Friends";
import Groups from "./components/Groups";
import ContactUs from "./components/ContactUs";
import Feedback from "./components/Feedback";
import Settings from "./components/Settings";
import './App.css';

function App() {
  // State to keep track of the active page
  const [activePage, setActivePage] = useState("profile-management");

  // Function to handle the active page change
  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <div className="app">
      <div className="sidebar">
        {/* Title of the app */}
        <div className="title">Expense Lens</div>

        <nav>
          {/* Navigation links with icons */}
          <ul>
            <li>
              <a
                href="#profile-management"
                onClick={() => handlePageChange("profile-management")}
              >
                <FaUser /> Profile Management
              </a>
            </li>
            <li>
              <a
                href="#friends"
                onClick={() => handlePageChange("friends")}
              >
                <FaUserFriends /> Friends
              </a>
            </li>
            <li>
              <a
                href="#groups"
                onClick={() => handlePageChange("groups")}
              >
                <FaUsers /> Groups
              </a>
            </li>
            <li>
              <a
                href="#contact-us"
                onClick={() => handlePageChange("contact-us")}
              >
                <FaEnvelope /> Contact Us
              </a>
            </li>
            <li>
              <a
                href="#feedback"
                onClick={() => handlePageChange("feedback")}
              >
                <FaCommentDots /> Feedback
              </a>
            </li>
            <li>
              <a
                href="#settings"
                onClick={() => handlePageChange("settings")}
              >
                <FaCog /> Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="content">
        {/* Conditional rendering of sections based on activePage */}
        {activePage === "profile-management" && <ProfileManagement />}
        {activePage === "friends" && <Friends />}
        {activePage === "groups" && <Groups />}
        {activePage === "contact-us" && <ContactUs />}
        {activePage === "feedback" && <Feedback />}
        {activePage === "settings" && <Settings />}
      </div>
    </div>
  );
}

export default App;
