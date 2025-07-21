// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import React from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b shadow px-4 py-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
      {/* Logo (Left) */}
      <div className="flex items-center space-x-2 justify-center sm:justify-start">
        <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
      </div>

      {/* Center Title */}
      <div className="text-center sm:flex-1">
        <h1 className="text-base sm:text-lg font-bold text-blue-800 leading-snug">
          Comprehensive Educational Development And Research Foundation
          <div className="text-[11px] sm:text-xs text-black italic animate-pulse font-semibold">
            — Since 2009 —
          </div>
        </h1>
      </div>

      {/* Right: User Info */}
      <div className="flex items-center justify-center sm:justify-end space-x-4 text-sm">
        {user?.firstName && (
          <span className="text-gray-600">Hello, {user.firstName}</span>
        )}
        {user ? (
          <button
            onClick={logout}
            className="text-red-500 hover:underline"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="text-blue-500 hover:underline"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
