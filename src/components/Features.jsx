import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './Features.css';

// ========================================
// FEATURES COMPONENT - JUMBO CONVENIENCE STORE
// ========================================
// This component displays the key features of the store with:
// - Enhanced scroll-triggered animations
// - Staggered card animations
// - Responsive grid layout
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

  const titleRef = useScrollAnimation({ 
    animationType: 'fadeInUp', 
    delay: 0.2,
    duration: 0.8 
  });

  return (
    <section className="features" id="features">
      <div className="container">
        <h2 ref={titleRef} className="section-title">Why Choose Jumbo?</h2>
        <div className="features-grid">
          {features.map((feature, index) => {
            const cardRef = useScrollAnimation({ 
              animationType: 'scaleIn', 
              delay: 0.1,
              duration: 0.6,
              stagger: 0.1
            });
            
            return (
              <div key={index} ref={cardRef} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;




