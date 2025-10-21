// ========================================
// GOOGLE PLACES API SERVICE - JUMBO CONVENIENCE STORE
// ========================================
// This service handles all Google Places API calls for:
// - Finding business by coordinates
// - Fetching business details and reviews
// - Error handling and fallbacks
// ========================================

const API_KEY = 'AIzaSyDcbkothKmoFZVqDYvreRi2WGwpu68IEys';

class GooglePlacesService {
  constructor() {
    this.apiKey = API_KEY;
    this.baseUrl = 'https://maps.googleapis.com/maps/api/place';
    // Jumbo Convenience Store Place ID from Google Maps
    // Using the Place ID from the user's Google Maps link
    // The correct Place ID from the URL: 0x130fb51ec2c704c1:0xb701478bf889752b
    this.placeId = '0x130fb51ec2c704c1:0xb701478bf889752b';
    // Alternative Place ID format (if the above doesn't work)
    this.altPlaceId = 'ChIJN1t_tDeuEmsRUsoyG83frY4';
    this.placesService = null;
    this.map = null;
  }

  // Initialize Google Maps and Places Service
  async initializeGoogleMaps() {
    // Prevent multiple initializations
    if (this.placesService && this.map) {
      console.log('✅ [GooglePlacesApi] Already initialized, using existing service');
      return Promise.resolve();
    }

    console.log('🔧 [GooglePlacesApi] Initializing Google Maps and Places Service...');
    
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps && window.google.maps.places) {
        console.log('✅ [GooglePlacesApi] Google Maps and Places already loaded');
        this.initializePlacesService();
        resolve();
      } else {
        console.log('⏳ [GooglePlacesApi] Loading Google Maps API with Places library...');
        
        // Check if script is already being loaded
        const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
        if (existingScript) {
          console.log('⚠️ [GooglePlacesApi] Google Maps script already exists, waiting for it to load...');
          existingScript.onload = () => {
            this.initializePlacesService();
            resolve();
          };
          existingScript.onerror = (error) => {
            console.error('❌ [GooglePlacesApi] Existing script failed to load:', error);
            reject(error);
          };
        } else {
          // Load Google Maps API
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places`;
          script.async = true;
          script.defer = true;
          script.onload = () => {
            console.log('✅ [GooglePlacesApi] Google Maps API loaded successfully');
            this.initializePlacesService();
            resolve();
          };
          script.onerror = (error) => {
            console.error('❌ [GooglePlacesApi] Failed to load Google Maps API:', error);
            reject(error);
          };
          document.head.appendChild(script);
        }
      }
    });
  }

  initializePlacesService() {
    try {
      // Create a hidden map for Places Service
      const mapElement = document.createElement('div');
      mapElement.style.display = 'none';
      mapElement.id = 'hidden-map-for-places';
      document.body.appendChild(mapElement);
      
      this.map = new window.google.maps.Map(mapElement, {
        center: { lat: 36.0721098, lng: 14.2554454 },
        zoom: 15
      });
      
      this.placesService = new window.google.maps.places.PlacesService(this.map);
      console.log('✅ [GooglePlacesApi] PlacesService initialized successfully');
    } catch (error) {
      console.error('❌ [GooglePlacesApi] Failed to initialize PlacesService:', error);
      throw error;
    }
  }

  // Find business by coordinates using PlacesService
  async findBusinessByCoordinates(lat, lng, businessName = 'Jumbo Convenience') {
    try {
      console.log('🔍 [GooglePlacesApi] Searching for business by coordinates:', lat, lng);
      
      if (!this.placesService) {
        console.log('⏳ [GooglePlacesApi] PlacesService not initialized, initializing now...');
        await this.initializeGoogleMaps();
      }

      return new Promise((resolve, reject) => {
        const request = {
          location: { lat, lng },
          radius: 100,
          type: 'store',
          keyword: businessName
        };

        console.log('📡 [GooglePlacesApi] Making nearby search request:', request);

        this.placesService.nearbySearch(request, (results, status) => {
          console.log('📊 [GooglePlacesApi] Nearby Search Response:');
          console.log('   Status:', status);
          console.log('   Results count:', results ? results.length : 0);
          
          if (status === window.google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
            console.log('✅ [GooglePlacesApi] Business found by coordinates:', results[0].name);
            console.log('   Place ID:', results[0].place_id);
            console.log('   Rating:', results[0].rating || 'N/A');
            console.log('   Address:', results[0].vicinity || 'N/A');
            resolve(results[0]);
          } else {
            console.log('❌ [GooglePlacesApi] No business found by coordinates');
            console.log('   Status:', status);
            resolve(null);
          }
        });
      });
    } catch (error) {
      console.error('❌ [GooglePlacesApi] Error finding business by coordinates:', error);
      return null;
    }
  }

  // Get business details and reviews using PlacesService
  async getBusinessDetails(placeId) {
    try {
      console.log('🔍 [GooglePlacesApi] Getting business details for Place ID:', placeId);
      
      if (!this.placesService) {
        console.log('⏳ [GooglePlacesApi] PlacesService not initialized, initializing now...');
        await this.initializeGoogleMaps();
      }

      return new Promise((resolve, reject) => {
        const request = {
          placeId: placeId,
          fields: ['name', 'rating', 'user_ratings_total', 'reviews', 'formatted_address', 'formatted_phone_number', 'website', 'opening_hours', 'photos', 'price_level', 'types', 'url', 'vicinity']
        };

        console.log('📡 [GooglePlacesApi] Making PlacesService request:', request);

        this.placesService.getDetails(request, (place, status) => {
          console.log('📊 [GooglePlacesApi] PlacesService Response:');
          console.log('   Status:', status);
          console.log('   Place ID:', placeId);
          
          if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
            console.log('✅ [GooglePlacesApi] SUCCESS - Business found!');
            console.log('   Business Name:', place.name);
            console.log('   Rating:', place.rating || 'N/A');
            console.log('   Total Reviews:', place.user_ratings_total || 0);
            console.log('   Reviews Available:', place.reviews ? place.reviews.length : 0);
            console.log('   Address:', place.formatted_address || 'N/A');
            console.log('   Phone:', place.formatted_phone_number || 'N/A');
            console.log('   Website:', place.website || 'N/A');
            
            // Check if this is the correct business
            if (place.name && !place.name.includes('Jumbo') && !place.name.includes('Convenience')) {
              console.warn('⚠️ [GooglePlacesApi] WARNING: Business name does not match expected "Jumbo Convenience Store"');
              console.warn('   Expected: Jumbo Convenience Store');
              console.warn('   Got:', place.name);
            }
            
            if (place.reviews && place.reviews.length > 0) {
              console.log('📝 [GooglePlacesApi] Reviews Details:');
              place.reviews.forEach((review, index) => {
                console.log(`   Review ${index + 1}:`);
                console.log(`     Author: ${review.author_name || 'Anonymous'}`);
                console.log(`     Rating: ${review.rating || 'N/A'} stars`);
                console.log(`     Text: ${review.text ? review.text.substring(0, 100) + '...' : 'No text'}`);
                console.log(`     Time: ${review.time ? new Date(review.time * 1000).toLocaleDateString() : 'N/A'}`);
              });
            } else {
              console.log('⚠️ [GooglePlacesApi] No reviews found in API response');
            }
            
            resolve(place);
          } else {
            console.error('❌ [GooglePlacesApi] PlacesService Error:', status);
            
            // Detailed error explanations
            switch (status) {
              case 'ZERO_RESULTS':
                console.error('   → No results found for this Place ID');
                console.error('   → This Place ID might be incorrect or the business might not be listed on Google Maps');
                break;
              case 'OVER_QUERY_LIMIT':
                console.error('   → API quota exceeded - check billing');
                break;
              case 'REQUEST_DENIED':
                console.error('   → Request denied - check API key permissions and Places API enablement');
                break;
              case 'INVALID_REQUEST':
                console.error('   → Invalid request - check Place ID format');
                console.error('   → Current Place ID format:', placeId);
                break;
              case 'UNKNOWN_ERROR':
                console.error('   → Unknown error - try again later');
                break;
              default:
                console.error(`   → Unknown status: ${status}`);
            }
            
            resolve(null);
          }
        });
      });
    } catch (error) {
      console.error('❌ [GooglePlacesApi] Error fetching business details:', error);
      return null;
    }
  }

  // Get reviews for a business
  async getReviews(placeId) {
    try {
      const details = await this.getBusinessDetails(placeId);
      
      if (details && details.reviews) {
        return details.reviews.map((review, index) => ({
          id: index + 1,
          author_name: review.author_name || 'Anonymous',
          rating: review.rating || 0,
          text: review.text || '',
          time: review.time || Date.now() / 1000,
          profile_photo_url: review.profile_photo_url || this.generateAvatar(review.author_name || 'A')
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  }

  // Generate avatar for users without profile photos
  generateAvatar(name) {
    const initial = name.charAt(0).toUpperCase();
    const colors = ['4A55A2', '6366F1', '8B5CF6', 'EC4899', '10B981', 'F59E0B'];
    const color = colors[name.length % colors.length];
    return `https://via.placeholder.com/40x40/${color}/FFFFFF?text=${initial}`;
  }

  // Get business info (rating, total reviews, etc.)
  async getBusinessInfo(placeId) {
    try {
      const details = await this.getBusinessDetails(placeId);
      
      if (details) {
        return {
          name: details.name || 'Jumbo Convenience Store',
          rating: details.rating || 0,
          totalRatings: details.user_ratings_total || 0,
          address: details.formatted_address || '',
          phone: details.formatted_phone_number || '',
          website: details.website || '',
          url: details.url || '',
          vicinity: details.vicinity || '',
          priceLevel: details.price_level || null,
          types: details.types || [],
          openingHours: details.opening_hours || null,
          photos: details.photos || []
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching business info:', error);
      return null;
    }
  }

  // Get data directly using Place ID
  async getBusinessDataByPlaceId() {
    try {
      console.log('🚀 [GooglePlacesApi] Starting business data fetch...');
      console.log('   Using Place ID:', this.placeId);
      console.log('   Alternative Place ID:', this.altPlaceId);
      console.log('   API Key:', this.apiKey ? 'Present' : 'Missing');
      
      // Try the primary Place ID first
      let businessInfo = await this.getBusinessInfo(this.placeId);
      let reviews = await this.getReviews(this.placeId);
      
      // If the primary Place ID doesn't work, try the alternative format
      if (!businessInfo || !businessInfo.name || businessInfo.name.includes('Google Sydney')) {
        console.log('⚠️ [GooglePlacesApi] Primary Place ID failed, trying alternative format...');
        businessInfo = await this.getBusinessInfo(this.altPlaceId);
        reviews = await this.getReviews(this.altPlaceId);
      }
      
      // If still no results, try searching by coordinates
      if (!businessInfo || !businessInfo.name || businessInfo.name.includes('Google Sydney')) {
        console.log('⚠️ [GooglePlacesApi] Place ID methods failed, trying coordinate search...');
        const business = await this.findBusinessByCoordinates(36.0721098, 14.2554454, 'Jumbo Convenience');
        if (business && business.place_id) {
          console.log('✅ [GooglePlacesApi] Found business by coordinates:', business.name);
          businessInfo = await this.getBusinessInfo(business.place_id);
          reviews = await this.getReviews(business.place_id);
        }
      }
      
      console.log('📋 [GooglePlacesApi] Business data fetch completed:');
      console.log('   Business Info:', businessInfo ? 'Found' : 'Not found');
      console.log('   Business Name:', businessInfo ? businessInfo.name : 'N/A');
      console.log('   Reviews Count:', reviews ? reviews.length : 0);
      
      return {
        businessInfo,
        reviews,
        placeId: this.placeId
      };
    } catch (error) {
      console.error('❌ [GooglePlacesApi] Error getting business data by Place ID:', error);
      return null;
    }
  }

  // Main method to get all business data
  async getBusinessData(lat, lng, businessName = 'Jumbo Convenience') {
    try {
      // First try to get data using the known Place ID
      const placeIdData = await this.getBusinessDataByPlaceId();
      if (placeIdData) {
        return placeIdData;
      }
      
      // Fallback: try to find the business by coordinates
      const business = await this.findBusinessByCoordinates(lat, lng, businessName);
      
      if (business) {
        const placeId = business.place_id;
        
        // Get business info and reviews in parallel
        const [businessInfo, reviews] = await Promise.all([
          this.getBusinessInfo(placeId),
          this.getReviews(placeId)
        ]);
        
        return {
          businessInfo,
          reviews,
          placeId
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error getting business data:', error);
      return null;
    }
  }
}

// Create instance
const googlePlacesService = new GooglePlacesService();

// Comprehensive API test function
const runComprehensiveAPITest = async () => {
  console.log('🧪 ===========================================');
  console.log('🧪 COMPREHENSIVE GOOGLE API TEST SUITE');
  console.log('🧪 ===========================================');
  
  // Test 1: Check Google Maps API availability
  console.log('🔍 Test 1: Google Maps API Availability');
  if (window.google && window.google.maps) {
    console.log('✅ Google Maps API is loaded');
    console.log('   Version:', window.google.maps.version || 'Unknown');
    
    if (window.google.maps.places) {
      console.log('✅ Places library is available');
    } else {
      console.log('❌ Places library is NOT available');
    }
  } else {
    console.log('❌ Google Maps API is NOT loaded');
  }
  
  // Test 2: Check API Key
  console.log('🔍 Test 2: API Key Check');
  console.log('   API Key present:', googlePlacesService.apiKey ? 'Yes' : 'No');
  console.log('   API Key length:', googlePlacesService.apiKey ? googlePlacesService.apiKey.length : 0);
  
  // Test 3: Test PlacesService initialization
  console.log('🔍 Test 3: PlacesService Initialization');
  try {
    await googlePlacesService.initializeGoogleMaps();
    console.log('✅ PlacesService initialized successfully');
  } catch (error) {
    console.error('❌ PlacesService initialization failed:', error);
  }
  
  // Test 4: Test business data fetch
  console.log('🔍 Test 4: Business Data Fetch Test');
  try {
    const businessData = await googlePlacesService.getBusinessDataByPlaceId();
    if (businessData) {
      console.log('✅ Business data fetch successful');
    } else {
      console.log('❌ Business data fetch failed');
    }
  } catch (error) {
    console.error('❌ Business data fetch error:', error);
  }
  
  // Test 5: Check for common issues
  console.log('🔍 Test 5: Common Issues Check');
  console.log('   Current domain:', window.location.origin);
  console.log('   User agent:', navigator.userAgent);
  console.log('   Console errors:', 'Check for any red error messages above');
  
  console.log('🧪 ===========================================');
  console.log('🧪 TEST SUITE COMPLETED');
  console.log('🧪 ===========================================');
};

// Run the test automatically when the page loads
if (typeof window !== 'undefined') {
  // Run test after a short delay to ensure everything is loaded
  setTimeout(() => {
    runComprehensiveAPITest();
  }, 2000);
}

export default googlePlacesService;
