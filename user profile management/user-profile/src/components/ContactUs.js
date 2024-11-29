import React from "react";

function ContactUs() {
  return (
    <div className="contact-us-container">
      {/* Contact Info Card */}
      <div className="contact-info-card">
        <h2>Contact Information</h2>
        <p>If you have any questions, feel free to reach out to us!</p>
        <ul className="contact-info-list">
          <li><strong>Email:</strong> contact@expenselens.com</li>
          <li><strong>Phone:</strong> +92 312 5110579</li>
          <li><strong>Address:</strong>COMSATS University Islamabad</li>
        </ul>
      </div>

      {/* Contact Form Card */}
      <div className="contact-form-card">
        <h3>Get in Touch</h3>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Your Name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Your Email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Your Message" required />
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
