// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // you can also use heroicons or inline svg

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white border-b shadow px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
        </div>

        {/* Center Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-base sm:text-lg font-bold text-blue-800 leading-snug">
            Comprehensive Educational Development And Research Foundation
            <div className="text-[11px] sm:text-xs text-black italic animate-pulse font-semibold">
              — Since 2009 —
            </div>
          </h1>
        </div>

        {/* Right: Hamburger Icon */}
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center font-medium space-x-6 text-sm">
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
