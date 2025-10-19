import React, { useEffect, useState } from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { getPosts, getFeaturedImageUrl, formatExcerpt, formatPostDate } from '../services/wordpressApi';
import './BlogPosts.css';

const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sectionRef = useScrollAnimation({
    animationType: 'fadeInUp',
    delay: 0.2,
    duration: 0.8,
  });

  useEffect(() => {
    let isMounted = true;
    
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const fetchedPosts = await getPosts({ per_page: 6 });
        
        if (!isMounted) return; // Prevent state update if component unmounted
        
        if (fetchedPosts && Array.isArray(fetchedPosts) && fetchedPosts.length > 0) {
          setPosts(fetchedPosts);
        } else if (fetchedPosts && Array.isArray(fetchedPosts) && fetchedPosts.length === 0) {
          // If no WordPress posts, show mock data from screenshot
          const mockPosts = [
            {
              id: 'mock-1',
              title: { rendered: 'Exploring Creativity Through Personal Writing' },
              excerpt: { rendered: 'This paragraph serves as an introduction to your blog post. Begin by...' },
              content: { rendered: 'This paragraph serves as an introduction to your blog post. Begin by...' },
              date: '2025-10-19T10:00:00',
              link: 'https://www.jumbo-convenience.com/blog',
              author: 1,
              featured_media: 1,
              featured_media_src_url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
              categories: [1],
              _embedded: {
                author: [{ name: 'Jumbo Team' }],
                'wp:term': [[{ name: 'GENERAL' }]]
              }
            },
            {
              id: 'mock-2',
              title: { rendered: 'Life Lessons from Daily Experiences' },
              excerpt: { rendered: 'Discover valuable insights from everyday moments and how they shape our perspective on life...' },
              content: { rendered: 'Discover valuable insights from everyday moments and how they shape our perspective on life...' },
              date: '2025-10-19T09:00:00',
              link: 'https://www.jumbo-convenience.com/blog',
              author: 1,
              featured_media: 2,
              featured_media_src_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
              categories: [1],
              _embedded: {
                author: [{ name: 'Jumbo Team' }],
                'wp:term': [[{ name: 'LIFE LESSONS' }]]
              }
            }
          ];
          setPosts(mockPosts);
        } else {
          setError('Failed to fetch blog posts. Please try again later.');
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        if (!isMounted) return; // Prevent state update if component unmounted
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPosts();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const handlePostClick = (post) => {
    // Open post in new tab
    window.open(post.link, '_blank', 'noopener,noreferrer');
  };

  if (loading) {
    return (
      <section ref={sectionRef} className="blog-posts-section" id="blog">
        <div className="container">
          <h2 className="section-title">Latest Blog Posts</h2>
          <div className="blog-loading">
            <div className="loading-spinner"></div>
            <p>Loading blog posts...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section ref={sectionRef} className="blog-posts-section" id="blog">
        <div className="container">
          <h2 className="section-title">Latest Blog Posts</h2>
          <div className="blog-error">
            <div className="error-icon">⚠️</div>
            <p>{error}</p>
            <p>The blog section is temporarily unavailable. Please check back later.</p>
            <button 
              className="retry-btn"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return (
      <section ref={sectionRef} className="blog-posts-section" id="blog">
        <div className="container">
          <h2 className="section-title">Latest Blog Posts</h2>
          <div className="no-posts">
            <div className="no-posts-icon">📝</div>
            <p>No blog posts available at the moment.</p>
            <p>Check back soon for updates from Jumbo Convenience Store!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="blog-posts-section" id="blog">
      <div className="container">
        <h2 className="section-title">Latest Blog Posts</h2>
        <p className="section-subtitle">Stay updated with news, offers, and updates from Jumbo Convenience Store</p>
        
        <div className="blog-posts-grid">
          {posts.map((post, index) => {
            const featuredImage = getFeaturedImageUrl(post);
            const excerpt = formatExcerpt(post, 120);
            const postDate = formatPostDate(post.date);
            
            return (
              <article 
                key={post.id} 
                className={`blog-post-card ${index % 3 === 0 ? 'featured' : ''}`}
                onClick={() => handlePostClick(post)}
              >
                {featuredImage && (
                  <div className="post-image-container">
                    <img 
                      src={featuredImage} 
                      alt={post.title.rendered}
                      className="post-image"
                      loading="lazy"
                    />
                    <div className="post-overlay">
                      <span className="read-more">Read More →</span>
                    </div>
                  </div>
                )}
                
                <div className="post-content">
                  <div className="post-meta">
                    <span className="post-date">{postDate}</span>
                    {post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0] && (
                      <span className="post-category">
                        {post._embedded['wp:term'][0].map(cat => cat.name).join(', ')}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="post-title">{post.title.rendered}</h3>
                  
                  {excerpt && (
                    <p className="post-excerpt">{excerpt}</p>
                  )}
                  
                  <div className="post-footer">
                    <span className="post-author">
                      {post._embedded && post._embedded.author && post._embedded.author[0] 
                        ? post._embedded.author[0].name 
                        : 'Jumbo Convenience Store'
                      }
                    </span>
                    <span className="post-link">Read Full Post →</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        
        <div className="blog-actions">
          <a 
            href="https://www.jumbo-convenience.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            View All Posts
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;
