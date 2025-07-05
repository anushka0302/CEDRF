import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b shadow px-4 py-2 flex items-center justify-between">
      {/* Logo (Left) */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
      </div>

      {/* Center Title */}
      <div className="flex-1 text-center">
        <h1 className="text-lg font-bold text-blue-800">
          Comprehensive Education Development And Research Foundation <span className="italic text-black align-sub text-xs ml-1">since 2009</span>
        </h1>
      </div>

      {/* Right: User Info */}
      <div className="flex items-center space-x-4">
        {user && <span className="text-sm text-gray-600">Hello, {user.firstName || user.username}</span>}
        {user ? (
          <button
            onClick={logout}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="text-sm text-blue-500 hover:underline"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
