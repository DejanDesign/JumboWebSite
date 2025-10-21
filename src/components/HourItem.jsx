import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';

// ========================================
// HOUR ITEM COMPONENT - JUMBO CONVENIENCE STORE
// ========================================
// This component displays individual hour items with:
// - Scroll-triggered animations
// - Proper hook usage
// - Clean separation of concerns
// ========================================

const HourItem = ({ hour, index, today }) => {
  const hourRef = useScrollAnimation({ 
    animationType: 'fadeInUp', 
    delay: 0.1,
    duration: 0.6,
    stagger: 0.1
  });

  return (
    <div 
      ref={hourRef}
      className={`hour-item ${hour.special ? 'special' : ''} ${hour.day === today ? 'today' : ''}`}
    >
      <span className="day">{hour.day}</span>
      <span className="time">{hour.time}</span>
    </div>
  );
};

export default HourItem;
