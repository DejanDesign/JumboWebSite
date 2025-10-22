// ========================================
// GOOGLE MAPS LOADER UTILITY
// ========================================
// This utility handles on-demand loading of Google Maps API
// to reduce initial bundle size and improve PageSpeed scores
// ========================================

let isGoogleMapsLoaded = false;
let isGoogleMapsLoading = false;
let loadPromise = null;

/**
 * Load Google Maps API on demand
 * @param {string} apiKey - Google Maps API key
 * @param {Array} libraries - Array of libraries to load (e.g., ['places'])
 * @returns {Promise} Promise that resolves when Google Maps is loaded
 */
export const loadGoogleMaps = (apiKey = 'AIzaSyDcbkothKmoFZVqDYvreRi2WGwpu68IEys', libraries = ['places']) => {
  // Return existing promise if already loading
  if (loadPromise) {
    return loadPromise;
  }

  // Return resolved promise if already loaded
  if (isGoogleMapsLoaded && window.google && window.google.maps) {
    return Promise.resolve();
  }

  // Check if script is already in DOM
  const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
  if (existingScript) {
    loadPromise = new Promise((resolve, reject) => {
      const checkGoogleMaps = () => {
        if (window.google && window.google.maps) {
          isGoogleMapsLoaded = true;
          resolve();
        } else {
          setTimeout(checkGoogleMaps, 100);
        }
      };
      checkGoogleMaps();
    });
    return loadPromise;
  }

  // Create new script element
  loadPromise = new Promise((resolve, reject) => {
    if (isGoogleMapsLoading) {
      return;
    }

    isGoogleMapsLoading = true;
    
    const script = document.createElement('script');
    const librariesParam = libraries.length > 0 ? `&libraries=${libraries.join(',')}` : '';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}${librariesParam}&callback=initGoogleMapsCallback`;
    script.async = true;
    script.defer = true;
    
    // Set up global callback
    window.initGoogleMapsCallback = () => {
      console.log('✅ Google Maps API loaded successfully');
      isGoogleMapsLoaded = true;
      isGoogleMapsLoading = false;
      resolve();
      // Clean up global callback
      delete window.initGoogleMapsCallback;
    };
    
    script.onerror = (error) => {
      console.error('❌ Failed to load Google Maps API:', error);
      isGoogleMapsLoading = false;
      reject(error);
      // Clean up global callback
      delete window.initGoogleMapsCallback;
    };
    
    document.head.appendChild(script);
  });

  return loadPromise;
};

/**
 * Check if Google Maps is already loaded
 * @returns {boolean} True if Google Maps is loaded and ready
 */
export const isGoogleMapsReady = () => {
  return isGoogleMapsLoaded && window.google && window.google.maps;
};

/**
 * Reset the loading state (useful for testing)
 */
export const resetGoogleMapsLoader = () => {
  isGoogleMapsLoaded = false;
  isGoogleMapsLoading = false;
  loadPromise = null;
};
