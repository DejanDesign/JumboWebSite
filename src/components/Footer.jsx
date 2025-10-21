import React from 'react';
import { Link } from 'react-router-dom';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { useBusiness } from '../contexts/BusinessContext';
import './Footer.css';

// ========================================
// FOOTER COMPONENT - JUMBO CONVENIENCE STORE
// ========================================
// This component displays the footer with:
// - Job application form
// - Contact information
// - Privacy policy and legal links
// - Social media links
// - Family branding
// ========================================

const Footer = () => {
  const { businessData, loading } = useBusiness();

  const footerRef = useScrollAnimation({ 
    animationType: 'fadeInUp', 
    delay: 0.2,
    duration: 0.8 
  });

  // Get phone number from Google Business or use fallback
  const getPhoneNumber = () => {
    if (loading) {
      return '+356 7706 5767';
    }
    
    if (businessData?.businessInfo?.phone) {
      return businessData.businessInfo.phone;
    }
    
    return '+356 7706 5767';
  };

  const handleJobApplication = () => {
    const subject = 'Job Application - Jumbo Convenience Store';
    const body = `Dear Jumbo Convenience Store Team,

I am writing to express my interest in employment opportunities at your convenience store.

Please find my application details below:

Name: [Your Full Name]
Email: [Your Email Address]
Phone: [Your Phone Number]
Position of Interest: [Sales Assistant/Cashier/Stock Assistant/Other]
Experience Level: [No Experience/1-2 years/3-5 years/5+ years]

Cover Letter:
[Please tell us about yourself and why you'd like to work at Jumbo Convenience Store]

IMPORTANT: Please attach your CV/Resume to this email as it is required for your application to be considered.

I look forward to hearing from you.

Best regards,
[Your Name]`;
    
    // Try to open Gmail directly, fallback to mailto
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=jobs@jumbo-convenience.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const mailtoLink = `mailto:jobs@jumbo-convenience.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Try Gmail first, then fallback to mailto
    const gmailWindow = window.open(gmailUrl, '_blank');
    if (!gmailWindow) {
      window.location.href = mailtoLink;
    }
  };

  return (
    <footer className="footer">
      <div ref={footerRef} className="footer-content">
        <div className="footer-main">
          {/* Company Info */}
          <div className="footer-section">
            <h3>Jumbo Convenience Store</h3>
            <p>Your family-run convenience store in Marsalforn, Gozo. Serving the community with quality products and personal service.</p>
            <div className="contact-info">
              <p>📍 Triq Il-Qolla Is-Safra, Iż-Żebbuġ, Gozo</p>
              <p>📞 {getPhoneNumber()}</p>
              <p>📧 support@jumbo-convenience.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Job Opportunities */}
          <div className="footer-section">
            <h3>Join Our Team</h3>
            <p>We're always looking for friendly, hardworking people to join our family business.</p>
            <button 
              className="job-apply-btn"
              onClick={handleJobApplication}
            >
              Apply for a Job
            </button>
          </div>

          {/* Legal & Privacy */}
          <div className="footer-section">
            <h3>Legal</h3>
            <ul>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service">Terms of Service</Link></li>
              <li><Link to="/cookie-policy">Cookie Policy</Link></li>
              <li><Link to="/accessibility">Accessibility</Link></li>
            </ul>
          </div>
        </div>


        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2025 Jumbo Convenience Store. Built with ❤️ by the Djukic Family.</p>
            <div className="social-links">
              <a href="https://www.facebook.com/profile.php?id=61551407631705" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://www.tiktok.com/@jumbo0693?_t=ZN-90iPZVyWSIg&_r=1" target="_blank" rel="noopener noreferrer">TikTok</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;




