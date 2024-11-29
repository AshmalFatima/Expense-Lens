import React, { useState } from "react";

function Settings() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  // Handle file input for profile picture
  const handleProfileImageChange = (event) => {
    setProfileImage(URL.createObjectURL(event.target.files[0]));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to save settings
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("New Password:", newPassword);
    if (profileImage) {
      console.log("Profile Image:", profileImage);
    }
    alert("Settings have been updated!");
  };

  return (
    <div className="settings-container">
      <div className="settings-form-card">
        <h3>Update Your Settings</h3>

        <form onSubmit={handleSubmit}>
          {/* Profile Picture Section */}
          <div className="form-group">
            <label htmlFor="profile-image">Profile Picture:</label>
            <input
              type="file"
              id="profile-image"
              accept="image/*"
              onChange={handleProfileImageChange}
            />
            {profileImage && <img src={profileImage} alt="Profile" className="profile-image-preview" />}
          </div>

          {/* Username Section */}
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Enter new username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password Section */}
          <div className="form-group">
            <label htmlFor="password">Current Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter current password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="new-password">New Password:</label>
            <input
              type="password"
              id="new-password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default Settings;
