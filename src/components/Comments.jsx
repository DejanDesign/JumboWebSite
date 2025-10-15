import React, { useState, useEffect } from 'react';
import './Comments.css';

const Comments = ({ postId, postTitle }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load comments from localStorage on component mount
  useEffect(() => {
    const savedComments = localStorage.getItem(`comments_${postId}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [postId]);

  // Save comments to localStorage whenever comments change
  useEffect(() => {
    localStorage.setItem(`comments_${postId}`, JSON.stringify(comments));
  }, [comments, postId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewComment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newComment.name.trim() || !newComment.email.trim() || !newComment.comment.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const comment = {
      id: Date.now(),
      name: newComment.name.trim(),
      email: newComment.email.trim(),
      comment: newComment.comment.trim(),
      date: new Date().toISOString(),
      postId: postId,
      postTitle: postTitle
    };

    setComments(prev => [comment, ...prev]);
    setNewComment({ name: '', email: '', comment: '' });
    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="comments-section">
      <h3 className="comments-title">
        Comments ({comments.length})
      </h3>

      {/* Comment Form */}
      <div className="comment-form-container">
        <h4>Leave a Comment</h4>
        <form onSubmit={handleSubmit} className="comment-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newComment.name}
                onChange={handleInputChange}
                required
                placeholder="Your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={newComment.email}
                onChange={handleInputChange}
                required
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="comment">Comment *</label>
            <textarea
              id="comment"
              name="comment"
              value={newComment.comment}
              onChange={handleInputChange}
              required
              rows="5"
              placeholder="Share your thoughts about this post..."
            />
          </div>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
        
        {showSuccess && (
          <div className="success-message">
            ✅ Thank you! Your comment has been posted.
          </div>
        )}
      </div>

      {/* Comments List */}
      <div className="comments-list">
        {comments.length === 0 ? (
          <div className="no-comments">
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <div className="comment-author">
                  <div className="author-avatar">
                    {comment.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="author-info">
                    <h5 className="author-name">{comment.name}</h5>
                    <span className="comment-date">
                      {formatDate(comment.date)}
                    </span>
                  </div>
                </div>
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

export default Comments;

