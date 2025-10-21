import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TestHome from './pages/TestHome'
import ShareTest from './components/ShareTest'
import AdminComments from './components/AdminComments'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import CookiePolicy from './pages/CookiePolicy'
import Accessibility from './pages/Accessibility'
import CookieConsent from './components/CookieConsent'
import { BusinessProvider } from './contexts/BusinessContext'
import './App.css'

function App() {
  return (
    <BusinessProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<TestHome />} />
            <Route path="/share-test" element={<ShareTest />} />
            <Route path="/admin/comments" element={<AdminComments />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/accessibility" element={<Accessibility />} />
          </Routes>
          <CookieConsent />
        </div>
      </Router>
    </BusinessProvider>
  )
}

export default App
