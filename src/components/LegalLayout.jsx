import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import './LegalLayout.css';

// ========================================
// LEGAL LAYOUT COMPONENT - JUMBO CONVENIENCE STORE
// ========================================
// This component provides a consistent layout for legal pages with:
// - Navigation header
// - Back to home button
// - Footer
// - Consistent styling
// ========================================

const LegalLayout = ({ children, title }) => {
  return (
    <div className="legal-layout">
      <Navigation />
      
      <div className="legal-page-header">
        <div className="container">
          <Link to="/" className="back-to-home-btn">
            ← Back to Home
          </Link>
          <h1 className="legal-page-title">{title}</h1>
        </div>
      </div>
      
      <div className="legal-page-content">
        {children}
      </div>
      
      <Footer />
    </div>
  );
};

export default LegalLayout;
