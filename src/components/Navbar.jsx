import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1080);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-4 py-3 w-full relative z-50">
      <div className="flex items-center justify-between w-full relative">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain "
          />
          <div className="hidden sm:block">
            <h1 className="text-white text-lg font-serif italic">CEDRF</h1>
            <p className="text-gray-500 text-xs font-serif italic leading-tight">
              Since 2009
            </p>
          </div>
        </div>

        {/* Center Title - Mobile */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center sm:hidden">
          <h1 className="text-white text-sm font-serif italic">CEDRF</h1>
          <p className="text-gray-500 text-xs font-serif italic">Since 2009</p>
        </div>

        {/* Desktop Navigation */}
        {!isMobileView ? (
          <div className="flex items-center space-x-6 italic ">
            <Link
              to="/jobs"
              className={`transition-colors ${
                isActive("/jobs")
                  ? "text-red-400 "
                  : "text-gray-300 hover:text-red-400"
              }`}
            >
              Jobs
            </Link>
            <Link
              to="/about"
              className={`transition-colors ${
                isActive("/about")
                  ? "text-red-400 "
                  : "text-gray-300 hover:text-red-400"
              }`}
            >
              About
            </Link>
            {user?.firstName && (
              <span className="text-gray-400 text-sm">
                Hello, {user.firstName}
              </span>
            )}
            {user ? (
              <button
                onClick={logout}
                className="text-red-400 hover:text-red-300 transition-colors font-semibold"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-red-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-red-600 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        ) : (
          /* Mobile Menu Button */
          <button
            className="z-10 text-gray-300 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileView && menuOpen && (
        <div className="absolute right-4 top-full mt-2 bg-black border border-gray-800 rounded-lg shadow-lg py-3 px-4 min-w-[160px]">
          <div className="flex flex-col space-y-3 text-sm">
            <Link
              to="/jobs"
              onClick={() => setMenuOpen(false)}
              className={`text-left transition-colors ${
                isActive("/jobs")
                  ? "text-red-400 font-semibold"
                  : "text-gray-300 hover:text-red-400"
              }`}
            >
              Jobs
            </Link>
            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className={`text-left transition-colors ${
                isActive("/about")
                  ? "text-red-400 font-semibold"
                  : "text-gray-300 hover:text-red-400"
              }`}
            >
              About
            </Link>
            {user?.firstName && (
              <div className="border-t border-gray-800 pt-3">
                <span className="text-gray-400 text-sm">
                  Hello, {user.firstName}
                </span>
              </div>
            )}
            <div
              className={user?.firstName ? "" : "border-t border-gray-800 pt-3"}
            >
              {user ? (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    logout();
                  }}
                  className="text-red-400 hover:text-red-300 transition-colors font-semibold text-left w-full"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-red-600 transition-colors block text-center"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
