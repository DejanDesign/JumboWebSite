import React, { useState } from 'react';
import './ShareButtons.css';

const ShareButtons = ({ url, title, description, className = '' }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = async () => {
    const processedUrl = url.startsWith('http') ? url : `https://${url}`;
    
    try {
      await navigator.clipboard.writeText(processedUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = processedUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <div className={`share-buttons-container ${className}`}>
      <div className="share-buttons">
        <button 
          className={`share-btn copy ${copySuccess ? 'success' : ''}`} 
          onClick={copyToClipboard}
          title="Copy Link"
          aria-label="Copy Link"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            {copySuccess ? (
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            ) : (
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
            )}
          </svg>
          <span>{copySuccess ? 'Copied!' : 'Copy Link'}</span>
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;
