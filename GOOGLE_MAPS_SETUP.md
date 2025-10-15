# Google Maps Setup Guide

## Current Status
The website currently uses a demo Google Maps API key that may have limitations. For production use, you'll need to get your own API key.

## How to Get Your Google Maps API Key

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/

2. **Create a New Project or Select Existing**
   - Click "Select a project" → "New Project"
   - Name it "Jumbo Convenience Store" (or any name you prefer)

3. **Enable Google Maps JavaScript API**
   - Go to "APIs & Services" → "Library"
   - Search for "Maps JavaScript API"
   - Click on it and press "Enable"

4. **Create API Key**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the generated API key

5. **Secure Your API Key (Recommended)**
   - Click on your API key to edit it
   - Under "Application restrictions", select "HTTP referrers"
   - Add your domain (e.g., `localhost:3000/*`, `yourdomain.com/*`)
   - Under "API restrictions", select "Restrict key" and choose "Maps JavaScript API"

6. **Update the Code**
   - Open `src/components/Map.jsx`
   - Find line 29: `script.src = \`https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dgsWUxBWkUxS5Y&libraries=places\`;`
   - Replace `AIzaSyBFw0Qbyq9zTFTd-tUY6dgsWUxBWkUxS5Y` with your actual API key

## Features Included
- ✅ Interactive Google Map with custom styling
- ✅ Store location marker with custom icon
- ✅ Info window with store details
- ✅ "Get Directions" links that open Google Maps
- ✅ Fallback map display if API fails to load
- ✅ Responsive design for all devices

## Current Location
- **Address**: Triq Il-Qolla Is-Safra, Iż-Żebbuġ, Gozo, Malta
- **Coordinates**: 36.0619, 14.2486

## Troubleshooting
- If the map doesn't load, check the browser console for errors
- Ensure your API key has the correct permissions
- Verify that the Maps JavaScript API is enabled
- Check that your domain is added to the API key restrictions