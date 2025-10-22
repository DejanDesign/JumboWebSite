import React, { Suspense, lazy } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import Products from '../components/Products';
import Hours from '../components/Hours';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

// Lazy load non-critical components
const Map = lazy(() => import('../components/Map'));
const Reviews = lazy(() => import('../components/Reviews'));

const Home = () => {
  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
        <div className="home">
          <Navigation />
          <Hero />
          <About />
          <Features />
          <Products />
          <Hours />
          <Contact />
          <Suspense fallback={<div className="loading-placeholder">Loading map...</div>}>
            <Map />
          </Suspense>
          <Suspense fallback={<div className="loading-placeholder">Loading reviews...</div>}>
            <Reviews />
          </Suspense>
          <Footer />
        </div>
  );
};

export default Home;



