import { useEffect, useRef } from 'react';

// ========================================
// SCROLL ANIMATION HOOK - JUMBO CONVENIENCE STORE
// ========================================
// This custom hook handles scroll-triggered animations:
// - Intersection Observer API for performance
// - Fade-in animations for elements
// - Configurable threshold and root margin
// ========================================

const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    animationClass = 'visible'
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observerOptions = {
      threshold,
      rootMargin
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animationClass);
        }
      });
    }, observerOptions);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, animationClass]);

  return elementRef;
};

export default useScrollAnimation;







