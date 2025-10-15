import axios from 'axios';

// CORS proxy to fetch data from external blog
const CORS_PROXIES = [
  'https://api.allorigins.win/raw?url=',
  'https://cors-anywhere.herokuapp.com/',
  'https://api.codetabs.com/v1/proxy?quest='
];
const BLOG_URL = 'https://jumbo-convenience.com/blog/';

class BlogApi {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  async fetchBlogPosts() {
    try {
      // Check cache first
      const cacheKey = 'blog_posts';
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        return cached;
      }

      // Try multiple CORS proxies
      let lastError;
      for (let i = 0; i < CORS_PROXIES.length; i++) {
        try {
          console.log(`Trying CORS proxy ${i + 1}/${CORS_PROXIES.length}: ${CORS_PROXIES[i]}`);
          
          const response = await axios.get(`${CORS_PROXIES[i]}${encodeURIComponent(BLOG_URL)}`, {
            timeout: 15000, // 15 seconds per proxy
            headers: {
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
          });
          
          // Parse the HTML response to extract blog posts
          const posts = this.parseBlogPosts(response.data);
          
          if (posts && posts.length > 0) {
            console.log(`✅ Successfully fetched ${posts.length} blog posts using proxy ${i + 1}`);
            // Cache the results
            this.setCache(cacheKey, posts);
            return posts;
          }
        } catch (error) {
          console.warn(`❌ CORS proxy ${i + 1} failed:`, error.message);
          lastError = error;
          continue;
        }
      }
      
      // If all proxies failed, throw the last error
      throw lastError || new Error('All CORS proxies failed');
      
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      // Return enhanced mock data as fallback
      return this.getEnhancedMockBlogPosts();
    }
  }

  parseBlogPosts(htmlContent) {
    try {
      // Create a temporary DOM parser
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      
      const posts = [];
      
      // Look for blog post elements (this will depend on the actual HTML structure)
      const postElements = doc.querySelectorAll('article, .post, .blog-post, .entry');
      
      postElements.forEach((element, index) => {
        const post = this.extractPostData(element, index);
        if (post) {
          posts.push(post);
        }
      });
      
      // If no posts found with standard selectors, try alternative approaches
      if (posts.length === 0) {
        return this.parseAlternativeStructure(doc);
      }
      
      return posts.length > 0 ? posts : this.getEnhancedMockBlogPosts();
    } catch (error) {
      console.error('Error parsing blog posts:', error);
      return this.getEnhancedMockBlogPosts();
    }
  }

  extractPostData(element, index) {
    try {
      // Extract title
      const titleElement = element.querySelector('h1, h2, h3, .title, .post-title, .entry-title');
      const title = titleElement ? titleElement.textContent.trim() : `Blog Post ${index + 1}`;
      
      // Extract excerpt/content
      const contentElement = element.querySelector('.excerpt, .summary, .content, p');
      const excerpt = contentElement ? contentElement.textContent.trim().substring(0, 150) + '...' : 'This is a blog post from Jumbo Convenience Store.';
      
      // Extract image
      const imgElement = element.querySelector('img');
      const imageUrl = imgElement ? imgElement.src : this.getDefaultImage(index);
      
      // Extract date
      const dateElement = element.querySelector('.date, .published, time');
      const date = dateElement ? dateElement.textContent.trim() : new Date().toISOString().split('T')[0];
      
      // Extract category
      const categoryElement = element.querySelector('.category, .tag, .meta');
      const category = categoryElement ? categoryElement.textContent.trim() : 'General';
      
      return {
        id: index + 1,
        title,
        excerpt,
        category: this.categorizePost(title, excerpt),
        date: this.formatDate(date),
        author: 'Jumbo Team',
        readTime: this.calculateReadTime(excerpt),
        image: this.getImageEmoji(category),
        imageUrl: imageUrl,
        featured: index === 0,
        content: this.generateContent(title, excerpt, category)
      };
    } catch (error) {
      console.error('Error extracting post data:', error);
      return null;
    }
  }

