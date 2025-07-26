import { useState, useRef } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const formRef = useRef();
  const [isSignup, setIsSignup] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function signup(formData) {
    "use server";
    const email = formData.get("email");
    const password = formData.get("password");
    const firstName = formData.get("firstName");
    const phone = formData.get("phone");
    const dob = formData.get("dob");

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", cred.user.uid), {
        firstName,
        phone,
        dob,
        email,
        hasPaid: false,
      });
      toast.success("Signup successful!");
      navigate("/dashboard");
    } catch (err) {
      return err.message;
    }
  }

  async function login(formData) {
    "use server";
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      return err.message;
    }
  }

  async function resetPassword(formData) {
    "use server";
    const email = formData.get("email");

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent.");
      setForgotMode(false);
      navigate("/login");
    } catch (err) {
      return err.message;
    }
  }

  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4">
      <meta
        name="description"
        content="Login or Signup to access your account"
      />
      <meta name="keywords" content="login, signup, react19, firebase" />
      <meta property="og:title" content="Login Page" />

      <div className="w-full max-w-sm">
        <div className="border border-gray-800 bg-black p-10 mb-4">
          <div className="text-center mb-8">
            <h1 className="text-white text-4xl font-serif italic">CEDRF</h1>
            <p className="text-gray-400 text-sm font-serif italic">
              Comprehensive Educational Development and Research Foundation
            </p>
          </div>

          <form
            action={isSignup ? signup : login}
            ref={formRef}
            className="space-y-3"
          >
            {isSignup && (
              <>
                <input
                  name="firstName"
                  placeholder="Full Name"
                  required
                  className="w-full p-2 text-sm bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none"
                />
                <input
                  name="phone"
                  placeholder="Phone"
                  required
                  className="w-full p-2 text-sm bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none"
                />
                <input
                  name="dob"
                  placeholder="Date of Birth"
                  required
                  className="w-full p-2 text-sm bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none"
                />
              </>
            )}
            <input
              name="email"
              placeholder={
               "Email"
              }
              required
              className="w-full p-2 text-sm bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none "
            />
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                className="w-full p-2 text-sm bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 opacity-80 text-white py-2 rounded text-sm font-semibold hover:bg-red-600 transition-colors mt-4"
            >
              {isSignup ? "Sign Up" : "Log in"}
            </button>
          </form>

          {!forgotMode && !isSignup && (
            <>
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-700"></div>
                <span className="px-4 text-gray-400 text-sm font-semibold">
                  OR
                </span>
                <div className="flex-1 border-t border-gray-700"></div>
              </div>
            </>
          )}

          {forgotMode && (
            <form action={resetPassword} className="mt-6 space-y-3">
              <input
                name="email"
                placeholder="Enter your email"
                required
                className="w-full p-2 text-sm bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-400 focus:border-gray-500 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full bg-red-500 opacity-80 text-white py-2 rounded text-sm font-semibold hover:bg-red-600 transition-colors"
              >
                Reset Password
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => setForgotMode(!forgotMode)}
              className="text-red-400 text-sm hover:text-red-300 transition-colors"
            >
              {forgotMode ? "Back to login" : "Forgot password?"}
            </button>
          </div>
        </div>

        <div className="border border-gray-800 bg-black p-6 text-center">
          {isSignup ? (
            <p className="text-sm text-gray-300">
              Already have an account?{" "}
              <button
                onClick={() => setIsSignup(false)}
                className="text-red-400 font-semibold hover:text-red-300 transition-colors "
              >
                Log in
              </button>
            </p>
          ) : (
            <p className="text-sm text-gray-300">
              {"Don't have an account? "}
              <button
                onClick={() => setIsSignup(true)}
                className="text-red-400 font-semibold hover:text-red-300 transition-colors  "
              >
                Sign up
              </button>
            </p>
          )}
        </div>

        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-500 mb-4">
            <a href="#" className="hover:text-gray-400">
              CEDRF
            </a>
            <a href="#" className="hover:text-gray-400">
              About
            </a>
            <a href="#" className="hover:text-gray-400">
              Blog
            </a>
            <a href="#" className="hover:text-gray-400">
              Jobs
            </a>
            <a href="#" className="hover:text-gray-400">
              Help
            </a>

            <a href="#" className="hover:text-gray-400">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-400">
              Terms
            </a>
            <a href="#" className="hover:text-gray-400">
              Locations
            </a>
          </div>
          <div className="flex justify-center items-center gap-4 text-xs text-gray-500">
            <span>© {year} CEDRF</span>
          </div>
        </div>
      </div>
    </div>
  );
}
