import React, { useState, useEffect } from 'react';
import './StatusIndicator.css';

// ========================================
// STATUS INDICATOR COMPONENT - JUMBO CONVENIENCE STORE
// ========================================
// This component shows real-time store status with:
// - Dynamic open/closed status based on current time
// - Next opening time display
// - Animated status indicator
// - Compact header-friendly design
// ========================================

const StatusIndicator = () => {
  const [status, setStatus] = useState({ isOpen: false, nextOpen: '', message: '' });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showTooltip, setShowTooltip] = useState(false);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Check store status based on current time
  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const hour = now.getHours();
      const minute = now.getMinutes();
      const currentTime = hour * 60 + minute; // Convert to minutes

      let isOpen = false;
      let nextOpen = '';
      let message = '';

      // Store hours logic
      if (day === 0) { // Sunday
        isOpen = currentTime >= 600 && currentTime <= 1320; // 10:00 - 22:00
        if (!isOpen) {
          if (currentTime < 600) {
            nextOpen = '10:00 AM';
            message = 'Opens at 10:00 AM';
          } else {
            nextOpen = 'Monday 7:00 AM';
            message = 'Opens Monday at 7:00 AM';
          }
        }
      } else if (day === 6) { // Saturday
        isOpen = currentTime >= 420 && currentTime <= 1320; // 07:00 - 22:00
        if (!isOpen) {
          if (currentTime < 420) {
            nextOpen = '7:00 AM';
            message = 'Opens at 7:00 AM';
          } else {
            nextOpen = 'Sunday 10:00 AM';
            message = 'Opens Sunday at 10:00 AM';
          }
        }
      } else { // Monday to Friday
        // Morning: 07:00 - 13:00 (420 - 780 minutes)
        // Evening: 16:00 - 22:00 (960 - 1320 minutes)
        isOpen = (currentTime >= 420 && currentTime <= 780) || (currentTime >= 960 && currentTime <= 1320);
        
        if (!isOpen) {
          if (currentTime < 420) {
            nextOpen = '7:00 AM';
            message = 'Opens at 7:00 AM';
          } else if (currentTime >= 780 && currentTime < 960) {
            nextOpen = '4:00 PM';
            message = 'Opens at 4:00 PM';
          } else {
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowDay = tomorrow.toLocaleDateString('en-US', { weekday: 'long' });
            nextOpen = `${tomorrowDay} 7:00 AM`;
            message = `Opens ${tomorrowDay} at 7:00 AM`;
          }
        }
      }

      setStatus({ isOpen, nextOpen, message });
    };

    checkStatus();
  }, [currentTime]);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showTooltip && !event.target.closest('.status-indicator')) {
        setShowTooltip(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showTooltip]);

  const handleStatusClick = (e) => {
    e.stopPropagation();
    setShowTooltip(!showTooltip);
  };

  return (
    <div className={`status-indicator ${status.isOpen ? 'open' : 'closed'}`} onClick={handleStatusClick}>
      <div className="status-dot"></div>
      <div className="status-text">
        <span className="status-label">
          {status.isOpen ? 'Open Now' : 'Closed'}
        </span>
        {!status.isOpen && (
          <span className="next-open">{status.message}</span>
        )}
      </div>
      
      {showTooltip && (
        <div className="status-tooltip">
          <div className="tooltip-content">
            <div className="tooltip-status">
              {status.isOpen ? '🟢 Open Now' : '🔴 Closed'}
            </div>
            <div className="tooltip-message">
              {status.isOpen 
                ? 'We are currently open for business!' 
                : status.message
              }
            </div>
            <div className="tooltip-arrow"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusIndicator;