  parseAlternativeStructure(doc) {
    // Try to find blog posts using different selectors
    const links = doc.querySelectorAll('a[href*="blog"], a[href*="post"]');
    const posts = [];
    
    links.forEach((link, index) => {
      const title = link.textContent.trim();
      if (title && title.length > 10) {
        posts.push({
          id: index + 1,
          title,
          excerpt: `Read more about ${title.toLowerCase()}...`,
          category: this.categorizePost(title, ''),
          date: new Date().toISOString().split('T')[0],
          author: 'Jumbo Team',
          readTime: '5 min read',
          image: this.getImageEmoji(this.categorizePost(title, '')),
          imageUrl: this.getDefaultImage(index),
          featured: index === 0,
          content: this.generateContent(title, '', this.categorizePost(title, ''))
        });
      }
    });
    
    return posts.length > 0 ? posts : this.getEnhancedMockBlogPosts();
  }

  getEnhancedMockBlogPosts() {
    return [
      {
        id: 1,
        title: "Exploring Creativity Through Personal Writing",
        excerpt: "This paragraph serves as an introduction to your blog post. Begin by capturing your reader's attention with a compelling opening that sets the tone for what's to come.",
        category: "Personal Growth",
        date: "2025-01-15",
        author: "Jumbo Team",
        readTime: "5 min read",
        image: "✍️",
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
        featured: true,
        content: `# Exploring Creativity Through Personal Writing

This paragraph serves as an introduction to your blog post. Begin by capturing your reader's attention with a compelling opening that sets the tone for what's to come.

## The Power of Personal Expression

Writing is more than just putting words on paper—it's a form of self-discovery and creative expression. When we write from the heart, we tap into our deepest thoughts and emotions, creating something truly unique.

### Finding Your Voice

Every writer has a unique voice, and discovering yours is one of the most rewarding aspects of personal writing. Don't be afraid to experiment with different styles and approaches until you find what feels authentic to you.

## Building a Writing Practice

Consistency is key when it comes to developing your writing skills. Here are some tips to help you build a sustainable writing practice:

- Set aside dedicated time each day for writing
- Keep a journal to capture ideas and observations
- Read widely to expand your vocabulary and perspective
- Don't worry about perfection—focus on progress

## The Journey Continues

Remember, writing is a journey, not a destination. Each piece you write brings you closer to understanding yourself and the world around you. Embrace the process and enjoy the creative journey.`
      },
      {
        id: 2,
        title: "Why Storytelling Connects Us All",
        excerpt: "This paragraph serves as an introduction to your blog post. Begin by exploring the universal power of stories and how they bring people together across cultures and generations.",
        category: "Community",
        date: "2025-01-12",
        author: "Jumbo Team",
        readTime: "7 min read",
        image: "📖",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
        featured: false,
        content: `# Why Storytelling Connects Us All

This paragraph serves as an introduction to your blog post. Begin by exploring the universal power of stories and how they bring people together across cultures and generations.

## The Universal Language of Stories

From ancient cave paintings to modern social media, humans have always been storytellers. Stories are how we make sense of the world, share experiences, and connect with others on a deep emotional level.

### The Science Behind Storytelling

Research shows that when we hear a compelling story, our brains release oxytocin, the "bonding hormone." This chemical response helps us feel more connected to the storyteller and more empathetic toward the characters in the story.

## Stories in Our Daily Lives

Every day, we share stories with family, friends, and colleagues. These stories help us:
- Build relationships and trust
- Learn from others' experiences
- Process our own emotions
- Create shared memories

## The Power of Community Stories

In our local community here in Marsalforn, stories help us understand our neighbors, celebrate our shared history, and build a stronger sense of belonging. Whether it's a family recipe passed down through generations or a local legend about our beautiful coastline, these stories connect us to our place and to each other.

## Your Story Matters

Remember, everyone has a story worth telling. Your experiences, challenges, and triumphs can inspire others and help create the connections that make our community stronger.`
      },
      {
        id: 3,
        title: "Navigating Life's Challenges with Grace",
        excerpt: "This paragraph serves as an introduction to your blog post. Begin by exploring how we can face life's difficulties with resilience and wisdom.",
        category: "Life Lessons",
        date: "2025-01-10",
        author: "Jumbo Team",
        readTime: "6 min read",
        image: "🌱",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        featured: false,
        content: `# Navigating Life's Challenges with Grace

This paragraph serves as an introduction to your blog post. Begin by exploring how we can face life's difficulties with resilience and wisdom.

## The Art of Resilience

Life presents us with challenges that test our strength and character. How we respond to these challenges defines who we become and shapes our future path.

### Building Inner Strength

Resilience isn't something we're born with—it's a skill we develop through practice and experience. Here are some ways to build your inner strength:

- Practice mindfulness and self-awareness
- Cultivate a positive mindset
- Build a strong support network
- Learn from setbacks and failures

## Finding Wisdom in Difficult Times

Every challenge carries within it the seeds of wisdom and growth. When we approach difficulties with an open mind and heart, we can discover valuable lessons that serve us throughout our lives.

## Community Support

In times of difficulty, our community becomes our greatest asset. Here at Jumbo Convenience Store, we believe in supporting each other through life's ups and downs, creating a network of care that strengthens us all.`
      },
      {
        id: 4,
        title: "Grand Reopening: A Dream Come True",
        excerpt: "After months of hard work and dedication, we're thrilled to announce that Jumbo Convenience Store is officially open! Join us as we share the incredible journey of bringing this beloved store back to life...",
        category: "News",
        date: "2025-01-08",
        author: "Djukic Family",
        readTime: "8 min read",
        image: "🎉",
        imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
        featured: true,
        content: `# Grand Reopening: A Dream Come True

After months of hard work and dedication, we're thrilled to announce that Jumbo Convenience Store is officially open! Join us as we share the incredible journey of bringing this beloved store back to life.

## A Family's Dream

The Djukic family has always believed in the power of community and the importance of serving our neighbors. When we decided to reopen this beloved store in Marsalforn, Gozo, we knew it would be more than just a business—it would be a labor of love.

### The Journey Begins

Reopening the store was no small feat. We built everything from the ground up, pouring our heart and soul into every inch of the space. From laying down the shelves to choosing the perfect product arrangement, every decision was made with our future customers in mind.

## Quality First

In the beginning, we opened our doors with a small selection of stock, but we made sure every item was of the highest quality. We handpicked each product, ensuring that only the best would make its way onto our shelves.

## Community Focus

Our focus was on offering essentials like fresh bread, milk, and meats, alongside specialized items like lactose-free and gluten-free options. It was a humble start, but we knew that quality would speak louder than quantity.

## Looking Forward

At the core of Jumbo Convenience Store is our mission to provide the highest quality products and service to our customers. As we continue to grow, we remain dedicated to being a trusted part of the Marsalforn community.

Thank you for your support and for being part of our story!`
      },
      {
        id: 5,
        title: "5 Delicious Ways to Use Fresh Bread",
        excerpt: "Discover creative and mouth-watering recipes using our freshly baked bread delivered daily to Jumbo.",
        category: "Recipes",
        date: "2025-01-05",
        author: "Maria Djukic",
        readTime: "5 min read",
        image: "🥖",
        imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop",
        featured: false,
        content: `# 5 Delicious Ways to Use Fresh Bread

Discover creative and mouth-watering recipes using our freshly baked bread delivered daily to Jumbo.

## 1. Classic Bruschetta

Transform your fresh bread into a Mediterranean delight with our simple bruschetta recipe.

### Ingredients:
- Fresh bread slices
- Ripe tomatoes
- Fresh basil
- Garlic
- Olive oil
- Salt and pepper

### Instructions:
1. Toast the bread slices until golden
2. Rub with fresh garlic
3. Top with diced tomatoes and basil
4. Drizzle with olive oil
5. Season with salt and pepper

## 2. French Toast Delight

Start your morning with this delicious French toast made from our fresh bread.

## 3. Panzanella Salad

Use day-old bread to create this refreshing Italian salad.

## 4. Bread Pudding

Transform leftover bread into a comforting dessert.

## 5. Garlic Bread

The perfect accompaniment to any meal.

These recipes showcase the versatility of fresh bread and help you make the most of our daily deliveries!`
      },
      {
        id: 6,
        title: "Guide to Gluten-Free Living in Gozo",
        excerpt: "Everything you need to know about our gluten-free products and how to maintain a healthy lifestyle.",
        category: "Health",
        date: "2025-01-03",
        author: "Health Team",
        readTime: "6 min read",
        image: "🌾",
        imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=600&fit=crop",
        featured: false,
        content: `# Guide to Gluten-Free Living in Gozo

Everything you need to know about our gluten-free products and how to maintain a healthy lifestyle.

## Understanding Gluten-Free Living

Living gluten-free doesn't mean sacrificing taste or variety. At Jumbo Convenience Store, we're committed to providing delicious gluten-free options for our community.

### Our Gluten-Free Selection

We carefully curate our gluten-free products to ensure quality and taste:

- Fresh gluten-free bread
- Gluten-free pasta and grains
- Snacks and treats
- Baking ingredients

## Tips for Gluten-Free Living

1. **Read Labels Carefully**: Always check ingredient lists
2. **Plan Your Meals**: Preparation is key to success
3. **Explore New Foods**: Discover delicious alternatives
4. **Stay Informed**: Keep up with gluten-free news and products

## Community Support

We understand that dietary restrictions can be challenging. That's why we're here to support you with quality products and helpful advice.

## Your Health Matters

At Jumbo, we believe that everyone deserves access to healthy, delicious food that fits their dietary needs.`
      }
    ];
  }

