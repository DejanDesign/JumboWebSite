import React from 'react';
import './About.css';

// ========================================
// ABOUT COMPONENT - JUMBO CONVENIENCE STORE
// ========================================
// This component tells the story of the store with:
// - Two-column layout for story content
// - Animated text with fade-in effects
// - Responsive design for mobile devices
// - Beautiful gradient background
// ========================================

const About = () => {
  return (
    <section className="story" id="about">
      <div className="container">
        <h2 className="section-title fade-in">Our Story</h2>
        <div className="story-content">
          <div className="story-text fade-in">
            <p>At Jumbo Convenience Store, family is at the heart of everything we do. My wife and I, the Djukic family, decided to reopen this cozy shop in Marsalforn, Gozo, because it holds a special place in our hearts.</p>
            <p>My wife has fond memories of shopping here over a decade ago, and the nostalgia of those moments pushed us to bring this beloved store back to life. We wanted to create a welcoming environment where people could shop with ease, knowing they are supporting a local, family-run business.</p>
            <p>Reopening the store was no small feat. We built everything from the ground up, pouring our heart and soul into every inch of the space. From laying down the shelves to choosing the perfect product arrangement, every decision was made with our future customers in mind.</p>
          </div>
          <div className="story-text fade-in">
            <p>In the beginning, we opened our doors with a small selection of stock, but we made sure every item was of the highest quality. We handpicked each product, ensuring that only the best would make its way onto our shelves.</p>
            <p>Our focus was on offering essentials like fresh bread, milk, and meats, alongside specialized items like lactose-free and gluten-free options. It was a humble start, but we knew that quality would speak louder than quantity.</p>
            <p>At the core of Jumbo Convenience Store is our mission to provide the highest quality products and service to our customers. As we continue to grow, we remain dedicated to being a trusted part of the Marsalforn community.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;




