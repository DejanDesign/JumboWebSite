import React, { useState, useEffect } from 'react';
import './Reviews.css';
import googlePlacesApi from '../services/googlePlacesApi';

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
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [businessInfo, setBusinessInfo] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Business coordinates from Google Maps
  const BUSINESS_LAT = 36.0721098;
  const BUSINESS_LNG = 14.2554454;

  useEffect(() => {
    const fetchGoogleReviews = async () => {
      try {
        setLoading(true);
        
        // Use the Google Places API service
        const businessData = await googlePlacesApi.getBusinessData(
          BUSINESS_LAT, 
          BUSINESS_LNG, 
          'Jumbo Convenience'
        );
        
        if (businessData) {
          console.log('Business data received:', businessData);
          console.log('Reviews count:', businessData.reviews ? businessData.reviews.length : 0);
          console.log('Reviews data:', businessData.reviews);
          
          setBusinessInfo(businessData.businessInfo);
          setReviews(businessData.reviews || []);
          setLastUpdated(new Date());
        } else {
          console.log('No business data found from Google');
          setError('Unable to load reviews from Google. Please check if your business is properly listed on Google Maps.');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews from Google');
        setLoading(false);
      }
    };

    fetchGoogleReviews();
  }, []);

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
    setLoading(true);
    setError(null);
    
    // Re-fetch data
    const fetchGoogleReviews = async () => {
      try {
        const businessData = await googlePlacesApi.getBusinessData(
          BUSINESS_LAT, 
          BUSINESS_LNG, 
          'Jumbo Convenience'
        );
        
        if (businessData) {
          setBusinessInfo(businessData.businessInfo);
          setReviews(businessData.reviews);
          setLastUpdated(new Date());
          console.log('Successfully refreshed business data:', businessData);
        } else {
          setError('Unable to load reviews from Google');
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error refreshing reviews:', err);
        setError('Failed to load reviews from Google');
        setLoading(false);
      }
    };

    fetchGoogleReviews();
  };

  if (loading) {
    return (
      <section className="reviews-section">
        <div className="container">
          <h2 className="section-title fade-in">Customer Reviews</h2>
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
          <h2 className="section-title fade-in">Customer Reviews</h2>
          <div className="reviews-error">
            <p>{error}</p>
            <p>Please check your Google Maps listing and try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  if (!loading && reviews.length === 0 && !error) {
    return (
      <section className="reviews-section">
        <div className="container">
          <h2 className="section-title fade-in">Customer Reviews</h2>
          <p className="reviews-subtitle fade-in">
            See what our customers are saying about {businessInfo?.name || 'Jumbo Convenience Store'}
          </p>
          
          
          <div className="no-reviews">
            <p>No reviews are currently displayed. This could be because:</p>
            <ul style={{textAlign: 'left', maxWidth: '400px', margin: '0 auto'}}>
              <li>Reviews are not available through the API</li>
              <li>Your business needs more reviews to appear</li>
              <li>There might be a temporary issue with Google's data</li>
            </ul>
            <button 
              className="btn btn-primary write-review-btn"
              onClick={handleWriteReview}
            >
              <span className="btn-icon">⭐</span>
              Write a Review
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="reviews-section" id="reviews">
      <div className="container">
        <h2 className="section-title fade-in">Customer Reviews</h2>
        <p className="reviews-subtitle fade-in">
          See what our customers are saying about {businessInfo?.name || 'Jumbo Convenience Store'}
        </p>
        
        {/* Google Rating Display */}
        {businessInfo && (
          <div className="google-rating-display fade-in">
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
            <div key={review.id} className={`review-card fade-in creative-card-${index % 3}`}>
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
          ))}
        </div>

        {/* Google Business Performance Card - After Reviews */}
        <div className="google-views-card fade-in">
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
