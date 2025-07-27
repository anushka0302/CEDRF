import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Sun, Moon } from 'lucide-react';

import white from '../assets/whitelogo.svg';
export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  const [forgotMode, setForgotMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const redirectUser = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        if (userData.hasPaid) {
          navigate('/home');
        } else {
          navigate('/catalog');
        }
      } else {
        toast.error("User profile not found.");
      }
    } catch (err) {
      toast.error("Redirection failed.");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;
      await setDoc(doc(db, 'users', uid), {
        firstName,
        phone,
        dob,
        email,
        hasPaid: false,
      });
      toast.success('Signup successful! Logging you in...');
      await login(email, password);
      await redirectUser(uid);
    } catch (err) {
      toast.error(err.message || 'Signup failed');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCred = await login(email, password);
      const uid = userCred.user.uid;
      await redirectUser(uid);
    } catch (err) {
      toast.error(err.message || 'Login failed');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Check your email for password reset link.');
      setForgotMode(false);
      navigate('/login');
    } catch (err) {
      toast.error(err.message || 'Error sending reset email.');
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
  
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center overflow-hidden dark:text-white dark:bg-gray-900">
        <ToastContainer />
       { /*<button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-4 bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-white" />}
        </button>
*/}
        {showIntro ? (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-transparent">
            <img src={white} alt="Logo" className="w-24 h-24 animate-logo-bounceup" />
          </div>
        ) : (
<div className="bg-gray-900/90 backdrop-blur-md shadow-2xl rounded-3xl px-10 py-8 w-full max-w-md animate-fadein z-10 border border-gray-700">
  <img src={white} alt="Logo" className="w-20 h-20 mx-auto mb-4" />
  
            <form
              onSubmit={forgotMode ? handleForgotPassword : isSignup ? handleSignup : handleLogin}
              className="space-y-4"
            >
              {isSignup && !forgotMode && (
                <>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Name"
                    className="w-full px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d{0,10}$/.test(val)) setPhone(val);
                    }}
                    placeholder="Phone Number (10 digits)"
                    className="w-full px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    required
                    onFocus={(e) => (e.target.type = 'date')}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = 'text';
                    }}
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="DOB"
                    className="w-full px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </>
              )}
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {!forgotMode && (
                <div className="relative w-full">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full px-4 py-2 pr-10 border border-gray-700 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center text-gray-400"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
              >
                {forgotMode ? 'Send Reset Link' : isSignup ? 'Sign Up' : 'Login'}
              </button>
            </form>
            {!forgotMode && (
              <p className="text-sm text-center mt-4 text-gray-300">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  onClick={() => setIsSignup(!isSignup)}
                  className="text-blue-400 hover:underline font-medium"
                >
                  {isSignup ? 'Login' : 'Sign Up'}
                </button>
              </p>
            )}
            {!isSignup && !forgotMode && (
              <p className="text-sm text-center mt-2 text-yellow-500">
                Forgot your password?{' '}
                <button
                  onClick={() => setForgotMode(true)}
                  className="text-yellow-400 underline"
                >
                  Reset it
                </button>
              </p>
            )}
            {forgotMode && (
              <p className="text-sm text-center mt-4 text-gray-300">
                Remembered your password?{' '}
                <button
                  onClick={() => setForgotMode(false)}
                  className="text-blue-400 underline font-medium"
                >
                  Go to Login
                </button>
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}