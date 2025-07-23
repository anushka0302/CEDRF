import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
        <div className="flex items-center justify-between px-4 py-2 sm:px-6 xl:px-12">
          {/* Left: Logo */}
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="CEDRF" className="h-10 w-auto" />
          </div>

          {/* Center: Title & Subtitle */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 text-center pointer-events-none whitespace-nowrap">
            <div className="text-blue-800 font-semibold text-sm sm:text-base md:text-lg">
              Comprehensive Educational Development And Research Foundation
            </div>
            <div className="text-xs italic text-gray-600 animate-pulse">— Since 2009 —</div>
          </div>

          {/* Right: Nav Links (hidden below xl to prevent overlap) */}
          <div className="hidden xl:flex items-center space-x-6">
            <NavLink to="/jobs" label="Jobs" currentPath={location.pathname} />
            <NavLink to="/about" label="About" currentPath={location.pathname} />
            <span className="text-gray-800">Hello, Anushka</span>
            <button className="text-red-600 hover:text-red-800">Logout</button>
          </div>

          {/* Hamburger icon on smaller screens (below xl) */}
          <div className="xl:hidden">
            <button onClick={() => setIsMenuOpen(true)} className="text-gray-700 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-md z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-black">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col px-4 py-4 space-y-4">
          <Link to="/jobs" className="text-gray-700 hover:text-blue-600 " onClick={() => setIsMenuOpen(false)}>Jobs</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600 " onClick={() => setIsMenuOpen(false)}>About</Link>
          <span className="text-gray-800">Hello, Anushka</span>
          <button className="text-red-600 hover:text-red-800" onClick={() => setIsMenuOpen(false)}>Logout</button>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Push content below navbar */}
      <div className="pt-16" />
    </>
  );
}

// 🔁 Helper to show underline on active link
function NavLink({ to, label, currentPath }) {
  const isActive = currentPath === to;
  return (
    <Link
      to={to}
      className={`${
        isActive
          ? "border-b-2 border-blue-600 text-blue-700"
          : "text-gray-700"
      } hover:text-blue-600`}
    >
      {label}
    </Link>
  );
}
