import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import StatusIndicator from './StatusIndicator';
import './Navigation.css';

// ========================================
// NAVIGATION COMPONENT - JUMBO CONVENIENCE STORE
// ========================================
// This component handles the main navigation with:
// - Fixed header with backdrop blur effect
// - Mobile-responsive hamburger menu
// - Smooth scroll navigation
// - WordPress blog integration via React Router
// ========================================

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close mobile dropdown when opening/closing mobile menu
    setIsMobileDropdownOpen(false);
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileDropdown = (e) => {
    e.stopPropagation();
    setIsMobileDropdownOpen(!isMobileDropdownOpen);
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
    setIsMobileDropdownOpen(false);
  };

  const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    if (targetId && targetId.startsWith('#')) {
      // If we're not on the home page, navigate to home with the section
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation to complete, then scroll to section
        setTimeout(() => {
          const element = document.querySelector(targetId);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 100);
        return;
      }
      
      const element = document.querySelector(targetId);
      if (element) {
        // Scroll to top first, then to the element
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={closeMenus}>
          <img 
            src="/logo/Jumbo Logo.webp" 
            alt="Jumbo Convenience Store Logo" 
            className="logo-image"
            onError={(e) => {
              // Fallback to text logo if image fails to load
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <span className="logo-text">JUMBO</span>
        </Link>
        
        <StatusIndicator />
        
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="#home" className="nav-link" onClick={handleNavClick}>Home</a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-link" onClick={handleNavClick}>About</a>
          </li>
          <li className="nav-item">
            <a href="#features" className="nav-link" onClick={handleNavClick}>Features</a>
          </li>
          <li className="nav-item dropdown-parent" ref={dropdownRef}>
            <span 
              className="nav-link" 
              onClick={toggleDropdown}
              style={{ cursor: 'pointer' }}
            >
              More
              <span className={`dropdown-arrow ${isDropdownOpen ? 'rotate' : ''}`}>▼</span>
            </span>
            <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
              <a href="#hours" className="dropdown-item" onClick={(e) => { handleNavClick(e); closeMenus(); }}>Opening Hours</a>
              <a href="#contact" className="dropdown-item" onClick={(e) => { handleNavClick(e); closeMenus(); }}>Contact</a>
              <Link to="/blog" className="dropdown-item" onClick={closeMenus}>Blog</Link>
            </div>
          </li>
        </ul>

        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
        >
          <div className="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'show' : ''}`}>
        <div className="mobile-menu-item">
          <a href="#home" onClick={(e) => { handleNavClick(e); closeMenus(); }}>Home</a>
        </div>
        <div className="mobile-menu-item">
          <a href="#about" onClick={(e) => { handleNavClick(e); closeMenus(); }}>About</a>
        </div>
        <div className="mobile-menu-item">
          <a href="#features" onClick={(e) => { handleNavClick(e); closeMenus(); }}>Features</a>
        </div>
        <div className="mobile-menu-item">
          <div 
            className="mobile-dropdown-toggle"
            onClick={toggleMobileDropdown}
          >
            More
            <span className={`mobile-dropdown-arrow ${isMobileDropdownOpen ? 'rotate' : ''}`}>▼</span>
          </div>
          <div className={`mobile-dropdown-items ${isMobileDropdownOpen ? 'show' : ''}`}>
            <a href="#hours" onClick={(e) => { handleNavClick(e); closeMenus(); }}>Opening Hours</a>
            <a href="#contact" onClick={(e) => { handleNavClick(e); closeMenus(); }}>Contact</a>
            <Link to="/blog" onClick={closeMenus}>Blog</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
