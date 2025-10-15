import React from 'react';
import ShareButtons from './ShareButtons';

const ShareTest = () => {
  const testUrl = 'https://jumbo-convenience.com/blog/test-post';
  const testTitle = 'Test Post from Jumbo Convenience Store';
  const testDescription = 'This is a test post to verify share functionality works properly.';

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Share Button Test</h1>
      <p>Testing share functionality with the following data:</p>
      <ul>
        <li><strong>URL:</strong> {testUrl}</li>
        <li><strong>Title:</strong> {testTitle}</li>
        <li><strong>Description:</strong> {testDescription}</li>
      </ul>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Share Buttons Test</h2>
        <ShareButtons 
          url={testUrl}
          title={testTitle}
          description={testDescription}
        />
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Manual Test Links</h2>
        <p>Click these links to test sharing manually:</p>
        <ul>
          <li>
            <a 
              href={`https://www.facebook.com/sharer.php?u=${encodeURIComponent(testUrl)}&quote=${encodeURIComponent(testTitle + ' - ' + testDescription)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook Share (Manual) - With Quote
            </a>
          </li>
          <li>
            <a 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(testTitle + '\n\n' + testDescription + '\n\n' + testUrl)}&via=JumboConvenience`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter Share (Manual) - With Full Text
            </a>
          </li>
          <li>
            <a 
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(testUrl)}&title=${encodeURIComponent(testTitle)}&summary=${encodeURIComponent(testDescription)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn Share (Manual) - With Summary
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ShareTest;
