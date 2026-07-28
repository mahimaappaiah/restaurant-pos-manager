import React, { useState } from "react";
import { useResto } from "../../context/RestoContext";
import { Star, Camera, CheckCircle } from "lucide-react";

export const CustomerFeedback = ({ onComplete }) => {
  const { submitFeedback } = useResto();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitFeedback(rating, comment);
    setSubmitted(true);
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="feedback-screen fade-in">
        <div className="feedback-card truffles-card" style={{ textAlign: "center" }}>
          <CheckCircle size={56} color="#7EE787" style={{ margin: "0 auto" }} />
          <h2>Thank you for your feedback!</h2>
          <p className="body-text">Your review helps us improve Truffles every day.</p>
          <span className="caption-text">Redirecting to home screen in 3 seconds...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="feedback-screen fade-in">
      <div className="feedback-card truffles-card">
        <h2>How was your experience at Truffles?</h2>
        <p className="caption-text">Rate your meal and table service</p>

        <form onSubmit={handleSubmit} className="feedback-form">
          {/* 5 Star Rating Selector */}
          <div className="star-rating-row">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={32}
                color={star <= rating ? "#FF6B35" : "#222233"}
                fill={star <= rating ? "#FF6B35" : "transparent"}
                style={{ cursor: "pointer" }}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          <div className="comment-box">
            <label className="caption-text">YOUR COMMENTS / SUGGESTIONS:</label>
            <textarea
              rows={3}
              placeholder="Tell us what you loved or how we can do better..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>

          <div className="photo-upload-mock">
            <button type="button" className="btn-ghost" style={{ width: "100%" }}>
              <Camera size={18} color="#FF6B35" />
              <span>Add a Dish Photo (Optional)</span>
            </button>
          </div>

          <button type="submit" className="btn-primary" style={{ width: "100%" }}>
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};
