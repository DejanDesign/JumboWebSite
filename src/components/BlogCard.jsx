import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogCard.css';

const BlogCard = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${post.id}`);
  };

  return (
    <div 
      className="blog-card" 
      data-category={post.category.toLowerCase()}
      onClick={handleClick}
    >
      <div className="blog-image">
        {post.imageUrl ? (
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="blog-image-img"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className="blog-image-placeholder" style={{ display: post.imageUrl ? 'none' : 'flex' }}>
          {post.image}
        </div>
      </div>
      <div className="blog-content">
        <div className="blog-meta">
          <span className="blog-category">{post.category.toUpperCase()}</span>
          <span className="blog-date">📅 {new Date(post.date).toLocaleDateString()}</span>
        </div>
        <h3 className="blog-title">{post.title}</h3>
        <p className="blog-excerpt">{post.excerpt}</p>
        <div className="blog-author">
          <div className="author-avatar">👨‍💼</div>
          <div className="author-info">
            <div className="author-name">{post.author}</div>
            <div className="read-time">{post.readTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
