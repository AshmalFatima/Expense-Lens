import React, { useState } from "react";

function Feedback() {
  // State to handle rating and feedback text
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  // Handling rating change
  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  // Handling feedback text change
  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  // Handling form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to submit feedback (can be an API call or just console log)
    console.log("Rating: ", rating);
    console.log("Feedback: ", feedback);
    alert("Thank you for your feedback!");
  };

  return (
    <div className="feedback-container">
      <div className="feedback-form-card">
        <h3>We Value Your Feedback</h3>
        <p>Please share your feedback about our service. Your opinion helps us improve!</p>
        <form onSubmit={handleSubmit}>
          {/* Rating Section */}
          <div className="form-group">
            <label htmlFor="rating">Rate us:</label>
            <div className="rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <label key={star}>
                  <input
                    type="radio"
                    name="rating"
                    value={star}
                    onChange={handleRatingChange}
                    checked={rating === star}
                  />
                  <span className={`star ${rating >= star ? "filled" : ""}`}>&#9733;</span>
                </label>
              ))}
            </div>
          </div>

          {/* Feedback Text Area */}
          <div className="form-group">
            <label htmlFor="feedback">Your Feedback:</label>
            <textarea
              id="feedback"
              name="feedback"
              placeholder="Share your thoughts..."
              value={feedback}
              onChange={handleFeedbackChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;
