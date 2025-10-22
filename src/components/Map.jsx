import React, { useEffect, useRef, useState, useCallback } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { useBusiness } from '../contexts/BusinessContext';
import { loadGoogleMaps, isGoogleMapsReady } from '../utils/loadGoogleMaps';
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
  const { businessData, loading } = useBusiness();
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

  // Get business name from Google Business or use fallback
  const getBusinessName = () => {
    if (loading) {
      return 'Jumbo Convenience Store';
    }
    
    if (businessData?.businessInfo?.name) {
      return businessData.businessInfo.name;
    }
    
    return 'Jumbo Convenience Store';
  };

  // Get address from Google Business or use fallback
  const getAddress = () => {
    if (loading) {
      return 'Triq Il-Qolla Is-Safra<br />Marsalforn, Iż-Żebbuġ, Gozo, Malta';
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
    
    return 'Triq Il-Qolla Is-Safra<br />Marsalforn, Iż-Żebbuġ, Gozo, Malta';
  };

  // Get phone number from Google Business or use fallback
  const getPhoneNumber = () => {
    if (loading) {
      return '+35677065767';
    }
    
    if (businessData?.businessInfo?.phone) {
      return businessData.businessInfo.phone.replace(/\s/g, '');
    }
    
    return '+35677065767';
  };

  const showFallbackMap = useCallback(() => {
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
  }, []);

  useEffect(() => {
    let mapTimeout;
    let handleResize;

    // Set a timeout to show fallback if map doesn't load
    mapTimeout = setTimeout(() => {
      if (mapLoading) {
        console.warn('Map loading timeout. Showing fallback.');
        setMapLoading(false);
        showFallbackMap();
      }
    }, 20000); // 20 second timeout

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

        // Detect if mobile device
        const isMobile = window.innerWidth <= 768;
        const markerSize = isMobile ? 40 : 60;
        const markerHeight = isMobile ? 55 : 80;
        
        // Add custom marker with responsive design
        const marker = new window.google.maps.Marker({
          position: { lat: 36.0721098, lng: 14.2554454 }, // Exact Jumbo Convenience Store coordinates from Google Maps
          map: mapInstanceRef.current,
          title: 'Jumbo',
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg width="${markerSize}" height="${markerHeight}" viewBox="0 0 ${markerSize} ${markerHeight}" xmlns="http://www.w3.org/2000/svg">
                <!-- Shadow -->
                <ellipse cx="${markerSize/2}" cy="${markerHeight-5}" rx="${markerSize/5}" ry="3" fill="rgba(0,0,0,0.2)"/>
                
                <!-- Marker body -->
                <path d="M${markerSize/2} 5 C${markerSize*0.75} 5 ${markerSize-5} ${markerSize/4} ${markerSize-5} ${markerSize/2} C${markerSize-5} ${markerSize*0.75} ${markerSize/2} ${markerHeight-10} ${markerSize/2} ${markerHeight-10} C${markerSize/2} ${markerHeight-10} 5 ${markerSize*0.75} 5 ${markerSize/2} C5 ${markerSize/4} ${markerSize/4} 5 ${markerSize/2} 5 Z" 
                      fill="#4A55A2" stroke="#FFFFFF" stroke-width="2"/>
                
                <!-- Inner circle -->
                <circle cx="${markerSize/2}" cy="${markerSize/2}" r="${markerSize/4}" fill="#FFFFFF" opacity="0.9"/>
                
                <!-- Store icon -->
                <g transform="translate(${markerSize*0.33}, ${markerSize*0.33})">
                  <rect x="2" y="6" width="${markerSize*0.27}" height="${markerSize*0.2}" fill="#4A55A2" rx="1"/>
                  <rect x="3" y="4" width="${markerSize*0.2}" height="2" fill="#4A55A2" rx="1"/>
                  <rect x="4" y="2" width="${markerSize*0.13}" height="2" fill="#4A55A2" rx="1"/>
                  <rect x="5" y="1" width="${markerSize*0.07}" height="1" fill="#4A55A2" rx="1"/>
                  <circle cx="5" cy="8" r="0.8" fill="#FFFFFF"/>
                  <circle cx="8" cy="8" r="0.8" fill="#FFFFFF"/>
                  <circle cx="11" cy="8" r="0.8" fill="#FFFFFF"/>
                </g>
                
                <!-- Pulse animation ring -->
                <circle cx="${markerSize/2}" cy="${markerSize/2}" r="${markerSize/3}" fill="none" stroke="#4A55A2" stroke-width="1.5" opacity="0.3">
                  <animate attributeName="r" values="${markerSize/3};${markerSize/2};${markerSize/3}" dur="2s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite"/>
                </circle>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(markerSize, markerHeight),
            anchor: new window.google.maps.Point(markerSize/2, markerHeight)
          },
          animation: window.google.maps.Animation.DROP
        });

        // Add responsive info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="
              padding: ${isMobile ? '8px 12px' : '12px 16px'};
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              text-align: center;
              background: #4A55A2;
              color: white;
              border-radius: ${isMobile ? '6px' : '8px'};
              font-weight: 600;
              font-size: ${isMobile ? '12px' : '14px'};
              box-shadow: 0 4px 12px rgba(0,0,0,0.15);
              min-width: ${isMobile ? '60px' : '80px'};
              white-space: nowrap;
            ">
              🏪 Jumbo
            </div>
          `,
          maxWidth: isMobile ? 120 : 150,
          pixelOffset: new window.google.maps.Size(0, isMobile ? -5 : -10)
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

        // Add resize listener to update marker size on orientation change
        handleResize = () => {
          const newIsMobile = window.innerWidth <= 768;
          if (newIsMobile !== isMobile) {
            // Recreate marker with new size
            marker.setMap(null);
            const newMarkerSize = newIsMobile ? 40 : 60;
            const newMarkerHeight = newIsMobile ? 55 : 80;
            
            const newMarker = new window.google.maps.Marker({
              position: { lat: 36.0721098, lng: 14.2554454 },
              map: mapInstanceRef.current,
              title: 'Jumbo',
              icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                  <svg width="${newMarkerSize}" height="${newMarkerHeight}" viewBox="0 0 ${newMarkerSize} ${newMarkerHeight}" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="${newMarkerSize/2}" cy="${newMarkerHeight-5}" rx="${newMarkerSize/5}" ry="3" fill="rgba(0,0,0,0.2)"/>
                    <path d="M${newMarkerSize/2} 5 C${newMarkerSize*0.75} 5 ${newMarkerSize-5} ${newMarkerSize/4} ${newMarkerSize-5} ${newMarkerSize/2} C${newMarkerSize-5} ${newMarkerSize*0.75} ${newMarkerSize/2} ${newMarkerHeight-10} ${newMarkerSize/2} ${newMarkerHeight-10} C${newMarkerSize/2} ${newMarkerHeight-10} 5 ${newMarkerSize*0.75} 5 ${newMarkerSize/2} C5 ${newMarkerSize/4} ${newMarkerSize/4} 5 ${newMarkerSize/2} 5 Z" 
                          fill="#4A55A2" stroke="#FFFFFF" stroke-width="2"/>
                    <circle cx="${newMarkerSize/2}" cy="${newMarkerSize/2}" r="${newMarkerSize/4}" fill="#FFFFFF" opacity="0.9"/>
                    <g transform="translate(${newMarkerSize*0.33}, ${newMarkerSize*0.33})">
                      <rect x="2" y="6" width="${newMarkerSize*0.27}" height="${newMarkerSize*0.2}" fill="#4A55A2" rx="1"/>
                      <rect x="3" y="4" width="${newMarkerSize*0.2}" height="2" fill="#4A55A2" rx="1"/>
                      <rect x="4" y="2" width="${newMarkerSize*0.13}" height="2" fill="#4A55A2" rx="1"/>
                      <rect x="5" y="1" width="${newMarkerSize*0.07}" height="1" fill="#4A55A2" rx="1"/>
                      <circle cx="5" cy="8" r="0.8" fill="#FFFFFF"/>
                      <circle cx="8" cy="8" r="0.8" fill="#FFFFFF"/>
                      <circle cx="11" cy="8" r="0.8" fill="#FFFFFF"/>
                    </g>
                    <circle cx="${newMarkerSize/2}" cy="${newMarkerSize/2}" r="${newMarkerSize/3}" fill="none" stroke="#4A55A2" stroke-width="1.5" opacity="0.3">
                      <animate attributeName="r" values="${newMarkerSize/3};${newMarkerSize/2};${newMarkerSize/3}" dur="2s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite"/>
                    </circle>
                  </svg>
                `),
                scaledSize: new window.google.maps.Size(newMarkerSize, newMarkerHeight),
                anchor: new window.google.maps.Point(newMarkerSize/2, newMarkerHeight)
              },
              animation: window.google.maps.Animation.DROP
            });
            
            // Update marker reference
            mapInstanceRef.current.markers = [newMarker];
          }
        };
        
        window.addEventListener('resize', handleResize);
        
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

    // Load Google Maps API on demand
    const loadGoogleMapsOnDemand = async () => {
      console.log('🗺️ [Map] Starting on-demand map loading...');
      
      try {
        // Check if already loaded
        if (isGoogleMapsReady()) {
          console.log('✅ [Map] Google Maps already loaded, initializing...');
          clearTimeout(mapTimeout);
          initializeMap();
          return;
        }

        // Load Google Maps API
        await loadGoogleMaps();
        console.log('✅ [Map] Google Maps loaded successfully');
        clearTimeout(mapTimeout);
        initializeMap();
      } catch (error) {
        console.error('❌ [Map] Failed to load Google Maps:', error);
        clearTimeout(mapTimeout);
        showFallbackMap();
      }
    };

    // Load maps on demand
    loadGoogleMapsOnDemand();

    return () => {
      // Clear timeout
      clearTimeout(mapTimeout);
      
      // Remove resize listener if it exists
      if (handleResize) {
        window.removeEventListener('resize', handleResize);
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
                <h3>{getBusinessName()}</h3>
                <p dangerouslySetInnerHTML={{ __html: getAddress() }}></p>
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
                    href={`tel:${getPhoneNumber()}`}
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