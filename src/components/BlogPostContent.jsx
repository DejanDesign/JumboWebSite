import React from 'react';
import { parseMarkdown } from '../utils/markdownParser';
import ShareButtons from './ShareButtons';
import './BlogPostContent.css';

const BlogPostContent = ({ post, onBack }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadingTime = (excerpt) => {
    const wordsPerMinute = 200;
    const wordCount = excerpt.split(' ').length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  // Get current URL and post details for sharing
  const currentUrl = window.location.href || 'https://jumbo-convenience.com';
  const postTitle = post?.title || 'Jumbo Convenience Store';
  const postDescription = post?.excerpt || 'Check out this post from Jumbo Convenience Store';
  
  
  console.log('Share data:', { currentUrl, postTitle, postDescription });

  const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #10b981;
      color: white;
      padding: 16px 20px;
      border-radius: 8px;
      font-weight: 500;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      max-width: 400px;
      white-space: pre-line;
      font-size: 14px;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 5000);
  };

  return (
    <div className="blog-post-content">
      {/* Back Button */}
      <div className="back-button-container">
        <button onClick={onBack} className="back-button">
          ← Back to Blog
        </button>
      </div>

      {/* Hero Section */}
      <div className="post-hero">
        <div className="post-hero-image">
          {post.imageUrl ? (
            <img 
              src={post.imageUrl} 
              alt={post.title}
              className="post-hero-img"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          <div className="post-image-placeholder" style={{ display: post.imageUrl ? 'none' : 'flex' }}>
            {post.image}
          </div>
          <div className="post-category-badge">
            {post.category.toUpperCase()}
          </div>
        </div>
        <div className="post-hero-content">
          <div className="post-meta">
            <span className="post-date">📅 {formatDate(post.date)}</span>
            <span className="post-read-time">⏱️ {getReadingTime(post.excerpt)} min read</span>
          </div>
          <h1 className="post-title">{post.title}</h1>
          <p className="post-subtitle">{post.excerpt}</p>
          <div className="post-author">
            <div className="author-avatar">
              👨‍💼
            </div>
            <div className="author-info">
              <div className="author-name">{post.author}</div>
              <div className="author-role">Jumbo Team</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="post-main">
        <div className="post-content">
          <div className="post-body">
            {post.content ? (
              <div 
                className="content-html" 
                dangerouslySetInnerHTML={{ 
                  __html: parseMarkdown(post.content)
                }}
              />
            ) : (
              <div className="content-section">
                <h2>Introduction</h2>
                <p>{post.excerpt}</p>
                <p>This is where the full blog post content would be displayed. In a real implementation, this would be fetched from your CMS or blog API with the complete article content, including multiple paragraphs, images, and formatting.</p>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="post-tags">
            <span className="tag-label">Tags:</span>
            <span className="tag">#jumbo</span>
            <span className="tag">#{post.category.toLowerCase()}</span>
            <span className="tag">#gozo</span>
            <span className="tag">#convenience</span>
          </div>

          {/* Share Buttons */}
          <div className="post-share">
            <span className="share-label">Share this post:</span>
            <ShareButtons 
              url={currentUrl}
              title={postTitle}
              description={postDescription}
              className="compact"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="post-sidebar">
          <div className="sidebar-section">
            <h3>About the Author</h3>
            <div className="author-card">
              <div className="author-avatar-large">👨‍💼</div>
              <div className="author-details">
                <h4>{post.author}</h4>
                <p>Part of the Jumbo Convenience Store team, dedicated to serving the Marsalforn community with quality products and exceptional service.</p>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Related Posts</h3>
            <div className="related-posts">
              <div className="related-post">
                <div className="related-post-image">📖</div>
                <div className="related-post-content">
                  <h4>Why Storytelling Connects Us All</h4>
                  <span className="related-post-date">Jan 12, 2025</span>
                </div>
              </div>
              <div className="related-post">
                <div className="related-post-image">🌱</div>
                <div className="related-post-content">
                  <h4>Navigating Life's Challenges with Grace</h4>
                  <span className="related-post-date">Jan 10, 2025</span>
                </div>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Newsletter</h3>
            <div className="newsletter-signup">
              <p>Stay updated with our latest posts and store news!</p>
              <div className="newsletter-form">
                <input type="email" placeholder="Enter your email" />
                <button className="btn btn-primary">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostContent;
