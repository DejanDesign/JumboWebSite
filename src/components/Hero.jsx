import React from 'react';
import './Hero.css';

// ========================================
// HERO COMPONENT - JUMBO CONVENIENCE STORE
// ========================================
// This component displays the main hero section with:
// - Animated gradient background with moving grid pattern
// - Call-to-action buttons with hover effects
// - Responsive design for all screen sizes
// - Smooth scroll navigation to other sections
// ========================================

const Hero = () => {
  const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      const element = document.querySelector(targetId);
      if (element) {
        // Scroll to top first, then to the element
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-background"></div>
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Jumbo</h1>
        <p className="hero-subtitle">Your Family-Run Convenience Store in Marsalforn, Gozo</p>
        <div className="hero-buttons">
          <a href="#contact" className="btn btn-primary" onClick={handleNavClick}>Visit Us</a>
          <a href="#about" className="btn btn-secondary" onClick={handleNavClick}>Our Story</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
