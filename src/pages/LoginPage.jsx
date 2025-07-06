import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginPage() {
  const { login } = useAuth();
  const [isSignup, setIsSignup] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  const [forgotMode, setForgotMode] = useState(false);
  const [dobCheck, setDobCheck] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSignup = (e) => {
    e.preventDefault();
    const newUser = { firstName, lastName, dob, email, password };
    localStorage.setItem(`user-${email}`, JSON.stringify(newUser));
    toast.success('Account created successfully! Please login.');
    setIsSignup(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const saved = localStorage.getItem(`user-${email}`);
    if (!saved) {
      toast.error('User not found. Please sign up.');
      return;
    }
    const userData = JSON.parse(saved);
    if (userData.password !== password) {
      toast.error('Incorrect password');
      return;
    }
    login(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    window.location.href = '/';
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const saved = localStorage.getItem(`user-${email}`);
    if (!saved) {
      toast.error('User not found. Please sign up.');
      return;
    }
    const userData = JSON.parse(saved);
    if (userData.dob !== dobCheck) {
      toast.error('Date of birth does not match.');
      return;
    }
    userData.password = newPassword;
    localStorage.setItem(`user-${email}`, JSON.stringify(userData));
    toast.success('Password updated. You can now login.');
    setForgotMode(false);
    setIsSignup(false);
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-100 to-blue-200 flex items-center justify-center overflow-hidden">
      <ToastContainer />
      {showIntro ? (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-transparent">
          <img src={logo} alt="Logo" className="w-24 h-24 animate-logo-bounceup" />
        </div>
      ) : (
        <div className="bg-white shadow-xl rounded-lg px-8 py-10 w-full max-w-sm animate-fadein z-10">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
            {forgotMode ? 'Reset Password' : isSignup ? 'Sign Up' : 'Login'}
          </h2>

          <form onSubmit={forgotMode ? handleForgotPassword : isSignup ? handleSignup : handleLogin} className="space-y-4">
            {isSignup && !forgotMode && (
              <>
                <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="date" required value={dob} onChange={(e) => setDob(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </>
            )}

            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />

            {!forgotMode && (
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
            )}

            {forgotMode && (
              <>
                <input type="date" required value={dobCheck} onChange={(e) => setDobCheck(e.target.value)} placeholder="Your DOB" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                <input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500" />
              </>
            )}

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200">
              {forgotMode ? 'Update Password' : isSignup ? 'Sign Up' : 'Login'}
            </button>
          </form>

          {!forgotMode && (
            <p className="text-sm text-center mt-4 text-gray-600">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button onClick={() => setIsSignup(!isSignup)} className="text-blue-600 hover:underline font-medium">
                {isSignup ? 'Login' : 'Sign Up'}
              </button>
            </p>
          )}

          {!isSignup && !forgotMode && (
            <p className="text-sm text-center mt-2 text-yellow-600">
              Forgot your password?{' '}
              <button onClick={() => setForgotMode(true)} className="text-yellow-600 underline">
                Reset it
              </button>
            </p>
          )}

          {forgotMode && (
            <p className="text-sm text-center mt-4 text-gray-600">
              Remembered your password?{' '}
              <button onClick={() => setForgotMode(false)} className="text-blue-600 underline font-medium">
                Go to Login
              </button>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
