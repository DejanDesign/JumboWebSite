import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { useBusiness } from '../contexts/BusinessContext';
import './Contact.css';

// ========================================
// CONTACT COMPONENT - JUMBO CONVENIENCE STORE
// ========================================
// This component displays contact information with:
// - Enhanced scroll-triggered animations
// - Staggered card animations
// - Interactive map integration
// - Responsive grid layout
// ========================================

const Contact = () => {
  const { businessData, loading } = useBusiness();
  
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

  // Get address from Google Business or use fallback
  const getAddress = () => {
    if (loading) {
      return 'Triq Il-Qolla Is-Safra<br />Iż-Żebbuġ, Gozo';
    }
    
    if (businessData?.businessInfo?.address) {
      // Format the address for display
      const address = businessData.businessInfo.address;
      // Split address into lines for better display
      const addressLines = address.split(', ');
      if (addressLines.length >= 2) {
        return `${addressLines[0]}<br />${addressLines.slice(1).join(', ')}`;
      }
      return address;
    }
    
    return 'Triq Il-Qolla Is-Safra<br />Iż-Żebbuġ, Gozo';
  };

  // Handle contact email with pre-filled template
  const handleContactEmail = () => {
    const subject = 'Inquiry - Jumbo Convenience Store';
    const body = `Dear Jumbo Convenience Store Team,

I hope this email finds you well. I am writing to inquire about your services and would like to get in touch with you.

Please find my details below:

Name: [Your Full Name]
Email: [Your Email Address]
Phone: [Your Phone Number]
Subject: [Your Inquiry Subject]

Message:
[Please describe your inquiry, question, or how we can help you]

I look forward to hearing from you soon.

Best regards,
[Your Name]`;
    
    // Detect if we're on mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // For mobile, use mailto directly as it works better
      const mailtoLink = `mailto:support@jumbo-convenience.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Create a temporary link element and click it
      const link = document.createElement('a');
      link.href = mailtoLink;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // For desktop, try Gmail first, fallback to mailto
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=support@jumbo-convenience.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const mailtoLink = `mailto:support@jumbo-convenience.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      try {
        window.open(gmailUrl, '_blank');
      } catch (error) {
        window.open(mailtoLink);
      }
    }
  };

  const contactInfo = [
    {
      icon: '📍',
      label: 'Location',
      info: getAddress(),
      action: scrollToMap,
      isClickable: true
    },
    {
      icon: '📧',
      label: 'Email',
      info: 'support@jumbo-convenience.com',
      action: handleContactEmail,
      isClickable: true
    },
    {
      icon: '📱',
      label: 'Phone',
      info: getPhoneNumber(),
      action: () => {
        const phoneNumber = getPhoneNumber().replace(/\s/g, '');
        window.open(`tel:${phoneNumber}`);
      },
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
      action: () => window.open('https://www.facebook.com/profile.php?id=61551407631705', '_blank'),
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
      action: () => window.open('https://www.tiktok.com/@jumbo0693?_t=ZN-90iPZVyWSIg&_r=1', '_blank'),
      isClickable: true
    }
  ];

  const titleRef = useScrollAnimation({ 
    animationType: 'fadeInUp', 
    delay: 0.2,
    duration: 0.8 
  });

  const socialTitleRef = useScrollAnimation({ 
    animationType: 'fadeInUp', 
    delay: 0.4,
    duration: 0.8 
  });

  return (
    <section className="contact" id="contact">
      <div className="container">
        <h2 ref={titleRef} className="section-title">Get In Touch</h2>
        <div className="contact-grid">
          {contactInfo.map((contact, index) => {
            const cardRef = useScrollAnimation({ 
              animationType: 'fadeInUp', 
              delay: 0.1,
              duration: 0.6,
              stagger: 0.15
            });
            
            return (
              <div 
                key={index} 
                ref={cardRef}
                className={`contact-card ${contact.isClickable ? 'clickable' : ''}`}
                onClick={contact.action}
                style={{ cursor: contact.isClickable ? 'pointer' : 'default' }}
              >
                <div className="contact-icon">{contact.icon}</div>
                <h3 className="contact-title">{contact.label}</h3>
                <div className="contact-info" dangerouslySetInnerHTML={{ __html: contact.info }}></div>
              </div>
            );
          })}
        </div>
        
        <div className="social-section">
          <h3 ref={socialTitleRef} className="social-title">Follow Us</h3>
          <div className="social-grid">
            {socialMedia.map((social, index) => {
              const socialCardRef = useScrollAnimation({ 
                animationType: 'scaleIn', 
                delay: 0.1,
                duration: 0.6,
                stagger: 0.2
              });
              
              return (
                <div 
                  key={index} 
                  ref={socialCardRef}
                  className={`social-card ${social.isClickable ? 'clickable' : ''}`}
                  onClick={social.action}
                  style={{ cursor: social.isClickable ? 'pointer' : 'default' }}
                >
                  <div className="social-icon">{social.icon}</div>
                  <h4 className="social-label">{social.label}</h4>
                  <div className="social-info">{social.info}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;




