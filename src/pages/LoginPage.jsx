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
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
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

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const redirectUser = async (uid) => {
    try {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        navigate(userData.hasPaid ? '/home' : '/catalog');
      } else toast.error('User profile not found.');
    } catch {
      toast.error('Redirection failed.');
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
      navigate('/catalog', { state: { triggerPayment: true } });
    } catch (err) {
      toast.error(err.message || 'Signup failed');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCred = await login(email, password);
      await redirectUser(userCred.user.uid);
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
    } catch (err) {
      toast.error(err.message || 'Error sending reset email.');
    }
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      <ToastContainer />
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black flex flex-col justify-between font-inter overflow-hidden text-white">

        {/* Stars background via body pseudo-elements */}
        {showIntro ? (
          <div className="flex-grow flex items-center justify-center bg-transparent z-50">
            <img
              src={white}
              alt="Logo"
              className="w-24 h-24 animate-bounce"
              style={{ filter: 'drop-shadow(0 0 20px #ff6d00)' }}
            />
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-md shadow-xl border border-orange-500/30 rounded-3xl px-10 py-8 w-full max-w-md animate-fadein z-10 relative">
              <img src={white} alt="Logo" className="w-20 h-20 mx-auto mb-6" />
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
                      className="glass-input"
                    />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => /^\d{0,10}$/.test(e.target.value) && setPhone(e.target.value)}
                      placeholder="Phone (10 digits)"
                      className="glass-input"
                    />
                    <input
                      type="text"
                      required
                      onFocus={(e) => (e.target.type = 'date')}
                      onBlur={(e) => !e.target.value && (e.target.type = 'text')}
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      placeholder="DOB"
                      className="glass-input"
                    />
                  </>
                )}
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="glass-input"
                />
                {!forgotMode && (
                  <div className="relative w-full">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="glass-input pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-2 flex items-center text-orange-400"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-[#ff6d00] text-white font-semibold py-2 rounded hover:bg-orange-500 transition duration-200 shadow-orange-glow"
                >
                  {forgotMode ? 'Send Reset Link' : isSignup ? 'Sign Up' : 'Login'}
                </button>
              </form>

              {!forgotMode && (
                <p className="text-sm text-center mt-4 text-gray-300">
                  {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    onClick={() => setIsSignup(!isSignup)}
                    className="text-[#ff6d00] hover:underline font-medium"
                  >
                    {isSignup ? 'Login' : 'Sign Up'}
                  </button>
                </p>
              )}

              {!isSignup && !forgotMode && (
                <p className="text-sm text-center mt-2 text-orange-300">
                  Forgot your password?{' '}
                  <button
                    onClick={() => setForgotMode(true)}
                    className="underline hover:text-orange-400"
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
                    className="text-[#ff6d00] underline font-medium"
                  >
                    Go to Login
                  </button>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center text-sm text-gray-400 py-4 z-10">
          <p className="opacity-80">
            © {new Date().getFullYear()} <span className="text-[#ff6d00] font-semibold">AU Team</span> · Empowering with Knowledge
          </p>
        </footer>
      </div>

      {/* Stars via global CSS */}
      <style>{`
        .glass-input {
          width: 100%;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 109, 0, 0.3);
          border-radius: 0.5rem;
          color: white;
          outline: none;
          transition: border 0.2s, box-shadow 0.2s;
        }
        .glass-input:focus {
          border-color: #ff6d00;
          box-shadow: 0 0 0 2px rgba(255, 109, 0, 0.5);
        }
        .shadow-orange-glow {
          box-shadow: 0 0 10px rgba(255, 109, 0, 0.6), 0 0 25px rgba(255, 109, 0, 0.3);
        }
        .animate-fadein {
          animation: fadein 0.7s ease-out;
        }
        @keyframes fadein {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        body::before,
        body::after {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 200%;
          height: 200%;
          background: transparent;
          pointer-events: none;
          z-index: -1;
        }
        body::before {
          background-image: radial-gradient(#ff6d00 1px, transparent 1px);
          background-size: 2px 2px;
          animation: twinkle 6s linear infinite;
          opacity: 0.3;
        }
        body::after {
          background-image: radial-gradient(#ffffff88 1px, transparent 1px);
          background-size: 3px 3px;
          animation: twinkle 8s linear infinite reverse;
          opacity: 0.1;
        }
        @keyframes twinkle {
          from { transform: translateY(0); }
          to { transform: translateY(-50px); }
        }
      `}</style>
    </>
  );
}