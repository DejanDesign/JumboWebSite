import React from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Features from '../components/Features';
import Hours from '../components/Hours';
import Contact from '../components/Contact';
import Map from '../components/Map';
import Reviews from '../components/Reviews';
import BlogPosts from '../components/BlogPosts';
import Footer from '../components/Footer';

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
          <Hours />
          <Contact />
          <Map />
          <Reviews />
          <BlogPosts />
          <Footer />
        </div>
  );
};

export default Home;



