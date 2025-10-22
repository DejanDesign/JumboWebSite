import React, { createContext, useContext, useState, useEffect } from 'react';
import googlePlacesService from '../services/googlePlacesApi';

// ========================================
// BUSINESS CONTEXT - GOOGLE BUSINESS DATA
// ========================================
// This context provides Google Business data to all components:
// - Business information (name, phone, address)
// - Opening hours from Google Business
// - Reviews and ratings
// - Loading states and error handling
// ========================================

const BusinessContext = createContext();

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};

export const BusinessProvider = ({ children }) => {
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch business data from Google Places API
  const fetchBusinessData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 [BusinessContext] Fetching Google Business data...');
      
      const data = await googlePlacesService.getBusinessDataByPlaceId();
      
      if (data && data.businessInfo) {
        console.log('✅ [BusinessContext] Google Business data loaded successfully');
        console.log('   Business Name:', data.businessInfo.name);
        console.log('   Phone:', data.businessInfo.phone);
        console.log('   Opening Hours:', data.businessInfo.openingHours);
        
        setBusinessData(data);
        setLastUpdated(new Date());
      } else {
        console.warn('⚠️ [BusinessContext] No Google Business data found, using fallback data');
        setBusinessData(getFallbackData());
      }
    } catch (err) {
      console.error('❌ [BusinessContext] Error fetching Google Business data:', err);
      setError(err.message);
      setBusinessData(getFallbackData());
    } finally {
      setLoading(false);
    }
  };

  // Fallback data when Google Business data is not available
  const getFallbackData = () => {
    return {
      businessInfo: {
        name: 'Jumbo Convenience Store',
        phone: '+356 7706 5767',
        address: 'Triq Il-Qolla Is-Safra, Marsalforn, Iż-Żebbuġ, Gozo, Malta',
        rating: 0,
        totalRatings: 0,
        openingHours: {
          weekday_text: [
            'Monday: 7:00 AM – 1:00 PM, 4:00 PM – 10:00 PM',
            'Tuesday: 7:00 AM – 1:00 PM, 4:00 PM – 10:00 PM',
            'Wednesday: 7:00 AM – 1:00 PM, 4:00 PM – 10:00 PM',
            'Thursday: 7:00 AM – 1:00 PM, 4:00 PM – 10:00 PM',
            'Friday: 7:00 AM – 1:00 PM, 4:00 PM – 10:00 PM',
            'Saturday: 7:00 AM – 10:00 PM',
            'Sunday: 10:00 AM – 10:00 PM'
          ]
        }
      },
      reviews: [],
      placeId: null
    };
  };

  // Format opening hours for display
  const formatOpeningHours = (openingHours) => {
    if (!openingHours || !openingHours.weekday_text) {
      return getDefaultHours();
    }

    return openingHours.weekday_text.map(dayText => {
      const [day, time] = dayText.split(': ');
      return {
        day: day.trim(),
        time: time || 'Closed',
        special: day.toLowerCase().includes('sunday')
      };
    });
  };

  // Default hours when Google data is not available
  const getDefaultHours = () => {
    return [
      { day: 'Monday', time: '07:00 - 13:00 | 16:00 - 22:00' },
      { day: 'Tuesday', time: '07:00 - 13:00 | 16:00 - 22:00' },
      { day: 'Wednesday', time: '07:00 - 13:00 | 16:00 - 22:00' },
      { day: 'Thursday', time: '07:00 - 13:00 | 16:00 - 22:00' },
      { day: 'Friday', time: '07:00 - 13:00 | 16:00 - 22:00' },
      { day: 'Saturday', time: '07:00 - 22:00' },
      { day: 'Sunday', time: '10:00 - 22:00', special: true }
    ];
  };

  // Refresh business data
  const refreshBusinessData = () => {
    fetchBusinessData();
  };

  // Initialize business data on mount
  useEffect(() => {
    fetchBusinessData();
  }, []);

  const value = {
    businessData,
    loading,
    error,
    lastUpdated,
    refreshBusinessData,
    formatOpeningHours,
    getDefaultHours
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
};

export default BusinessContext;


