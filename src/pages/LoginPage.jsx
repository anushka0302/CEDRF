import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showIntro, setShowIntro] = useState(true);
  const [forgotMode, setForgotMode] = useState(false);
const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const uid = cred.user.uid;

      await setDoc(doc(db, 'users', uid), {
        firstName,
        lastName,
        dob,
        email,
        hasPaid: false,
      });

      toast.success('Signup successful! Logging you in...');
      await login(email, password);
    } catch (err) {
      toast.error(err.message || 'Signup failed');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      toast.error(err.message || 'Login failed');
    }
  };

  // ✅ NEW forgot password logic (based on image)
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
  const handleShowPassword = () => {
  setShowPassword(true);
  setTimeout(() => setShowPassword(false), 3000);
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

          <form
            onSubmit={
              forgotMode ? handleForgotPassword : isSignup ? handleSignup : handleLogin
            }
            className="space-y-4"
          >
            {isSignup && !forgotMode && (
              <>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
  className="w-full px-4 py-2 border border-gray-300 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
              </>
            )}

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

           {!forgotMode && (
  <div className="relative">
    <input
      type={showPassword ? 'text' : 'password'}
      required
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
    />
    <button
      type="button"
      onClick={handleShowPassword}
      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-700"
    >
      <FaEye />
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
            <p className="text-sm text-center mt-4 text-gray-600">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-blue-600 hover:underline font-medium"
              >
                {isSignup ? 'Login' : 'Sign Up'}
              </button>
            </p>
          )}

          {!isSignup && !forgotMode && (
            <p className="text-sm text-center mt-2 text-yellow-600">
              Forgot your password?{' '}
              <button
                onClick={() => setForgotMode(true)}
                className="text-yellow-600 underline"
              >
                Reset it
              </button>
            </p>
          )}

          {forgotMode && (
            <p className="text-sm text-center mt-4 text-gray-600">
              Remembered your password?{' '}
              <button
                onClick={() => setForgotMode(false)}
                className="text-blue-600 underline font-medium"
              >
                Go to Login
              </button>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
