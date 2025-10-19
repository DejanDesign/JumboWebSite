import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

// ========================================
// REVIEW CARD COMPONENT - JUMBO CONVENIENCE STORE
// ========================================
// This component displays individual review cards with:
// - Scroll-triggered animations
// - Proper hook usage
// - Clean separation of concerns
// ========================================

const ReviewCard = ({ review, index }) => {
  const reviewRef = useScrollAnimation({ 
    animationType: 'fadeInUp', 
    delay: 0.1,
    duration: 0.6,
    stagger: 0.1
  });

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span 
        key={index} 
        className={`star ${index < rating ? 'filled' : 'empty'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div ref={reviewRef} className={`review-card creative-card-${index % 3}`}>
      <div className="review-header">
        <div className="reviewer-info">
          <div className="avatar-container">
            {review.profile_photo_url ? (
              <img 
                src={review.profile_photo_url} 
                alt={review.author_name}
                className="reviewer-avatar"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className="reviewer-avatar-fallback"
              style={{ display: review.profile_photo_url ? 'none' : 'flex' }}
            >
              {review.author_name ? review.author_name.charAt(0).toUpperCase() : 'A'}
            </div>
          </div>
          <div className="reviewer-details">
            <h4 className="reviewer-name">{review.author_name}</h4>
            <div className="review-rating">
              {renderStars(review.rating)}
            </div>
          </div>
        </div>
        <span className="review-date">{formatDate(review.time)}</span>
      </div>
      
      <div className="review-content">
        <div className="quote-mark">"</div>
        <p className="review-text">{review.text}</p>
        <div className="review-footer">
          <a 
            href={`https://www.google.com/maps/place/Jumbo+Convenience+Store/@36.0721098,14.2554454,17z/data=!4m16!1m9!3m8!1s0x130fb51ec2c704c1:0xb701478bf889752b!2sJumbo+Convenience+Store!8m2!3d36.0721098!4d14.2554454!9m1!1b1!16s%2Fg%2F11vc2l5zzq!3m5!1s0x130fb51ec2c704c1:0xb701478bf889752b!8m2!3d36.0721098!4d14.2554454!16s%2Fg%2F11vc2l5zzq?entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D`}
            target="_blank"
            rel="noopener noreferrer"
            className="google-badge"
            title="View this review on Google Maps"
          >
            <span className="google-icon">G</span>
            <span>Google Review</span>
            <span className="external-link-icon">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
