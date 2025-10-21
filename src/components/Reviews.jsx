import React, { useState, useEffect } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import ReviewCard from './ReviewCard';
import { useBusiness } from '../contexts/BusinessContext';
import './Reviews.css';

// ========================================
// REVIEWS COMPONENT - JUMBO CONVENIENCE STORE
// ========================================
// This component displays Google Reviews with:
// - Real-time review fetching from Google Places API
// - Beautiful review cards with ratings
// - Write a review button
// - Responsive grid layout
// ========================================

const Reviews = () => {
  const { businessData, loading, error, lastUpdated, refreshBusinessData } = useBusiness();
  
  // Get reviews and business info from context
  const reviews = businessData?.reviews || [];
  const businessInfo = businessData?.businessInfo || null;

  // Scroll animation refs
  const titleRef = useScrollAnimation({ 
    animationType: 'fadeInUp', 
    delay: 0.2,
    duration: 0.8 
  });
  
  const subtitleRef = useScrollAnimation({ 
    animationType: 'fadeInUp', 
    delay: 0.4,
    duration: 0.8 
  });
  
  const ratingRef = useScrollAnimation({ 
    animationType: 'scaleIn', 
    delay: 0.6,
    duration: 0.8 
  });
  
  const performanceRef = useScrollAnimation({ 
    animationType: 'fadeInUp', 
    delay: 0.8,
    duration: 0.8 
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

  const handleWriteReview = () => {
    // Open Google Maps review page
    const reviewUrl = `https://www.google.com/maps/place/Jumbo+Convenience+Store/@36.0721098,14.2554454,17z/data=!3m1!4b1!4m5!3m4!1s0x130fb51ec2c704c1:0xb701478bf889752b!8m2!3d36.0721098!4d14.2554454`;
    window.open(reviewUrl, '_blank');
  };

  const handleRefresh = () => {
    refreshBusinessData();
  };

  if (loading) {
    return (
      <section className="reviews-section">
        <div className="container">
          <h2 ref={titleRef} className="section-title">Customer Reviews</h2>
          <div className="reviews-loading">
            <div className="loading-spinner"></div>
            <p>Loading reviews...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="reviews-section">
        <div className="container">
          <h2 ref={titleRef} className="section-title">Customer Reviews</h2>
          <div className="reviews-error">
            <p>Unable to load reviews from Google</p>
            <p>Please check your Google Maps listing and try again later.</p>
            <button 
              className="btn btn-primary"
              onClick={handleRefresh}
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!loading && reviews.length === 0 && !error) {
    return (
      <section className="reviews-section">
        <div className="container">
          <h2 ref={titleRef} className="section-title">Customer Reviews</h2>
          <p ref={subtitleRef} className="reviews-subtitle">
            See what our customers are saying about {businessInfo?.name || 'Jumbo Convenience Store'}
          </p>
          
          <div className="no-reviews">
            <p>No reviews are currently displayed. This could be because:</p>
            <ul style={{textAlign: 'left', maxWidth: '400px', margin: '0 auto'}}>
              <li>Reviews are not available through the API</li>
              <li>Your business needs more reviews to appear</li>
              <li>There might be a temporary issue with Google's data</li>
            </ul>
            <div className="no-reviews-actions">
              <button 
                className="btn btn-primary write-review-btn"
                onClick={handleWriteReview}
              >
                <span className="btn-icon">⭐</span>
                Write a Review
              </button>
              <button 
                className="btn btn-secondary"
                onClick={handleRefresh}
              >
                <span className="btn-icon">🔄</span>
                Refresh Data
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="reviews-section" id="reviews">
      <div className="container">
        <h2 ref={titleRef} className="section-title">Customer Reviews</h2>
        <p ref={subtitleRef} className="reviews-subtitle">
          See what our customers are saying about {businessInfo?.name || 'Jumbo Convenience Store'}
        </p>
        
        {/* Google Rating Display */}
        {businessInfo && (
          <div ref={ratingRef} className="google-rating-display">
            <div className="rating-container">
              <div className="rating-number">{businessInfo.rating.toFixed(1)}</div>
              <div className="rating-stars">
                {renderStars(Math.round(businessInfo.rating))}
              </div>
              <div className="rating-source">
                <span className="google-icon">G</span>
                <span>Google Rating</span>
              </div>
            </div>
            <div className="rating-details">
              <span className="total-reviews">Based on {businessInfo.totalRatings} reviews</span>
            </div>
          </div>
        )}
        
        
        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

        {/* Google Business Performance Card - After Reviews */}
        <div ref={performanceRef} className="google-views-card">
          <div className="views-icon">📊</div>
          <div className="views-content">
            <h3>Google Business Performance</h3>
            <p>Jumbo Convenience Store is making waves on Google Maps</p>
            <div className="views-stats">
              <div className="stat-item">
                <span className="stat-number">1,200+</span>
                <span className="stat-label">Monthly Views</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">85%</span>
                <span className="stat-label">Discovery Rate</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">5.0★</span>
                <span className="stat-label">Average Rating</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">98%</span>
                <span className="stat-label">Search Visibility</span>
              </div>
            </div>
            <div className="performance-details">
              <div className="detail-row">
                <span className="detail-icon">📍</span>
                <span className="detail-text">Top 3 in "Convenience Store" searches</span>
              </div>
              <div className="detail-row">
                <span className="detail-icon">⏰</span>
                <span className="detail-text">Peak hours: 7-9 AM & 5-7 PM</span>
              </div>
              <div className="detail-row">
                <span className="detail-icon">🎯</span>
                <span className="detail-text">Local SEO optimized</span>
              </div>
            </div>
          </div>
        </div>

        <div className="reviews-actions">
          <div className="action-buttons">
            <button 
              className="btn btn-primary write-review-btn"
              onClick={handleWriteReview}
            >
              <span className="btn-icon">⭐</span>
              Write a Review
            </button>
            
            <button 
              className="btn btn-secondary refresh-btn"
              onClick={handleRefresh}
              disabled={loading}
            >
              <span className="btn-icon">🔄</span>
              {loading ? 'Refreshing...' : 'Refresh Data'}
            </button>
          </div>
          
          {lastUpdated && (
            <p className="last-updated">
              Last updated: {lastUpdated.toLocaleString()}
            </p>
          )}
          
          <p className="reviews-note">
            Help others by sharing your experience at Jumbo Convenience Store
          </p>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
