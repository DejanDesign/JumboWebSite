import React from 'react';
import './Features.css';

// ========================================
// FEATURES COMPONENT - JUMBO CONVENIENCE STORE
// ========================================
// This component displays the key features of the store with:
// - Animated feature cards with hover effects
// - Responsive grid layout
// - Scroll-triggered animations
// - Icon animations and transitions
// ========================================

const Features = () => {
  const features = [
    {
      icon: '🏪',
      title: 'Family-Run',
      description: 'A local business built with love and dedication by the Djukic family for the community.'
    },
    {
      icon: '⭐',
      title: 'Quality First',
      description: 'Handpicked products ensuring only the best items make it to our shelves.'
    },
    {
      icon: '🥖',
      title: 'Fresh Daily',
      description: 'Fresh bread, milk, meats, and essentials delivered daily for your convenience.'
    },
    {
      icon: '🌾',
      title: 'Special Options',
      description: 'Lactose-free and gluten-free options available for all dietary needs.'
    },
    {
      icon: '💝',
      title: 'Personal Touch',
      description: 'Every detail carefully planned to create a warm and welcoming shopping experience.'
    },
    {
      icon: '🤝',
      title: 'Community First',
      description: 'More than just a store - we\'re your neighbors committed to serving Marsalforn.'
    }
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        <h2 className="section-title fade-in">Why Choose Jumbo?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card fade-in">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;




