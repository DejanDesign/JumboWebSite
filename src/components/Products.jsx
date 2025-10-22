import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './Products.css';

// ========================================
// PRODUCTS COMPONENT - JUMBO CONVENIENCE STORE
// ========================================
// This component displays products with:
// - Creative animated cards
// - Scroll-triggered animations
// - Staggered card animations
// - Responsive grid layout
// - Hover effects and transitions
// ========================================

const Products = () => {
  const products = [
    {
      image: '/imagesJumbo/chocolates.webp',
      title: 'Sweet Indulgence',
      description: 'Chocolate bars, candies, and favorite confections for a perfect treat.',
      category: 'sweets'
    },
    {
      image: '/imagesJumbo/cereals and more.webp',
      title: 'Morning Fuel',
      description: 'Get your day started with a selection of classic cereals, granola, and flakes.',
      category: 'breakfast'
    },
    {
      image: '/imagesJumbo/cruncsh time.webp',
      title: 'Crunch Time Snacks',
      description: 'The ultimate selection of chips, sticks, and savory bites for any craving.',
      category: 'snacks'
    },
    {
      image: '/imagesJumbo/refreshment lineUP.webp',
      title: 'Quench Your Thirst',
      description: 'A refreshing line-up of Fanta and Kinnie flavors to cool you down.',
      category: 'beverages'
    },
    {
      image: '/imagesJumbo/morning spreads.webp',
      title: 'Breakfast Spreads',
      description: 'Sweet jams, creamy peanut butter, and hazelnut chocolate for perfect toast.',
      category: 'spreads'
    },
    {
      image: '/imagesJumbo/fridge.webp',
      title: 'Farm & Fridge Finds',
      description: 'Fresh milk, yogurt, deli meats, and cheeses for daily essentials.',
      category: 'fresh'
    },
    {
      image: '/imagesJumbo/energy drinks.webp',
      title: 'Unleash the Beast',
      description: 'A range of Monster Energy flavors to provide the boost you need.',
      category: 'energy'
    },
    {
      image: '/imagesJumbo/sauces.webp',
      title: 'Authentic Sauce Base',
      description: 'Essential canned and packed tomato products for every recipe.',
      category: 'cooking'
    },
    {
      image: '/imagesJumbo/beer.webp',
      title: 'Crisp & Cold Brews',
      description: 'Selection of refreshing beers, from light lagers to strong dark brews.',
      category: 'beverages'
    },
    {
      image: '/imagesJumbo/coffee and tea.webp',
      title: 'Morning Boost Essentials',
      description: 'Your must-have coffee and tea to kickstart the day or enjoy a break.',
      category: 'beverages'
    },
    {
      image: '/imagesJumbo/frozen meat.webp',
      title: 'FROZEN HARVEST!',
      description: 'Prime Meats, Simply Prepared - From farm-fresh cuts to premium selections, our frozen meats are flash-frozen at peak freshness to lock in flavor and nutrition.',
      category: 'frozen'
    },
    {
      image: null, // Special card without image
      title: 'And Many More!',
      description: 'We have dedicated sections for gluten-free, sugar-free, and lactose-free products. Plus, discover our extensive range of organic, vegan, and specialty items.',
      category: 'specialty',
      isSpecial: true
    }
  ];

  const titleRef = useScrollAnimation({ 
    animationType: 'fadeInUp', 
    delay: 0.2,
    duration: 0.8 
  });

  return (
    <section className="products" id="products">
      <div className="container">
        <h2 ref={titleRef} className="section-title">Our Products</h2>
        <p className="products-subtitle">
          Discover our carefully curated selection of quality products for every need. 
          <br />
          <span className="subtitle-highlight">And that's just the beginning!</span> 
          <span className="subtitle-emoji">✨</span> 
          Explore our full range of similar products in-store for an even greater variety.
        </p>
        
        <div className="products-grid">
          {products.map((product, index) => {
            const cardRef = useScrollAnimation({ 
              animationType: 'scaleIn', 
              delay: 0.1,
              duration: 0.6,
              stagger: 0.1
            });
            
            return (
              <div key={index} ref={cardRef} className={`product-card product-card-${index % 6} ${product.isSpecial ? 'special-card' : ''}`}>
                {product.isSpecial ? (
                  <div className="special-card-content">
                    <div className="special-icon">🌟</div>
                    <div className="special-categories">
                      <span className="category-tag">Gluten-Free</span>
                      <span className="category-tag">Sugar-Free</span>
                      <span className="category-tag">Lactose-Free</span>
                      <span className="category-tag">Organic</span>
                      <span className="category-tag">Vegan</span>
                    </div>
                  </div>
                ) : (
                  <div className="product-image-container">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="product-image"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="product-overlay">
                      <div className="product-category">{product.category}</div>
                    </div>
                  </div>
                )}
                
                <div className="product-content">
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-description">{product.description}</p>
                  
                  <div className="product-footer">
                    <div className="product-tag">
                      <span className="tag-icon">{product.isSpecial ? '🎯' : '✨'}</span>
                      <span className="tag-text">{product.isSpecial ? 'Specialty Items' : 'Premium Quality'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="product-shine"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
