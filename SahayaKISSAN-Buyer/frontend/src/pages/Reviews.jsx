import { useState, useEffect } from "react";
import axios from "axios";
import "./Reviews.css";

export default function Reviews({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [loading, setLoading] = useState(false);

  // Dummy users
  const dummyUsers = [
    { id: 1, name: "Rahul Sharma", avatar: "👨" },
    { id: 2, name: "Priya Devi", avatar: "👩" },
    { id: 3, name: "Amit Kumar", avatar: "🧔" },
    { id: 4, name: "Sunita Rani", avatar: "👩‍🦰" }
  ];

  useEffect(() => {
    // Fetch reviews
    setReviews([
      {
        id: 1,
        user: dummyUsers[0],
        rating: 5,
        comment: "Absolutely amazing tea! Rich flavor and great aroma. Will buy again!",
        date: "2026-01-15",
        replies: [
          { user: dummyUsers[2], comment: "Same here! Best tea in Assam.", date: "2026-01-15" }
        ]
      },
      {
        id: 2,
        user: dummyUsers[1],
        rating: 4,
        comment: "Very good quality. Delivery was fast. Slightly expensive but worth it.",
        date: "2026-01-14"
      },
      {
        id: 3,
        user: dummyUsers[3],
        rating: 5,
        comment: "Perfect for daily use. Organic and fresh. Highly recommended!",
        date: "2026-01-13"
      }
    ]);
  }, [productId]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const review = {
        id: Date.now(),
        user: dummyUsers[Math.floor(Math.random() * dummyUsers.length)],
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date().toISOString().split('T')[0]
      };
      
      setReviews([review, ...reviews]);
      setNewReview({ rating: 5, comment: "" });
      setLoading(false);
    }, 1000);
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="reviews-section">
      <div className="reviews-header">
        <h2>Reviews ({reviews.length})</h2>
        <div className="rating-summary">
          <span className="avg-rating">{averageRating}</span>
          <div className="stars">★★★★★</div>
        </div>
      </div>

      {/* ADD REVIEW FORM */}
      <form className="review-form" onSubmit={handleSubmitReview}>
        <div className="form-row">
          <div className="rating-input">
            <label>Rating:</label>
            <div className="stars-input">
              {[5,4,3,2,1].map((star) => (
                <span
                  key={star}
                  className={`star ${newReview.rating >= star ? 'filled' : ''}`}
                  onClick={() => setNewReview({...newReview, rating: star})}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <textarea
            placeholder="Share your experience..."
            value={newReview.comment}
            onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
            rows="3"
          />
        </div>
        <button type="submit" disabled={loading} className="submit-review-btn">
          {loading ? "Posting..." : "Post Review"}
        </button>
      </form>

      {/* REVIEWS LIST */}
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <span className="reviewer-avatar">{review.user.avatar}</span>
              <div className="reviewer-info">
                <span className="reviewer-name">{review.user.name}</span>
                <span className="review-date">{review.date}</span>
              </div>
              <div className="review-stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={i < review.rating ? 'filled' : ''}>★</span>
                ))}
              </div>
            </div>
            <p className="review-comment">{review.comment}</p>
            
            {/* REPLIES */}
            {review.replies && review.replies.map((reply, idx) => (
              <div key={idx} className="reply">
                <span className="reply-avatar">{reply.user.avatar}</span>
                <span>{reply.comment}</span>
                <small className="reply-date">{reply.date}</small>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
