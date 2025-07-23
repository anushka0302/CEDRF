import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobileView(width < 1080); // Slightly increased for better spacing
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <>
     <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
    <nav className="bg-white border-b shadow px-4 py-2 w-full relative z-50">
      {/* Outer Wrapper for Navbar */}
      <div className="flex items-center justify-between w-full relative">
        {/* Logo (left) */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
        </div>

        {/* Center: Title and subtitle */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-[10px] sm:text-sm md:text-base font-bold text-blue-800 leading-tight break-words whitespace-pre-wrap">
            Comprehensive Educational Development<br className="sm:hidden" />
            <span className="inline-block">&nbsp;And Research Foundation</span>
            <div className="text-[9px] sm:text-xs text-black italic animate-pulse font-semibold mt-1">
              — Since 2009 —
            </div>
          </h1>
        </div>

        {/* Right side: Links or Hamburger */}
        <div className="flex items-center">
          {isMobileView ? (
            <button className="z-10" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          ) : (
            <div className="flex items-center space-x-4 font-medium text-sm">
              <Link
                to="/jobs"
                className={`${
                  isActive('/jobs') ? 'text-blue-600 underline' : 'text-gray-600'
                } hover:text-blue-600 hover:underline transition`}
              >
                Jobs
              </Link>
              <Link
                to="/about"
                className={`${
                  isActive('/about') ? 'text-blue-600 underline' : 'text-gray-600'
                } hover:text-blue-600 hover:underline transition`}
              >
                About
              </Link>
              {user?.firstName && (
                <span className="text-gray-600">Hello, {user.firstName}</span>
              )}
              {user ? (
                <button
                  onClick={logout}
                  className="text-red-500 hover:text-red-700 hover:underline transition"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-blue-500 hover:text-blue-700 hover:underline transition"
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Dropdown - aligned to right */}
      {isMobileView && menuOpen && (
        <div className="absolute right-4 mt-2 flex flex-col items-end space-y-3 text-sm font-medium">
          <Link
            to="/jobs"
            onClick={() => setMenuOpen(false)}
            className={`${
              isActive('/jobs') ? 'text-blue-600 underline' : 'text-gray-600'
            } hover:text-blue-600 hover:underline`}
          >
            Jobs
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className={`${
              isActive('/about') ? 'text-blue-600 underline' : 'text-gray-600'
            } hover:text-blue-600 hover:underline`}
          >
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
              className="text-red-500 hover:text-red-700 hover:underline"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="text-blue-500 hover:text-blue-700 hover:underline"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
    </>
  );
}
