# Deployment Guide

This guide will help you deploy the Jumbo Convenience Store website to various hosting platforms.

## Quick Start

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your chosen hosting service.

## Hosting Options

### 1. Netlify (Recommended)

**Option A: Drag & Drop**
1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist` folder to the deploy area
4. Your site will be live instantly!

**Option B: Git Integration**
1. Push your code to GitHub/GitLab
2. Connect your repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy automatically on every push

### 2. Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts
4. Your site will be deployed!

### 3. GitHub Pages

1. Create a GitHub repository
2. Push your code to the repository
3. Go to Settings > Pages
4. Select source as "GitHub Actions"
5. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 4. AWS S3 + CloudFront

1. Create an S3 bucket
2. Enable static website hosting
3. Upload the `dist` folder contents
4. Set up CloudFront for CDN
5. Configure custom domain (optional)

### 5. Traditional Web Hosting

1. Run `npm run build`
2. Upload the `dist` folder contents to your web server's public directory
3. Ensure your server supports SPA routing (configure redirects)

## Environment Configuration

### Production Build

The production build is optimized for:
- Minified JavaScript and CSS
- Tree-shaking (removes unused code)
- Asset optimization
- Gzip compression

### Environment Variables

Create a `.env.production` file for production-specific settings:

```env
VITE_BLOG_URL=https://jumbo-convenience.com/blog/
VITE_API_BASE_URL=https://api.jumbo-convenience.com
```

## Performance Optimization

### Before Deployment

1. **Optimize Images:**
   - Use WebP format when possible
   - Compress images
   - Use appropriate sizes

2. **Enable Compression:**
   - Configure gzip/brotli compression on your server
   - Use a CDN for static assets

3. **Caching:**
   - Set appropriate cache headers
   - Use service workers for offline functionality

### After Deployment

1. **Test Performance:**
   - Use Google PageSpeed Insights
   - Check Lighthouse scores
   - Test on mobile devices

2. **Monitor:**
   - Set up analytics
   - Monitor Core Web Vitals
   - Track user engagement

## Troubleshooting

### Common Issues

1. **404 on Refresh:**
   - Configure your server to serve `index.html` for all routes
   - This is required for React Router to work properly

2. **CORS Issues:**
   - The blog API uses a CORS proxy
   - For production, consider setting up your own proxy server

3. **Build Failures:**
   - Check Node.js version (requires 16+)
   - Clear node_modules and reinstall
   - Check for TypeScript errors

### Server Configuration Examples

**Nginx:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Apache (.htaccess):**
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

## Security Considerations

1. **HTTPS:** Always use HTTPS in production
2. **Headers:** Set security headers
3. **Dependencies:** Keep dependencies updated
4. **API Keys:** Never expose API keys in client-side code

## Monitoring and Maintenance

1. **Analytics:** Set up Google Analytics or similar
2. **Error Tracking:** Use Sentry or similar service
3. **Uptime Monitoring:** Monitor site availability
4. **Performance:** Regular performance audits

## Support

For deployment issues or questions, please:
1. Check this guide first
2. Search existing issues
3. Create a new issue with detailed information

---

Happy deploying! 🚀











