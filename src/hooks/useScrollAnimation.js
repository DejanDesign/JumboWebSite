import { useEffect, useRef } from 'react';

// ========================================
// ENHANCED SCROLL ANIMATION HOOK - JUMBO CONVENIENCE STORE
// ========================================
// This custom hook handles scroll-triggered animations:
// - Intersection Observer API for performance
// - Multiple animation types (fade, slide, scale, stagger)
// - Staggered animations for multiple elements
// - Configurable threshold and root margin
// ========================================

const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    animationType = 'fadeInUp',
    delay = 0,
    duration = 0.6,
    stagger = 0
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial animation state
    element.style.opacity = '0';
    element.style.transform = getInitialTransform(animationType);
    element.style.transition = `all ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`;

    const observerOptions = {
      threshold,
      rootMargin
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add stagger delay for multiple elements
          const staggerDelay = stagger * Array.from(entry.target.parentNode?.children || []).indexOf(entry.target);
          const totalDelay = delay + staggerDelay;
          
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) translateX(0) scale(1)';
            entry.target.classList.add('visible');
          }, totalDelay * 1000);
        }
      });
    }, observerOptions);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, animationType, delay, duration, stagger]);

  return elementRef;
};

// Helper function to get initial transform based on animation type
const getInitialTransform = (animationType) => {
  switch (animationType) {
    case 'fadeInUp':
      return 'translateY(30px)';
    case 'fadeInDown':
      return 'translateY(-30px)';
    case 'fadeInLeft':
      return 'translateX(-30px)';
    case 'fadeInRight':
      return 'translateX(30px)';
    case 'scaleIn':
      return 'scale(0.8)';
    case 'slideInUp':
      return 'translateY(50px)';
    case 'slideInDown':
      return 'translateY(-50px)';
    case 'slideInLeft':
      return 'translateX(-50px)';
    case 'slideInRight':
      return 'translateX(50px)';
    default:
      return 'translateY(30px)';
  }
};

export default useScrollAnimation;







