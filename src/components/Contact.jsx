import React from 'react';
import './Contact.css';

// ========================================
// CONTACT COMPONENT - JUMBO CONVENIENCE STORE
// ========================================
// This component displays contact information with:
// - Animated contact cards with hover effects
// - Interactive map integration
// - Responsive grid layout
// - Scroll-triggered animations
// ========================================

const Contact = () => {
  // Function to scroll to map section
  const scrollToMap = () => {
    const mapSection = document.getElementById('map');
    if (mapSection) {
      mapSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const contactInfo = [
    {
      icon: '📍',
      label: 'Location',
      info: 'Triq Il-Qolla Is-Safra<br />Iż-Żebbuġ, Gozo',
      action: scrollToMap,
      isClickable: true
    },
    {
      icon: '📧',
      label: 'Email',
      info: 'support@jumbo-convenience.com',
      action: () => window.open('mailto:support@jumbo-convenience.com'),
      isClickable: true
    },
    {
      icon: '📱',
      label: 'Phone',
      info: '+356 7706 5767',
      action: () => window.open('tel:+35677065767'),
      isClickable: true
    }
  ];

  const socialMedia = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      label: 'Facebook',
      info: 'Follow us on Facebook',
      action: () => window.open('https://facebook.com/jumboconvenience', '_blank'),
      isClickable: true
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
      label: 'TikTok',
      info: 'Follow us on TikTok',
      action: () => window.open('https://tiktok.com/@jumboconvenience', '_blank'),
      isClickable: true
    }
  ];

  return (
    <section className="contact" id="contact">
      <div className="container">
        <h2 className="section-title fade-in">Get In Touch</h2>
        <div className="contact-grid">
          {contactInfo.map((contact, index) => (
            <div 
              key={index} 
              className={`contact-card fade-in ${contact.isClickable ? 'clickable' : ''}`}
              onClick={contact.action}
              style={{ cursor: contact.isClickable ? 'pointer' : 'default' }}
            >
              <div className="contact-icon">{contact.icon}</div>
              <h3 className="contact-title">{contact.label}</h3>
              <div className="contact-info" dangerouslySetInnerHTML={{ __html: contact.info }}></div>
            </div>
          ))}
        </div>
        
        <div className="social-section">
          <h3 className="social-title fade-in">Follow Us</h3>
          <div className="social-grid">
            {socialMedia.map((social, index) => (
              <div 
                key={index} 
                className={`social-card fade-in ${social.isClickable ? 'clickable' : ''}`}
                onClick={social.action}
                style={{ cursor: social.isClickable ? 'pointer' : 'default' }}
              >
                <div className="social-icon">{social.icon}</div>
                <h4 className="social-label">{social.label}</h4>
                <div className="social-info">{social.info}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;




