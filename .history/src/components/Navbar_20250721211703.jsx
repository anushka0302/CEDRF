// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b shadow px-4 py-2 w-full">
      {/* Top bar with logo, title, and hamburger */}
      <div className="flex items-center justify-between relative">
        {/* Logo (left) */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
        </div>

        {/* Center title */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center px-1 w-[80%] sm:w-auto">
          <h1 className="text-[10px] sm:text-base font-bold text-blue-800 leading-tight break-words">
            Comprehensive Educational Development

            <br className="sm:hidden" />
                      And Research Foundation
            <div className="text-[9px] sm:text-xs text-black italic animate-pulse font-semibold mt-1">
              — Since 2009 —
            </div>
          </h1>
        </div>

        {/* Hamburger icon (right for mobile) */}
        <div className="sm:hidden z-10">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop menu (right) */}
        <div className="hidden sm:flex items-center font-medium space-x-6 text-sm z-10">
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
      </div>

      {/* Mobile menu (dropdown below) */}
      {menuOpen && (
        <div className="sm:hidden mt-3 flex flex-col items-center space-y-3 text-sm font-medium">
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
