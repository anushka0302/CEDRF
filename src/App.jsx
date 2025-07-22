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
import { Helmet } from "react-helmet";
function AppWrapper() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const { loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-20 text-xl font-bold">Loading...</div>;
  }

  return (
    <>
          <Helmet>
        <title>CEDRF – Comprehensive Educational Development and Research Foundation</title>
        <meta name="description" content="Empowering India with digital literacy, innovation, and education since 2009. Join CEDRF's mission to uplift communities nationwide." />
        <meta name="keywords" content="CEDRF, Educational Foundation, Skill Development, Research, Digital Literacy, Innovation, Youth Empowerment, India, Education NGO, USA, World-wide, DSA, FAANG, Google, Microsoft, MNC, WWW, Job, Placement, Software Engineering, SDA, Gate, Btech, BCA, Mtech, MCA, Computer Science, DSA Patterns, Array, String, DP, Binary Tree, Queue, Stack, Linked list, Recursion, Advanced logic, OA, logical thinking, abstract thinking, logic building, easy DSA, DSA course, DSA patterns, Data Structures and Algorithms, DSA for coding interviews, Learn DSA online, DSA roadmap, DSA with JavaScript / Python / C++, Master DSA, data structures and algorithms for beginners, DSA pattern course for placements, DSA questions with solutions, system design and DSA, DSA cheat sheet, crack coding interviews with DSA, top DSA patterns for interviews, DSA in 30 days roadmap, DSA live classes with mentorship, DSA course with projects, DSA in JavaScript for frontend developers, DSA with Python for data science, DSA for full-stack developers, DSA using C++ for CP, Leetcode patterns in DSA"
        />

        <link rel="canonical" href="https://www.cedrf.com/" />
        <meta property="og:image" content="https://www.cedrf.com/logo.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://www.cedrf.com/logo.png" />
      </Helmet>

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
