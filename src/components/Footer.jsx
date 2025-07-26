import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 text-sm font-serif">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h3 className="text-xl font-serif italic text-white mb-2 tracking-tight">
            CEDRF
          </h3>
          <p className="text-gray-400 font-serif italic text-xs mb-2">
            Comprehensive Educational Development and Research Foundation
          </p>
          <p className="text-gray-400 leading-relaxed text-sm">
            Empowering future developers through structured learning and
            real-world mentorship.
          </p>
          <p className="mt-4 text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} CEDRF. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-3">
            <li>
              <Link
                to="/catalog"
                className="text-gray-300 hover:text-red-400 transition-colors duration-200"
              >
                Catalog
              </Link>
            </li>
            <li>
              <Link
                to="/jobs"
                className="text-gray-300 hover:text-red-400 transition-colors duration-200"
              >
                Jobs
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-300 hover:text-red-400 transition-colors duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="text-gray-300 hover:text-red-400 transition-colors duration-200"
              >
                Login / Signup
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal & Support */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Legal & Support
          </h4>
          <ul className="space-y-3">
            <li>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-red-400 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="text-gray-300 hover:text-red-400 transition-colors duration-200"
              >
                Terms of Use
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="text-gray-300 hover:text-red-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/cancellation-policy"
                className="text-gray-300 hover:text-red-400 transition-colors duration-200"
              >
                Cancellation & Refund Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center py-4 text-xs text-gray-500 border-t border-gray-800">
        <p>
          Designed with <span className="text-red-400">❤️</span> by AU Team
        </p>
        <p className="mt-1 text-gray-600">Since 2009</p>
      </div>
    </footer>
  );
}