  // Helper methods
  getFromCache(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  categorizePost(title, excerpt) {
    const text = (title + ' ' + excerpt).toLowerCase();
    if (text.includes('recipe') || text.includes('cooking') || text.includes('food')) return 'Recipes';
    if (text.includes('health') || text.includes('nutrition') || text.includes('gluten')) return 'Health';
    if (text.includes('community') || text.includes('local') || text.includes('neighbor')) return 'Community';
    if (text.includes('news') || text.includes('announcement') || text.includes('opening')) return 'News';
    if (text.includes('personal') || text.includes('writing') || text.includes('creative')) return 'Personal Growth';
    if (text.includes('life') || text.includes('challenge') || text.includes('wisdom')) return 'Life Lessons';
    return 'General';
  }

  formatDate(dateString) {
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch {
      return new Date().toISOString().split('T')[0];
    }
  }

  calculateReadTime(text) {
    const wordsPerMinute = 200;
    const wordCount = text.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute) + ' min read';
  }

  getImageEmoji(category) {
    const emojiMap = {
      'Recipes': '🍳',
      'Health': '🌾',
      'Community': '🤝',
      'News': '📢',
      'Personal Growth': '✍️',
      'Life Lessons': '🌱',
      'General': '📝'
    };
    return emojiMap[category] || '📝';
  }

