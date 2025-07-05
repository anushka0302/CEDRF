import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PatternPage from './pages/PatternPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import data from './data/index.js';
import DisableInspect from './components/DisableInspect';

// Wrapper component to access location and apply conditional navbar
function AppWrapper() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 select-none">
      {!isLoginPage && <Navbar />}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home data={data} />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/patterns/:topic"
            element={
              <PrivateRoute>
                <PatternPage data={data} />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
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
