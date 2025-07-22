import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  // Handle screen resize to toggle hamburger dynamically
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobileView(width < 1000); // Switch to hamburger if width < 1000px
    };

    handleResize(); // Check on load
    window.addEventListener('resize', handleResize); // Update on resize
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="bg-white border-b shadow px-4 py-2 w-full relative z-50">
      <div className="flex items-center justify-between w-full">
        {/* Logo (left) */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
        </div>

        {/* Center title */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-[10px] sm:text-sm md:text-base font-bold text-blue-800 leading-tight break-words whitespace-pre-wrap">
            Comprehensive Educational Development<br className="sm:hidden" />
            <span className="inline-block">&nbsp;And Research Foundation</span>
            <div className="text-[9px] sm:text-xs text-black italic animate-pulse font-semibold mt-1">
              — Since 2009 —
            </div>
          </h1>
        </div>

        {/* Right side */}
        <div className="flex items-center">
          {/* Hamburger icon for mobile/tablet/medium screens */}
          {isMobileView ? (
            <button
              className="z-10"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          ) : (
            <div className="flex items-center space-x-4 font-medium text-sm">
              <Link to="/jobs" className="text-gray-600 hover:underline transition">
                Jobs
              </Link>
              <Link to="/about" className="text-gray-600 hover:underline transition">
                About
              </Link>
              {user?.firstName && (
                <span className="text-gray-600">Hello, {user.firstName}</span>
              )}
              {user ? (
                <button onClick={logout} className="text-red-500 hover:underline transition">
                  Logout
                </button>
              ) : (
                <Link to="/login" className="text-blue-500 hover:underline transition">
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileView && menuOpen && (
        <div className="mt-2 flex flex-col items-center space-y-3 text-sm font-medium">
          <Link to="/jobs" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:underline">
            Jobs
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} className="text-gray-600 hover:underline">
            About
          </Link>
          {user?.firstName && (
            <span className="text-gray-600">Hello, {user.firstName}</span>
          )}
          {user ? (
            <button
              onClick={() => {
                setMenuOpen(false);
                logout();
              }}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="text-blue-500 hover:underline">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
