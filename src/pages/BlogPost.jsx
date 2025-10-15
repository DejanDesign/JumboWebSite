import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import BlogPostContent from '../components/BlogPostContent';
import Comments from '../components/Comments';
import FloatingShareButton from '../components/FloatingShareButton';
import Footer from '../components/Footer';
import blogApi from '../services/blogApi';
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
      
      // Try to fetch the specific post
      const posts = await blogApi.fetchBlogPosts();
      const foundPost = posts.find(p => p.id === parseInt(id));
      
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
      <div className="container">
        <Comments 
          postId={post.id} 
          postTitle={post.title}
        />
      </div>
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




