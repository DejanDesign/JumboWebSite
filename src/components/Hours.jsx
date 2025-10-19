import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import HourItem from './HourItem';
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
  // Get today's day name
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  
  const hours = [
    { day: 'Monday', time: '07:00 - 13:00 | 16:00 - 22:00' },
    { day: 'Tuesday', time: '07:00 - 13:00 | 16:00 - 22:00' },
    { day: 'Wednesday', time: '07:00 - 13:00 | 16:00 - 22:00' },
    { day: 'Thursday', time: '07:00 - 13:00 | 16:00 - 22:00' },
    { day: 'Friday', time: '07:00 - 13:00 | 16:00 - 22:00' },
    { day: 'Saturday', time: '07:00 - 22:00' },
    { day: 'Sunday', time: '10:00 - 22:00', special: true }
  ];

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




