import React from 'react';
import { useNavigate } from 'react-router-dom';
import BlogCard from './BlogCard';
import './BlogGrid.css';

const BlogGrid = ({ posts, loading }) => {
  const navigate = useNavigate();

  const handleFeaturedPostClick = (post) => {
    navigate(`/blog/${post.id}`);
  };

  if (loading) {
    return (
      <div className="main-content">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading blog posts...</p>
        </div>
      </div>
    );
  }

  const featuredPost = posts.find(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <main className="main-content">
      {featuredPost && (
        <div 
          className="featured-post"
          onClick={() => handleFeaturedPostClick(featuredPost)}
        >
          <div className="featured-image">
            <div className="featured-badge">⭐ FEATURED</div>
            {featuredPost.imageUrl ? (
              <img 
                src={featuredPost.imageUrl} 
                alt={featuredPost.title}
                className="featured-image-img"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div className="featured-image-placeholder" style={{ display: featuredPost.imageUrl ? 'none' : 'flex' }}>
              {featuredPost.image}
            </div>
          </div>
          <div className="featured-content">
            <div className="blog-meta">
              <span className="blog-category">{featuredPost.category.toUpperCase()}</span>
              <span className="blog-date">📅 {new Date(featuredPost.date).toLocaleDateString()}</span>
            </div>
            <h2 className="featured-title">{featuredPost.title}</h2>
            <p className="blog-excerpt">{featuredPost.excerpt}</p>
            <div className="blog-author">
              <div className="author-avatar">👨‍💼</div>
              <div className="author-info">
                <div className="author-name">{featuredPost.author}</div>
                <div className="read-time">{featuredPost.readTime}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="section-header">
        <h2 className="section-title">Latest Articles</h2>
      </div>

      <div className="blog-grid">
        {regularPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="no-posts">
          <p>No blog posts found. Please try a different search or category.</p>
        </div>
      )}
    </main>
  );
};

export default BlogGrid;
