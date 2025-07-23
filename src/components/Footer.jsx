import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
     <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
    <footer className="border-t border-gray-200 text-sm text-gray-700 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">CEDRF Launchpad</h3>
          <p className="text-gray-600 leading-relaxed">
            Empowering future developers through structured learning and real-world mentorship.
          </p>
          <p className="mt-3 text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} CEDRF Launchpad. All rights reserved.
          </p>
        </div>

        {/* Quick Links */}
      <div>
          <h4 className="text-lg font-medium text-gray-800 mb-3">Quick Links</h4>
          <ul className="space-y-2">
          
            <li>
              <Link
                to="/catalog"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Catalog
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Login / Signup
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal & Support */}
        <div>
          <h4 className="text-lg font-medium text-gray-800 mb-3">Legal & Support</h4>
          <ul className="space-y-2">
            <li>
              <Link
                to="/contact"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Terms of Use
              </Link>
            </li>
            <li>
              <Link
                to="/cancellation-policy"
                className="hover:text-blue-600 transition-colors duration-200"
              >
                Cancellation & Refund Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center py-3 text-xs text-gray-500 border-t border-gray-200">
        Designed with <span className="text-red-500">❤️</span> by AU Team
      </div>
    </footer>
    </>
  );
}