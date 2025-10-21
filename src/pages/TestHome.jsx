import React from 'react';

const TestHome = () => {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: 'red', fontSize: '2rem', marginBottom: '2rem' }}>
        TEST PAGE - All Components Should Be Visible
      </h1>
      
      <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: 'white', borderRadius: '8px' }}>
        <h2>Navigation Test</h2>
        <p>Navigation should be visible at the top</p>
      </div>
      
      <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#667eea', color: 'white', borderRadius: '8px' }}>
        <h2>Hero Section Test</h2>
        <p>This should be visible with gradient background</p>
      </div>
      
      <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#ffeaa7', borderRadius: '8px' }}>
        <h2>About Section Test</h2>
        <p>This should be visible with yellow background</p>
      </div>
      
      <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: 'white', borderRadius: '8px' }}>
        <h2>Features Section Test</h2>
        <p>This should be visible with white background</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>Feature 1</div>
          <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>Feature 2</div>
          <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>Feature 3</div>
        </div>
      </div>
      
      <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: 'white', borderRadius: '8px' }}>
        <h2>Hours Section Test</h2>
        <p>This should be visible with white background</p>
      </div>
      
      <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#667eea', color: 'white', borderRadius: '8px' }}>
        <h2>Contact Section Test</h2>
        <p>This should be visible with blue background</p>
      </div>
      
      <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: 'white', borderRadius: '8px' }}>
        <h2>Map Section Test</h2>
        <p>This should be visible with white background</p>
      </div>
      
      <div style={{ padding: '1rem', backgroundColor: '#1a1a1a', color: 'white', borderRadius: '8px' }}>
        <h2>Footer Test</h2>
        <p>This should be visible with dark background</p>
      </div>
    </div>
  );
};

export default TestHome;







