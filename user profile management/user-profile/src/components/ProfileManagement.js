import React from "react";

function ProfileManagement() {
  return (
    <div className="profile-management p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>User Profile Management</h4>
        <button className="btn btn-outline-primary">Back</button>
      </div>
      <h5>Personal Information</h5>
      <form>
        <div className="mb-3">
          <label className="form-label" htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" placeholder="Enter your name" />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="phone">Phone Number</label>
          <input type="text" className="form-control" id="phone" placeholder="Enter your phone number" />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="address">Address</label>
          <input type="text" className="form-control" id="address" placeholder="Enter your address" />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" placeholder="Enter your email" />
        </div>
        
        <div className="form-check form-switch mb-3">
          <input className="form-check-input" type="checkbox" id="notifications" />
          <label className="form-check-label" htmlFor="notifications">Notification Preferences</label>
        </div>
        <button className="btn btn-danger mb-3">Delete Account</button>
        <button type="submit" className="btn btn-primary w-50 mx-auto d-block">Save Changes</button>
      </form>
    </div>
  );
}

export default ProfileManagement;
