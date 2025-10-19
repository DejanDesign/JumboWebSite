import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import BlogPostContent from '../components/BlogPostContent';
import FloatingShareButton from '../components/FloatingShareButton';
import Footer from '../components/Footer';
import { getPosts } from '../services/wordpressApi';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Scroll to top and load post when component mounts or ID changes
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    loadPost();
  }, [id]);

  const loadPost = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all posts from WordPress
      const postsData = await getPosts({ per_page: 100 });
      
      // Transform and find the specific post
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
      
      const foundPost = transformedPosts.find(p => p.id === parseInt(id));
      
      if (foundPost) {
        setPost(foundPost);
      } else {
        setError('Post not found');
      }
    } catch (err) {
      console.error('Error loading post:', err);
      setError('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToBlog = () => {
    navigate('/blog');
  };

  if (loading) {
    return (
      <div className="blog-post-page">
        <Navigation />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading post...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="blog-post-page">
        <Navigation />
        <div className="error-container">
          <h1>Post Not Found</h1>
          <p>The blog post you're looking for doesn't exist or has been removed.</p>
          <button onClick={handleBackToBlog} className="btn btn-primary">
            Back to Blog
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="blog-post-page">
      <Navigation />
      <BlogPostContent post={post} onBack={handleBackToBlog} />
      <FloatingShareButton 
        url={window.location.href}
        title={post.title}
        description={post.excerpt || 'Check out this post from Jumbo Convenience Store'}
      />
      <Footer />
    </div>
  );
};

export default BlogPost;




