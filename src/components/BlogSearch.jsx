import React from 'react';
import './BlogSearch.css';

const BlogSearch = ({ onSearch, onCategoryChange, categories, selectedCategory }) => {
  return (
    <section className="search-section">
      <div className="search-container">
        <div className="search-box">
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search articles..." 
            onChange={(e) => onSearch(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>
        <div className="category-filter">
          {categories.map((category) => (
            <button 
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => onCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSearch;











