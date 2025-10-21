# PageSpeed Optimization Guide

This document outlines the performance optimizations implemented to improve the Jumbo Convenience Store website's PageSpeed scores and Lighthouse performance metrics.

## 🎯 Optimization Goals

- Eliminate render-blocking CSS and JavaScript
- Reduce unused JavaScript bundle size
- Optimize external resource loading
- Implement proper caching strategies
- Improve Core Web Vitals scores

## 🚀 Implemented Optimizations

### 1. Critical CSS Inlining

**Problem**: Render-blocking CSS (~11.3 KiB) delays page rendering.

**Solution**: 
- Added `critical` package for CSS inlining
- Created `scripts/inline-critical-css.js` for automated critical CSS extraction
- Modified build process to inline critical CSS automatically

**Files Modified**:
- `package.json` - Added critical CSS script to build process
- `scripts/inline-critical-css.js` - Critical CSS extraction script

### 2. JavaScript Bundle Optimization

**Problem**: Large JavaScript bundle (~77 KiB) and unused code.

**Solution**:
- Implemented code splitting with React.lazy()
- Added manual chunk splitting in Vite config
- Deferred non-critical components (Map, Reviews)
- Added `defer` attribute to main script

**Files Modified**:
- `src/pages/Home.jsx` - Lazy loading for Map and Reviews components
- `vite.config.js` - Manual chunk splitting configuration
- `index.html` - Added defer attribute to main script

### 3. On-Demand Google Maps Loading

**Problem**: Google Maps API loads on every page, increasing bundle size.

**Solution**:
- Created `src/utils/loadGoogleMaps.js` utility
- Implemented lazy loading for Google Maps API
- Maps only load when Map component is rendered
- Added proper error handling and fallbacks

**Files Modified**:
- `src/utils/loadGoogleMaps.js` - New utility for on-demand loading
- `src/components/Map.jsx` - Updated to use lazy loading utility

### 4. Avatar Image Optimization

**Problem**: Oversized external avatars from Google (128×128 served at 36×36).

**Solution**:
- Modified avatar URLs to use correct size parameter (`=s36`)
- Added proper image attributes (`width`, `height`, `loading`, `decoding`)
- Implemented lazy loading for avatar images

**Files Modified**:
- `src/components/ReviewCard.jsx` - Optimized avatar image loading

### 5. Resource Hints and Preconnect

**Problem**: No preconnect hints for external resources.

**Solution**:
- Added preconnect hints for Google services
- Optimized DNS resolution and connection establishment

**Files Modified**:
- `index.html` - Added preconnect hints for external resources

### 6. Build Optimizations

**Problem**: Suboptimal build configuration affecting performance.

**Solution**:
- Configured Vite for optimal production builds
- Added Gzip and Brotli compression
- Disabled source maps for production
- Set target to ES2018 for better browser support

**Files Modified**:
- `vite.config.js` - Enhanced build configuration
- `package.json` - Added compression plugins

### 7. Caching Strategy

**Problem**: No proper caching headers for static assets.

**Solution**:
- Created `vercel.json` with optimal caching headers
- Set long-term caching for static assets
- Added security headers

**Files Modified**:
- `vercel.json` - Caching and security configuration

## 📊 Expected Performance Improvements

### Before Optimization:
- Render-blocking CSS: ~11.3 KiB
- Render-blocking JS: ~77 KiB
- Google Maps payload: Loads on every page
- Avatar images: Oversized (128×128)
- No preconnect hints
- No compression

### After Optimization:
- Critical CSS: Inlined (reduces render-blocking)
- JavaScript: Split and deferred
- Google Maps: On-demand loading only
- Avatar images: Properly sized (36×36)
- Preconnect hints: Added for external resources
- Compression: Gzip and Brotli enabled
- Caching: Long-term caching for static assets

## 🛠️ Build Commands

```bash
# Development
npm run dev

# Production build with optimizations
npm run build

# Fast build (without critical CSS)
npm run build:fast

# Bundle analysis
npm run analyze

# Preview production build
npm run preview
```

## 🧪 Testing Optimizations

### 1. Lighthouse Testing
Run Lighthouse audits on both mobile and desktop:

1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Select "Performance" category
4. Run audit on both mobile and desktop
5. Compare scores before and after optimization

### 2. Bundle Analysis
```bash
npm run analyze
```

This will generate a bundle analysis report showing:
- Bundle sizes
- Chunk splitting effectiveness
- Unused code identification

### 3. Network Performance
- Check Network tab in DevTools
- Verify preconnect hints are working
- Confirm lazy loading is functioning
- Test compression effectiveness

## 📈 Performance Metrics to Monitor

### Core Web Vitals
- **Largest Contentful Paint (LCP)**: Target < 2.5s
- **First Input Delay (FID)**: Target < 100ms
- **Cumulative Layout Shift (CLS)**: Target < 0.1

### Lighthouse Scores
- **Performance**: Target > 90
- **Accessibility**: Target > 90
- **Best Practices**: Target > 90
- **SEO**: Target > 90

### Bundle Metrics
- **Total JavaScript**: Target < 150 KiB
- **Critical CSS**: Target < 14 KiB
- **Unused JavaScript**: Target < 50 KiB

## 🔧 Configuration Files

### Vite Configuration (`vite.config.js`)
- Manual chunk splitting
- Compression plugins
- Build optimizations
- Target ES2018

### Vercel Configuration (`vercel.json`)
- Caching headers
- Security headers
- SPA routing

### Critical CSS Script (`scripts/inline-critical-css.js`)
- Critical CSS extraction
- Above-the-fold optimization
- Minification

## 🚨 Important Notes

1. **Visual Consistency**: All optimizations maintain the original visual appearance
2. **Browser Support**: Optimizations work on modern browsers (ES2018+)
3. **Fallbacks**: Proper fallbacks for lazy-loaded components
4. **Error Handling**: Graceful degradation for failed resource loads

## 🔄 Maintenance

### Regular Tasks
1. Monitor Lighthouse scores after deployments
2. Update critical CSS when design changes
3. Review bundle sizes monthly
4. Test on different devices and networks

### Performance Monitoring
- Use Google PageSpeed Insights
- Monitor Core Web Vitals in Google Search Console
- Set up performance budgets in CI/CD

## 📚 Additional Resources

- [Vite Performance Guide](https://vitejs.dev/guide/performance.html)
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Web Vitals](https://web.dev/vitals/)
- [Critical CSS Tools](https://web.dev/extract-critical-css/)

---

**Last Updated**: October 2024  
**Optimization Target**: Lighthouse Performance Score > 90
