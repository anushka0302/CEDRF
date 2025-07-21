// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white border-b shadow px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
        </div>

        {/* Center Title */}
        <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 text-center px-2">
          <h1 className="text-[10px] sm:text-base font-bold text-blue-800 leading-tight break-words">
            Comprehensive Educational Development
            <br className="sm:hidden" />
            And Research Foundation
            <div className="text-[9px] sm:text-xs text-black italic animate-pulse font-semibold mt-1">
              — Since 2009 —
            </div>
          </h1>
        </div>

        {/* Hamburger Icon */}
        <div className="sm:hidden z-10">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
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
            <button
              onClick={logout}
              className="text-red-500 hover:underline transition"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-blue-500 hover:underline transition">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden mt-4 flex flex-col items-center space-y-3 text-sm font-medium">
          <Link to="/jobs" onClick={toggleMenu} className="text-gray-600 hover:underline">
            Jobs
          </Link>
          <Link to="/about" onClick={toggleMenu} className="text-gray-600 hover:underline">
            About
          </Link>
          {user?.firstName && (
            <span className="text-gray-600">Hello, {user.firstName}</span>
          )}
          {user ? (
            <button
              onClick={() => {
                toggleMenu();
                logout();
              }}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={toggleMenu}
              className="text-blue-500 hover:underline"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
