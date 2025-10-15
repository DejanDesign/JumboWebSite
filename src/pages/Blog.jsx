import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import BlogHero from '../components/BlogHero';
import BlogSearch from '../components/BlogSearch';
import BlogGrid from '../components/BlogGrid';
import Footer from '../components/Footer';
import blogApi from '../services/blogApi';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Scroll to top immediately when component mounts
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    loadBlogData();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchQuery, selectedCategory]);

  const loadBlogData = async () => {
    try {
      setLoading(true);
      const [postsData, categoriesData] = await Promise.all([
        blogApi.fetchBlogPosts(),
        Promise.resolve(blogApi.getCategories())
      ]);
      setPosts(postsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading blog data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    try {
      let filtered = [...posts];
      
      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(post => 
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query)
        );
      }
      
      // Filter by category
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(post => 
          post.category === selectedCategory
        );
      }
      
      setFilteredPosts(filtered);
    } catch (error) {
      console.error('Error filtering posts:', error);
      setFilteredPosts(posts);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="blog-page">
      <Navigation />
      <BlogHero />
      <BlogSearch 
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        categories={categories}
        selectedCategory={selectedCategory}
      />
      <BlogGrid 
        posts={filteredPosts}
        loading={loading}
      />
      <Footer />
    </div>
  );
};

export default Blog;



