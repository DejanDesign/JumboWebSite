// WordPress API service for jumbo-convenience.com
const WORDPRESS_BASE_URL = 'https://www.jumbo-convenience.com';

// Cache for API responses
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Helper function to check if cache is valid
const isCacheValid = (timestamp) => {
  return Date.now() - timestamp < CACHE_DURATION;
};

// Generic function to fetch data from WordPress API
const fetchWordPressData = async (endpoint, options = {}) => {
  const cacheKey = `${endpoint}_${JSON.stringify(options)}`;
  
  // Check cache first
  if (cache.has(cacheKey)) {
    const cached = cache.get(cacheKey);
    if (isCacheValid(cached.timestamp)) {
      return cached.data;
    }
  }

  try {
    const url = `${WORDPRESS_BASE_URL}/wp-json/wp/v2/${endpoint}`;
    
    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      ...options
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // If it's a 404 or similar, return empty array instead of throwing
      if (response.status === 404 || response.status >= 500) {
        console.warn(`WordPress API endpoint not available: ${response.status}`);
        return [];
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Cache the response
    cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });

    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.warn(`WordPress API request timed out for ${endpoint}`);
    } else {
      console.error(`Error fetching WordPress data from ${endpoint}:`, error);
    }
    return [];
  }
};

// Fetch blog posts
export const getPosts = async (params = {}) => {
  const defaultParams = {
    per_page: 6,
    _embed: true,
    orderby: 'date',
    order: 'desc',
    ...params
  };

  return fetchWordPressData('posts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

// Fetch specific post by ID
export const getPost = async (id) => {
  return fetchWordPressData(`posts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

// Fetch categories
export const getCategories = async () => {
  return fetchWordPressData('categories');
};

// Fetch tags
export const getTags = async () => {
  return fetchWordPressData('tags');
};

// Fetch media by ID
export const getMedia = async (id) => {
  return fetchWordPressData(`media/${id}`);
};


// Search posts
export const searchPosts = async (query, params = {}) => {
  const searchParams = {
    search: query,
    per_page: 10,
    ...params
  };
  
  return fetchWordPressData('posts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

// Helper function to extract featured image URL
export const getFeaturedImageUrl = (post) => {
  if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
    return post._embedded['wp:featuredmedia'][0].source_url;
  }
  return null;
};

// Helper function to format post excerpt
export const formatExcerpt = (post, maxLength = 150) => {
  let excerpt = '';
  
  if (post.excerpt && post.excerpt.rendered) {
    // Remove HTML tags and decode entities
    excerpt = post.excerpt.rendered
      .replace(/<[^>]*>/g, '')
      .replace(/&[^;]+;/g, ' ')
      .trim();
  } else if (post.content && post.content.rendered) {
    // Fallback to content if no excerpt
    excerpt = post.content.rendered
      .replace(/<[^>]*>/g, '')
      .replace(/&[^;]+;/g, ' ')
      .trim();
  }
  
  if (excerpt.length > maxLength) {
    excerpt = excerpt.substring(0, maxLength) + '...';
  }
  
  return excerpt;
};

// Helper function to format post date
export const formatPostDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};



// Test WordPress API connection
export const testWordPressApi = async () => {
  console.log('🧪 ===========================================');
  console.log('🧪 WORDPRESS API TEST SUITE');
  console.log('🧪 ===========================================');
  console.log(`📡 Testing API URL: ${WORDPRESS_BASE_URL}`);

  try {
    console.log('🔍 Test 1: Testing basic connectivity...');
    const response = await fetch(`${WORDPRESS_BASE_URL}/wp-json/wp/v2/`);
    if (response.ok) {
      console.log('✅ WordPress API is accessible');
    } else {
      console.warn(`⚠️ WordPress API returned status: ${response.status}`);
    }

    console.log('🔍 Test 2: Fetching posts...');
    const posts = await getPosts({ per_page: 1 });
    if (posts && posts.length > 0) {
      console.log('✅ Posts fetched successfully. Example post title:', posts[0].title.rendered);
    } else {
      console.warn('⚠️ No posts found or failed to fetch posts.');
    }

    console.log('🔍 Test 3: Fetching categories...');
    const categories = await getCategories();
    if (categories && categories.length > 0) {
      console.log('✅ Categories fetched successfully. Example category:', categories[0].name);
    } else {
      console.warn('⚠️ No categories found or failed to fetch categories.');
    }

    console.log('✅ WordPress API tests completed.');
  } catch (error) {
    console.error('❌ An error occurred during WordPress API tests:', error);
  }
  console.log('🧪 ===========================================');
};

// Clear cache
export const clearCache = () => {
  cache.clear();
  console.log('🗑️ WordPress API cache cleared');
};

// Get cache stats
export const getCacheStats = () => {
  return {
    size: cache.size,
    entries: Array.from(cache.keys())
  };
};

export default {
  getPosts,
  getPost,
  getCategories,
  getTags,
  getMedia,
  searchPosts,
  getFeaturedImageUrl,
  formatExcerpt,
  formatPostDate,
  testWordPressApi,
  clearCache,
  getCacheStats
};
