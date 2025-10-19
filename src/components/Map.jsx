import React, { useEffect, useRef, useState } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './Map.css';

// ========================================
// MAP COMPONENT - JUMBO CONVENIENCE STORE
// ========================================
// This component displays the store location with:
// - Interactive Google Maps integration
// - Creative design with custom styling
// - Location information and directions
// - Responsive design for all devices
// ========================================

const MapComponent = () => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const isInitializing = useRef(false);
  const [mapLoading, setMapLoading] = useState(true);

  // Scroll animation refs
  const titleRef = useScrollAnimation({ 
    animationType: 'fadeInUp', 
    delay: 0.2,
    duration: 0.8 
  });
  
  const mapWrapperRef = useScrollAnimation({ 
    animationType: 'fadeInUp', 
    delay: 0.4,
    duration: 0.8 
  });
  
  const locationCardRef = useScrollAnimation({ 
    animationType: 'fadeInLeft', 
    delay: 0.6,
    duration: 0.8 
  });

  useEffect(() => {
    let mapTimeout;

    // Set a timeout to show fallback if map doesn't load
    mapTimeout = setTimeout(() => {
      if (mapLoading) {
        console.warn('Map loading timeout. Showing fallback.');
        setMapLoading(false);
        showFallbackMap();
      }
    }, 20000); // 20 second timeout

    const showFallbackMap = () => {
      if (!mapRef.current) return;
      setMapLoading(false);
      
      // Add loaded class to map container
      mapRef.current.classList.add('map-loaded');
      
      mapRef.current.innerHTML = `
        <div style="
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #4A55A2 0%, #3A4592 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        ">
          <!-- Animated background pattern -->
          <div style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
              radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(255,255,255,0.1) 0%, transparent 50%);
            animation: float 6s ease-in-out infinite;
          "></div>
          
          <div style="position: relative; z-index: 2;">
            <div style="font-size: 4rem; margin-bottom: 1.5rem; animation: bounce 2s ease-in-out infinite;">🗺️</div>
            <h3 style="margin: 0 0 1rem 0; font-size: 1.8rem; font-weight: 700;">Jumbo Convenience Store</h3>
            <p style="margin: 0 0 2rem 0; opacity: 0.9; font-size: 1.1rem;">Triq Il-Qolla Is-Safra<br />Marsalforn, Iż-Żebbuġ, Gozo, Malta</p>
            
            <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=36.0721098,14.2554454" 
                target="_blank" 
                style="
                  background: white;
                  color: #4A55A2;
                  padding: 1rem 2rem;
                  border-radius: 25px;
                  text-decoration: none;
                  font-weight: 600;
                  transition: all 0.3s ease;
                  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                "
                onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 6px 20px rgba(0,0,0,0.3)'"
                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.2)'"
              >
                📍 Get Directions
              </a>
              <a 
                href="tel:+35677065767" 
                style="
                  background: rgba(255,255,255,0.2);
                  color: white;
                  padding: 1rem 2rem;
                  border-radius: 25px;
                  text-decoration: none;
                  font-weight: 600;
                  transition: all 0.3s ease;
                  border: 2px solid rgba(255,255,255,0.3);
                "
                onmouseover="this.style.background='rgba(255,255,255,0.3)'; this.style.transform='translateY(-3px)'"
                onmouseout="this.style.background='rgba(255,255,255,0.2)'; this.style.transform='translateY(0)'"
              >
                📞 Call Us
              </a>
            </div>
            
            <p style="margin: 1.5rem 0 0 0; opacity: 0.7; font-size: 0.9rem;">
              Click "Get Directions" to open in Google Maps
            </p>
          </div>
          
          <style>
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
              40% { transform: translateY(-10px); }
              60% { transform: translateY(-5px); }
            }
          </style>
        </div>
      `;
    };

    const initializeMap = () => {
      console.log('🗺️ [Map] initializeMap called');
      console.log('   mapRef.current:', !!mapRef.current);
      console.log('   mapInstanceRef.current:', !!mapInstanceRef.current);
      console.log('   isInitializing.current:', isInitializing.current);
      console.log('   window.google:', !!window.google);
      console.log('   window.google.maps:', !!(window.google && window.google.maps));
      console.log('   window.google.maps.Map:', !!(window.google && window.google.maps && window.google.maps.Map));
      
      if (!mapRef.current) {
        console.log('❌ [Map] mapRef.current is null, cannot initialize');
        return;
      }
      
      if (mapInstanceRef.current) {
        console.log('❌ [Map] Map already initialized, skipping');
        return;
      }
      
      if (isInitializing.current) {
        console.log('❌ [Map] Already initializing, skipping');
        return;
      }
      
      // Check if Google Maps is properly loaded
      if (!window.google || !window.google.maps || !window.google.maps.Map) {
        console.error('❌ [Map] Google Maps API not properly loaded. Available:', {
          google: !!window.google,
          maps: !!(window.google && window.google.maps),
          Map: !!(window.google && window.google.maps && window.google.maps.Map)
        });
        showFallbackMap();
        return;
      }
      
      isInitializing.current = true;
      console.log('✅ [Map] Initializing Google Maps...');
      
      // Ensure map container has proper dimensions
      if (mapRef.current.offsetWidth === 0 || mapRef.current.offsetHeight === 0) {
        console.warn('⚠️ [Map] Map container has no dimensions, waiting...');
        setTimeout(() => {
          isInitializing.current = false;
          initializeMap();
        }, 100);
        return;
      }
      
      console.log('📏 [Map] Map container dimensions:', {
        width: mapRef.current.offsetWidth,
        height: mapRef.current.offsetHeight
      });
      
      try {
        const mapOptions = {
          zoom: 18,
          center: { lat: 36.0721098, lng: 14.2554454 }, // Exact Jumbo Convenience Store coordinates from Google Maps
          mapTypeId: window.google.maps.MapTypeId.SATELLITE,
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: window.google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: window.google.maps.ControlPosition.TOP_LEFT,
          },
          streetViewControl: true,
          streetViewControlOptions: {
            position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
          },
          fullscreenControl: true,
          fullscreenControlOptions: {
            position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
          },
          zoomControl: true,
          zoomControlOptions: {
            position: window.google.maps.ControlPosition.RIGHT_CENTER,
          },
          styles: [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#f5f5f5"
                }
              ]
            },
            {
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#f5f5f5"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#bdbdbd"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#eeeeee"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e5e5e5"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#ffffff"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dadada"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e5e5e5"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#eeeeee"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#c9c9c9"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            }
          ]
        };

        // Create map instance
        console.log('🗺️ [Map] Creating map instance...');
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, mapOptions);
        console.log('✅ [Map] Map instance created successfully');

        // Add custom marker with better design
        const marker = new window.google.maps.Marker({
          position: { lat: 36.0721098, lng: 14.2554454 }, // Exact Jumbo Convenience Store coordinates from Google Maps
          map: mapInstanceRef.current,
          title: 'Jumbo is here',
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="60" height="80" viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
                <!-- Shadow -->
                <ellipse cx="30" cy="75" rx="12" ry="4" fill="rgba(0,0,0,0.2)"/>
                
                <!-- Marker body -->
                <path d="M30 5 C45 5 55 15 55 30 C55 45 30 70 30 70 C30 70 5 45 5 30 C5 15 15 5 30 5 Z" 
                      fill="#4A55A2" stroke="#FFFFFF" stroke-width="3"/>
                
                <!-- Inner circle -->
                <circle cx="30" cy="30" r="15" fill="#FFFFFF" opacity="0.9"/>
                
                <!-- Store icon -->
                <g transform="translate(20, 20)">
                  <rect x="2" y="8" width="16" height="12" fill="#4A55A2" rx="1"/>
                  <rect x="4" y="6" width="12" height="2" fill="#4A55A2" rx="1"/>
                  <rect x="6" y="4" width="8" height="2" fill="#4A55A2" rx="1"/>
                  <rect x="8" y="2" width="4" height="2" fill="#4A55A2" rx="1"/>
                  <circle cx="6" cy="12" r="1" fill="#FFFFFF"/>
                  <circle cx="10" cy="12" r="1" fill="#FFFFFF"/>
                  <circle cx="14" cy="12" r="1" fill="#FFFFFF"/>
                </g>
                
                <!-- Pulse animation ring -->
                <circle cx="30" cy="30" r="20" fill="none" stroke="#4A55A2" stroke-width="2" opacity="0.3">
                  <animate attributeName="r" values="20;35;20" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite"/>
                </circle>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(60, 80),
            anchor: new window.google.maps.Point(30, 80)
          },
          animation: window.google.maps.Animation.DROP
        });

        // Add simple info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="
              padding: 12px 16px;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              text-align: center;
              background: #4A55A2;
              color: white;
              border-radius: 8px;
              font-weight: 600;
              font-size: 14px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            ">
              🏪 Jumbo is here
            </div>
          `,
          maxWidth: 150,
          pixelOffset: new window.google.maps.Size(0, -10)
        });

        // Add click listener for marker
        marker.addListener('click', () => {
          infoWindow.open(mapInstanceRef.current, marker);
        });

        // Add hover effects
        marker.addListener('mouseover', () => {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(() => {
            marker.setAnimation(null);
          }, 750);
        });

        // Open info window by default with a slight delay for better UX
        setTimeout(() => {
          infoWindow.open(mapInstanceRef.current, marker);
        }, 500);

        // Add map click listener to close info window
        mapInstanceRef.current.addListener('click', () => {
          infoWindow.close();
        });
        
        // Add loaded class to map container
        if (mapRef.current) {
          mapRef.current.classList.add('map-loaded');
        }
        
        console.log('✅ [Map] Google Maps initialized successfully!');
        console.log('   Map instance:', !!mapInstanceRef.current);
        console.log('   Map container classes:', mapRef.current?.className);
        setMapLoading(false);
        isInitializing.current = false;
      } catch (error) {
        console.error('Error initializing map:', error);
        isInitializing.current = false;
        setMapLoading(false);
        
        // Check if it's a billing error
        if (error.message && error.message.includes('BillingNotEnabled')) {
          console.warn('Google Maps billing not enabled. Using enhanced fallback map.');
        }
        
        showFallbackMap();
      }
    };

    // Load Google Maps API
    const loadGoogleMaps = () => {
      console.log('🗺️ [Map] Starting map loading process...');
      
      // Check if Google Maps is already loaded and ready
      if (window.google && window.google.maps && window.google.maps.Map) {
        console.log('✅ [Map] Google Maps already loaded, initializing...');
        clearTimeout(mapTimeout);
        initializeMap();
        return;
      }

      // Check if script is already being loaded
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
      if (existingScript) {
        console.log('📡 [Map] Google Maps script already exists, waiting for it to load...');
        // Wait for existing script to load
        const checkGoogleMaps = () => {
          if (window.google && window.google.maps && window.google.maps.Map) {
            console.log('✅ [Map] Google Maps ready, initializing...');
            clearTimeout(mapTimeout);
            initializeMap();
          } else {
            setTimeout(checkGoogleMaps, 100);
          }
        };
        checkGoogleMaps();
        return;
      }

      console.log('📡 [Map] Loading Google Maps API...');
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDcbkothKmoFZVqDYvreRi2WGwpu68IEys&libraries=places&callback=initGoogleMap`;
      script.async = true;
      script.defer = true;
      
      // Set up global callback
      window.initGoogleMap = () => {
        console.log('✅ [Map] Google Maps API loaded via callback');
        clearTimeout(mapTimeout);
        if (window.google && window.google.maps && window.google.maps.Map) {
          console.log('✅ [Map] Google Maps ready, initializing...');
          initializeMap();
        } else {
          console.warn('❌ [Map] Google Maps API loaded but not ready. Using fallback map.');
          showFallbackMap();
        }
        // Clean up global callback
        delete window.initGoogleMap;
      };
      
      script.onerror = (error) => {
        console.error('❌ [Map] Google Maps API failed to load:', error);
        clearTimeout(mapTimeout);
        console.warn('Using fallback map.');
        showFallbackMap();
        // Clean up global callback
        delete window.initGoogleMap;
      };
      
      document.head.appendChild(script);
    };

    loadGoogleMaps();

    return () => {
      // Clear timeout
      clearTimeout(mapTimeout);
      
      // Clean up global callback
      if (window.initGoogleMap) {
        delete window.initGoogleMap;
      }
      
      // Clean up map instance
      if (mapInstanceRef.current) {
        // Clear all markers and info windows
        if (window.google && window.google.maps) {
          // Clear any existing markers or overlays
          const map = mapInstanceRef.current;
          if (map.overlayMapTypes) {
            map.overlayMapTypes.clear();
          }
        }
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section className="map-section" id="map">
      <div className="container">
        <h2 ref={titleRef} className="section-title">Find Us</h2>
        <div ref={mapWrapperRef} className="map-wrapper">
          <div className="map-container">
            {mapLoading && (
              <div className="map-loading">
                <div className="loading-spinner"></div>
                <p>Loading map...</p>
              </div>
            )}
            <div ref={mapRef} className="google-map"></div>
          </div>
          <div className="map-info">
            <div ref={locationCardRef} className="location-card">
              <div className="location-icon">📍</div>
              <div className="location-details">
                <h3>Jumbo Convenience Store</h3>
                <p>Triq Il-Qolla Is-Safra<br />Marsalforn, Iż-Żebbuġ, Gozo, Malta</p>
                <div className="location-actions">
                  <a 
                    href="https://www.google.com/maps/dir/?api=1&destination=36.0721098,14.2554454" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Get Directions
                  </a>
                  <a 
                    href="tel:+35677065767" 
                    className="btn btn-secondary"
                  >
                    Call Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapComponent;