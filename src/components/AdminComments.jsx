import React, { useState, useEffect } from 'react';
import './AdminComments.css';

const AdminComments = () => {
  const [allComments, setAllComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState('all');

  useEffect(() => {
    loadAllComments();
  }, []);

  useEffect(() => {
    filterComments();
  }, [allComments, searchTerm, selectedPost]);

  const loadAllComments = () => {
    const comments = [];
    const posts = ['1', '2', '3', '4', '5']; // Add your post IDs here
    
    posts.forEach(postId => {
      const savedComments = localStorage.getItem(`comments_${postId}`);
      if (savedComments) {
        const postComments = JSON.parse(savedComments);
        comments.push(...postComments);
      }
    });
    
    setAllComments(comments);
  };

  const filterComments = () => {
    let filtered = allComments;

    if (searchTerm) {
      filtered = filtered.filter(comment =>
        comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comment.postTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedPost !== 'all') {
      filtered = filtered.filter(comment => comment.postId === selectedPost);
    }

    setFilteredComments(filtered);
  };

  const deleteComment = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      const updatedComments = allComments.filter(comment => comment.id !== commentId);
      setAllComments(updatedComments);
      
      // Update localStorage for the specific post
      const commentToDelete = allComments.find(comment => comment.id === commentId);
      if (commentToDelete) {
        const postComments = allComments.filter(comment => 
          comment.postId === commentToDelete.postId && comment.id !== commentId
        );
        localStorage.setItem(`comments_${commentToDelete.postId}`, JSON.stringify(postComments));
      }
    }
  };

  const getUniquePosts = () => {
    const posts = [...new Set(allComments.map(comment => comment.postId))];
    return posts.map(postId => {
      const comment = allComments.find(c => c.postId === postId);
      return {
        id: postId,
        title: comment ? comment.postTitle : `Post ${postId}`
      };
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="admin-comments">
      <div className="admin-header">
        <h1>Comments Management</h1>
        <p>Total Comments: {allComments.length}</p>
      </div>

      <div className="admin-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search comments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="post-filter">
          <select
            value={selectedPost}
            onChange={(e) => setSelectedPost(e.target.value)}
          >
            <option value="all">All Posts</option>
            {getUniquePosts().map(post => (
              <option key={post.id} value={post.id}>
                {post.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="comments-list">
        {filteredComments.length === 0 ? (
          <div className="no-comments">
            <p>No comments found.</p>
          </div>
        ) : (
          filteredComments.map(comment => (
            <div key={comment.id} className="admin-comment-item">
              <div className="comment-header">
                <div className="comment-author">
                  <div className="author-avatar">
                    {comment.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="author-info">
                    <h4>{comment.name}</h4>
                    <span className="comment-email">{comment.email}</span>
                    <span className="comment-date">{formatDate(comment.date)}</span>
                  </div>
                </div>
                <div className="comment-actions">
                  <button
                    className="delete-btn"
                    onClick={() => deleteComment(comment.id)}
                    title="Delete Comment"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              
              <div className="comment-post">
                <strong>Post:</strong> {comment.postTitle}
              </div>
              
              <div className="comment-content">
                <p>{comment.comment}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminComments;

