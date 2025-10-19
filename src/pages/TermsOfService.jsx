import React from 'react';
import LegalLayout from '../components/LegalLayout';

const TermsOfService = () => {
  return (
    <LegalLayout title="Terms of Service">
      <div className="container">
        <div className="legal-content">
          <p><em>Last updated: January 2025</em></p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using Jumbo Convenience Store's website and services, you accept and agree to be bound by the terms and provision of this agreement.</p>
          
          <h2>2. Use License</h2>
          <p>Permission is granted to temporarily download one copy of the materials on Jumbo Convenience Store's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose or for any public display</li>
            <li>Attempt to reverse engineer any software contained on the website</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
          </ul>
          
          <h2>3. Disclaimer</h2>
          <p>The materials on Jumbo Convenience Store's website are provided on an 'as is' basis. Jumbo Convenience Store makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          
          <h2>4. Limitations</h2>
          <p>In no event shall Jumbo Convenience Store or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Jumbo Convenience Store's website, even if Jumbo Convenience Store or an authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.</p>
          
          <h2>5. Accuracy of Materials</h2>
          <p>The materials appearing on Jumbo Convenience Store's website could include technical, typographical, or photographic errors. Jumbo Convenience Store does not warrant that any of the materials on its website are accurate, complete, or current. Jumbo Convenience Store may make changes to the materials contained on its website at any time without notice. However, Jumbo Convenience Store does not make any commitment to update the materials.</p>
          
          <h2>6. Links</h2>
          <p>Jumbo Convenience Store has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Jumbo Convenience Store of the site. Use of any such linked website is at the user's own risk.</p>
          
          <h2>7. Modifications</h2>
          <p>Jumbo Convenience Store may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.</p>
          
          <h2>8. Governing Law</h2>
          <p>These terms and conditions are governed by and construed in accordance with the laws of Malta and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.</p>
          
          <h2>9. Store Policies</h2>
          <p>When visiting our physical store:</p>
          <ul>
            <li>We reserve the right to refuse service to anyone</li>
            <li>All sales are final unless otherwise stated</li>
            <li>Prices are subject to change without notice</li>
            <li>We are not responsible for lost or stolen items</li>
            <li>Children must be supervised by an adult</li>
          </ul>
          
          <h2>10. Contact Information</h2>
          <p>If you have any questions about these Terms of Service, please contact us:</p>
          <ul>
            <li>Email: support@jumbo-convenience.com</li>
            <li>Phone: +356 7706 5767</li>
            <li>Address: Triq Il-Qolla Is-Safra, Iż-Żebbuġ, Gozo, Malta</li>
          </ul>
        </div>
      </div>
    </LegalLayout>
  );
};

export default TermsOfService;
