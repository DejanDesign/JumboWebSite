import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import HourItem from './HourItem';
import { useBusiness } from '../contexts/BusinessContext';
import './Hours.css';

// ========================================
// HOURS COMPONENT - JUMBO CONVENIENCE STORE
// ========================================
// This component displays store opening hours with:
// - Animated hour items with hover effects
// - Special styling for different days
// - Responsive grid layout
// - Scroll-triggered animations
// ========================================

const Hours = () => {
  const { businessData, loading, formatOpeningHours, getDefaultHours } = useBusiness();
  
  // Get today's day name
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  
  // Get hours from Google Business or use fallback
  const hours = React.useMemo(() => {
    if (loading) {
      return getDefaultHours();
    }
    
    if (businessData?.businessInfo?.openingHours) {
      return formatOpeningHours(businessData.businessInfo.openingHours);
    }
    
    return getDefaultHours();
  }, [businessData, loading, formatOpeningHours, getDefaultHours]);

  const titleRef = useScrollAnimation({ 
    animationType: 'fadeInUp', 
    delay: 0.2,
    duration: 0.8 
  });

  return (
    <section className="hours" id="hours">
      <div className="container">
        <h2 ref={titleRef} className="section-title">Opening Hours</h2>
        <div className="hours-grid">
          {hours.map((hour, index) => (
            <HourItem key={index} hour={hour} index={index} today={today} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hours;




