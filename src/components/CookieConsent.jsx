import React, { useState, useEffect } from 'react';
import './CookieConsent.css';

// ========================================
// COOKIE CONSENT COMPONENT - JUMBO CONVENIENCE STORE
// ========================================
// This component handles cookie consent with:
// - GDPR compliant cookie banner
// - Local storage for consent preferences
// - Smooth animations and transitions
// - Customizable cookie categories
// - Privacy policy integration
// ========================================

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    preferences: false
  });

  useEffect(() => {
    // Check if user has already given consent
    const savedConsent = localStorage.getItem('jumbo-cookie-consent');
    if (!savedConsent) {
      setShowBanner(true);
    } else {
      const parsedConsent = JSON.parse(savedConsent);
      setConsent(parsedConsent);
      // Initialize services if consent was already given
      initializeServices(parsedConsent);
    }
  }, []);

  const handleAcceptAll = () => {
    const newConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    setConsent(newConsent);
    localStorage.setItem('jumbo-cookie-consent', JSON.stringify(newConsent));
    setShowBanner(false);
    
    // Initialize analytics and other services
    initializeServices(newConsent);
  };

  const handleAcceptSelected = () => {
    localStorage.setItem('jumbo-cookie-consent', JSON.stringify(consent));
    setShowBanner(false);
    
    // Initialize services based on consent
    initializeServices(consent);
  };

  const handleRejectAll = () => {
    const newConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    setConsent(newConsent);
    localStorage.setItem('jumbo-cookie-consent', JSON.stringify(newConsent));
    setShowBanner(false);
  };

  const handleToggleCategory = (category) => {
    if (category === 'necessary') return; // Can't disable necessary cookies
    
    setConsent(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const initializeServices = (consentData) => {
    // Initialize Google Analytics if consented
    if (consentData.analytics) {
      // Load Google Analytics script
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-LEL2B0DGQE';
      document.head.appendChild(script1);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', 'G-LEL2B0DGQE', {
        'anonymize_ip': true,
        'cookie_flags': 'SameSite=None;Secure'
      });
      
      console.log('Google Analytics initialized with ID: G-LEL2B0DGQE');
    }
    
    // Initialize marketing cookies if consented
    if (consentData.marketing) {
      // Add marketing tracking initialization here
      console.log('Marketing cookies enabled');
    }
    
    // Initialize preference cookies if consented
    if (consentData.preferences) {
      // Add preference tracking initialization here
      console.log('Preference cookies enabled');
    }
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-consent-overlay">
      <div className="cookie-consent-banner">
        <div className="cookie-consent-content">
          <div className="cookie-icon">🍪</div>
          <div className="cookie-text">
            <h3>We Value Your Privacy</h3>
            <p>
              We use cookies to enhance your browsing experience, serve personalized content, 
              and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
            </p>
          </div>
        </div>
        
        <div className="cookie-consent-actions">
          <button 
            className="cookie-btn cookie-btn-secondary"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide Details' : 'Customize'}
          </button>
          <button 
            className="cookie-btn cookie-btn-secondary"
            onClick={handleRejectAll}
          >
            Reject All
          </button>
          <button 
            className="cookie-btn cookie-btn-primary"
            onClick={handleAcceptAll}
          >
            Accept All
          </button>
        </div>

        {showDetails && (
          <div className="cookie-details">
            <h4>Cookie Preferences</h4>
            <div className="cookie-categories">
              <div className="cookie-category">
                <div className="cookie-category-header">
                  <h5>Necessary Cookies</h5>
                  <div className="cookie-toggle disabled">
                    <input 
                      type="checkbox" 
                      checked={consent.necessary} 
                      disabled
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>
                <p>Essential for the website to function properly. Cannot be disabled.</p>
              </div>

              <div className="cookie-category">
                <div className="cookie-category-header">
                  <h5>Analytics Cookies</h5>
                  <div className="cookie-toggle">
                    <input 
                      type="checkbox" 
                      checked={consent.analytics}
                      onChange={() => handleToggleCategory('analytics')}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>
                <p>Help us understand how visitors interact with our website.</p>
              </div>

              <div className="cookie-category">
                <div className="cookie-category-header">
                  <h5>Marketing Cookies</h5>
                  <div className="cookie-toggle">
                    <input 
                      type="checkbox" 
                      checked={consent.marketing}
                      onChange={() => handleToggleCategory('marketing')}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>
                <p>Used to track visitors across websites for advertising purposes.</p>
              </div>

              <div className="cookie-category">
                <div className="cookie-category-header">
                  <h5>Preference Cookies</h5>
                  <div className="cookie-toggle">
                    <input 
                      type="checkbox" 
                      checked={consent.preferences}
                      onChange={() => handleToggleCategory('preferences')}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>
                <p>Remember your choices and preferences for a better experience.</p>
              </div>
            </div>

            <div className="cookie-details-actions">
              <button 
                className="cookie-btn cookie-btn-primary"
                onClick={handleAcceptSelected}
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
