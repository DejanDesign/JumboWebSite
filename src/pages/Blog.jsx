import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import BlogHero from '../components/BlogHero';
import BlogSearch from '../components/BlogSearch';
import BlogGrid from '../components/BlogGrid';
import Footer from '../components/Footer';
import { getPosts } from '../services/wordpressApi';

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
      const postsData = await getPosts({ per_page: 100 });
      
      // Transform WordPress posts to match expected format
      const transformedPosts = postsData && postsData.length > 0 ? postsData.map((post, index) => ({
        id: post.id,
        title: post.title.rendered,
        excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
        category: post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0] && post._embedded['wp:term'][0][0] ? post._embedded['wp:term'][0][0].name : 'General',
        date: post.date,
        author: post._embedded && post._embedded.author && post._embedded.author[0] ? post._embedded.author[0].name : 'Jumbo Team',
        readTime: '5 min read',
        image: '📝',
        imageUrl: post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0] ? post._embedded['wp:featuredmedia'][0].source_url : null,
        featured: index === 0,
        content: post.content.rendered
      })) : [];
      
      setPosts(transformedPosts);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(transformedPosts.map(p => p.category))];
      const categoriesData = [
        { id: 'all', name: 'All' },
        ...uniqueCategories.map(cat => ({ id: cat.toLowerCase(), name: cat }))
      ];
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