  getDefaultImage(index) {
    const images = [
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&h=600&fit=crop'
    ];
    return images[index % images.length];
  }

  generateContent(title, excerpt, category) {
    return `# ${title}

${excerpt}

## Introduction

This is a comprehensive blog post from Jumbo Convenience Store, designed to provide valuable information and insights to our community.

## Main Content

Here you'll find detailed information about ${title.toLowerCase()}, carefully crafted to help you understand and benefit from our expertise in serving the Marsalforn community.

### Key Points

- Quality information you can trust
- Practical advice for daily life
- Community-focused content
- Expert insights from our team

## Conclusion

We hope this information helps you in your daily life. At Jumbo Convenience Store, we're committed to providing not just quality products, but also valuable knowledge and support for our community.

Thank you for reading, and we look forward to serving you!`;
  }

  getMockBlogPosts() {
    // Mock data based on the blog structure we saw
    return [
      {
        id: 1,
        title: "Exploring Creativity Through Personal Writing",
        excerpt: "This paragraph serves as an introduction to your blog post. Begin by…",
        category: "Personal Growth",
        date: "2025-01-15",
        author: "Jumbo Team",
        readTime: "5 min read",
        image: "✍️",
        featured: true,
        content: `# Exploring Creativity Through Personal Writing

This paragraph serves as an introduction to your blog post. Begin by capturing your reader's attention with a compelling opening that sets the tone for what's to come.

## The Power of Personal Expression

Writing is more than just putting words on paper—it's a form of self-discovery and creative expression. When we write from the heart, we tap into our deepest thoughts and emotions, creating something truly unique.

### Finding Your Voice

Every writer has a unique voice, and discovering yours is one of the most rewarding aspects of personal writing. Don't be afraid to experiment with different styles and approaches until you find what feels authentic to you.

## Building a Writing Practice

Consistency is key when it comes to developing your writing skills. Here are some tips to help you build a sustainable writing practice:

- Set aside dedicated time each day for writing
- Keep a journal to capture ideas and observations
- Read widely to expand your vocabulary and perspective
- Don't worry about perfection—focus on progress

## The Journey Continues

Remember, writing is a journey, not a destination. Each piece you write brings you closer to understanding yourself and the world around you. Embrace the process and enjoy the creative journey.`
      },
      {
        id: 2,
        title: "Why Storytelling Connects Us All",
        excerpt: "This paragraph serves as an introduction to your blog post. Begin by…",
        category: "Community",
        date: "2025-01-12",
        author: "Jumbo Team",
        readTime: "7 min read",
        image: "📖",
        featured: false,
        content: `# Why Storytelling Connects Us All

This paragraph serves as an introduction to your blog post. Begin by exploring the universal power of stories and how they bring people together across cultures and generations.

## The Universal Language of Stories

From ancient cave paintings to modern social media, humans have always been storytellers. Stories are how we make sense of the world, share experiences, and connect with others on a deep emotional level.

### The Science Behind Storytelling

Research shows that when we hear a compelling story, our brains release oxytocin, the "bonding hormone." This chemical response helps us feel more connected to the storyteller and more empathetic toward the characters in the story.

## Stories in Our Daily Lives

Every day, we share stories with family, friends, and colleagues. These stories help us:
- Build relationships and trust
- Learn from others' experiences
- Process our own emotions
- Create shared memories

## The Power of Community Stories

In our local community here in Marsalforn, stories help us understand our neighbors, celebrate our shared history, and build a stronger sense of belonging. Whether it's a family recipe passed down through generations or a local legend about our beautiful coastline, these stories connect us to our place and to each other.

## Your Story Matters

Remember, everyone has a story worth telling. Your experiences, challenges, and triumphs can inspire others and help create the connections that make our community stronger.`
      },
      {
        id: 3,
        title: "Navigating Life's Challenges with Grace",
        excerpt: "This paragraph serves as an introduction to your blog post. Begin by…",
        category: "Life Lessons",
        date: "2025-01-10",
        author: "Jumbo Team",
        readTime: "6 min read",
        image: "🌱",
        featured: false
      },
      {
        id: 4,
        title: "Grand Reopening: A Dream Come True",
        excerpt: "After months of hard work and dedication, we're thrilled to announce that Jumbo Convenience Store is officially open! Join us as we share the incredible journey of bringing this beloved store back to life...",
        category: "News",
        date: "2025-01-08",
        author: "Djukic Family",
        readTime: "8 min read",
        image: "🎉",
        featured: true
      },
      {
        id: 5,
        title: "5 Delicious Ways to Use Fresh Bread",
        excerpt: "Discover creative and mouth-watering recipes using our freshly baked bread delivered daily to Jumbo.",
        category: "Recipes",
        date: "2025-01-05",
        author: "Maria Djukic",
        readTime: "5 min read",
        image: "🥖",
        featured: false
      },
      {
        id: 6,
        title: "Guide to Gluten-Free Living in Gozo",
        excerpt: "Everything you need to know about our gluten-free products and how to maintain a healthy lifestyle.",
        category: "Health",
        date: "2025-01-03",
        author: "Health Team",
        readTime: "6 min read",
        image: "🌾",
        featured: false
      }
    ];
  }

  async searchPosts(query, category = 'all') {
    const posts = await this.fetchBlogPosts();
    
    let filteredPosts = posts;
    
    if (category !== 'all') {
      filteredPosts = posts.filter(post => 
        post.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (query) {
      filteredPosts = filteredPosts.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    return filteredPosts;
  }

  getCategories() {
    return [
      { id: 'all', name: 'All' },
      { id: 'news', name: 'News' },
      { id: 'recipes', name: 'Recipes' },
      { id: 'health', name: 'Health' },
      { id: 'community', name: 'Community' },
      { id: 'personal growth', name: 'Personal Growth' },
      { id: 'life lessons', name: 'Life Lessons' }
    ];
  }
}

export default new BlogApi();
