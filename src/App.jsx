// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PatternPage from './pages/PatternPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import CatalogPage from './components/CatalogPage.jsx';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import data from './data/index.js';
import DisableInspect from './components/DisableInspect';
import Footer from './components/Footer';
import ContactUs from './pages/ContactUs.jsx';
import TermsOfUse from './pages/TermsOfUse.jsx';
import CancellationPolicyPage from './pages/CancellationPolicyPage.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import MentoringFormPage from './pages/MentoringFormPage.jsx';
import AboutCEDRF from './pages/AboutCEDRF.jsx';
import JobsPage from './pages/JobPage.jsx';

function AppWrapper() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const { loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-20 text-xl font-bold">Loading...</div>;
  }

  return (
    <>
       

    <div className="min-h-screen bg-gray-50 text-gray-900 select-none">
      {!isLoginPage && <Navbar />}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/about" element={<AboutCEDRF />} />
          <Route path="/" element={<PrivateRoute requirePayment={true}><Home data={data} /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/patterns/:topic" element={<PrivateRoute><PatternPage data={data} /></PrivateRoute>} />
           <Route path="/contact" element={<PrivateRoute><ContactUs/></PrivateRoute>} />
            <Route path="/terms" element={<PrivateRoute><TermsOfUse/></PrivateRoute>} />
             <Route path="/cancellation-policy" element={<PrivateRoute><CancellationPolicyPage/></PrivateRoute>} />
               <Route path="/privacy-policy" element={<PrivateRoute><PrivacyPolicy/></PrivateRoute>} />
<Route path="/mentoring" element={<PrivateRoute><MentoringFormPage/></PrivateRoute>} />
<Route path="/jobs" element={<PrivateRoute><JobsPage/></PrivateRoute>} />

        </Routes>

        
        
      </div>
    </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <DisableInspect />
        <AppWrapper />
      </AuthProvider>
    </Router>
  );
}
