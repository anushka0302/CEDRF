import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import { useAuth } from "../context/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import stairimg from "../assets/mintinit.svg";
import { CiCalendarDate } from "react-icons/ci";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FcAlarmClock } from "react-icons/fc";

export default function CatalogPage() {
  const { user, markPaymentDone } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [paymentFailed, setPaymentFailed] = useState(
    location.state?.paymentFailed || false
  );
  const [showPopup, setShowPopup] = useState(paymentFailed);
  const [cashfreeInstance, setCashfreeInstance] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const init = async () => {
      try {
        const cf = await load({ mode: "production" });
        setCashfreeInstance(cf);
      } catch (e) {
        console.error("❌ Cashfree load error", e);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (user && user.hasPaid) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const getSessionId = async () => {
    if (!user) {
      console.error("User not found. Please log in again.");
      navigate("/login");
      return null;
    }

    try {
      const res = await axios.post(
        "https://cedrf.umangmathpal.workers.dev/payment",
        {
          customer_name: user.firstName || "CEDRF",
          customer_email: user.email,
          customer_phone: user.phone || "9105498001",
          amount: 499,
        }
      );
      if (res.data && res.data.payment_session_id) {
        return {
          sessionId: res.data.payment_session_id,
          orderId: res.data.order_id,
        };
      } else {
        console.error("Failed to get payment session ID.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching session ID:", error);
      return null;
    }
  };

  const verifyPayment = async (orderId) => {
    if (!orderId) return;

    try {
      const res = await axios.post(
        "https://cedrf.umangmathpal.workers.dev/verify",
        { orderId }
      );
      if (res.data && res.data.success) {
        await markPaymentDone();
        navigate("/");
      } else {
        navigate("/catalog", { state: { paymentFailed: true } });
      }
    } catch (error) {
      console.error("❌ Error verifying payment:", error);
      navigate("/catalog", { state: { paymentFailed: true } });
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!cashfreeInstance) {
      console.error("❌ Cashfree SDK not loaded yet");
      return;
    }
    const result = await getSessionId();
    if (!result) return;

    const { sessionId, orderId } = result;

    try {
      await cashfreeInstance.checkout({
        paymentSessionId: sessionId,
        redirectTarget: "_modal",
      });
      verifyPayment(orderId);
    } catch (error) {
      console.error("❌ Checkout Error:", error);
      navigate("/catalog", { state: { paymentFailed: true } });
    }
  };

  if (!cashfreeInstance || !user) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center p-8 text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen font-serif overflow-x-hidden">
      {/* Hero Section */}
      <ScrollToTop />
      <section className="relative flex flex-col md:flex-row justify-between items-center px-6 md:px-16 py-12 gap-8 bg-gradient-to-r from-gray-900 to-black shadow-inner border-b border-gray-800">
        <div className="md:w-1/2 space-y-6 z-10" data-aos="fade-right">
          <h1 className="text-3xl md:text-5xl font-serif italic text-white leading-snug">
            Pay <span className="text-red-400">₹499</span> for your Future –
            Become FAANG-Ready in 8 Weeks
          </h1>
          <div className="flex items-center space-x-4">
            <span className="border-2 border-red-500 bg-red-500 bg-opacity-20 text-white px-4 py-2 rounded text-lg font-medium animate-pulse">
              Launch Offer: ₹499
            </span>
          </div>
          <button
            onClick={handleClick}
            className="mt-6 bg-red-500 opacity-80 text-white px-8 py-3 rounded-sm font-semibold hover:bg-red-600 hover:scale-105 transition-all duration-300 "
          >
            Pay For Your Future Now
          </button>
        </div>
        <div className="md:w-1/2 z-10" data-aos="fade-left">
          <img
            src={stairimg}
            alt="DSA Stairs"
            style={{ width: "100%" }}
            className="filter brightness-90"
          />
        </div>
      </section>

      {/* Curriculum Section */}
      <section
        className="px-6 md:px-16 py-12 bg-gray-900 border-b border-gray-800"
        data-aos="fade-up"
      >
        <h2 className="text-2xl font-serif italic text-white mb-4">
          Structured Curriculum
        </h2>
        <p className="text-gray-400 mb-8">
          Get clarity through pattern-based learning
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "Arrays",
            "Strings",
            "Binary Search",
            "Recursion",
            "Linked List",
            "Stacks & Queues",
          ].map((item) => (
            <button
              key={item}
              className="border border-gray-700 bg-black px-4 py-3 rounded-sm text-left text-gray-300 font-medium hover:bg-gray-800 hover:border-red-400 hover:text-red-400 transition-all duration-300"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-6">
          {["Beginner-Friendly", "Interview-Proven", "Time Efficient"].map(
            (tag) => (
              <span
                key={tag}
                className="bg-white/10 bg-opacity-20 border border-red-500 border-opacity-30 text-red-400 px-4 py-2 rounded-sm text-sm shadow-sm"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section
        className="px-6 md:px-16 py-12 flex flex-col md:flex-row justify-between gap-8 bg-black border-b border-gray-800"
        data-aos="fade-up"
      >
        <div className="md:w-1/2">
          <h3 className="text-xl font-serif italic text-white mb-4">
            Why Pay For This Course?
          </h3>
          <p className="text-gray-400 mb-6">
            Not just a course. A ₹LPA outcome.
          </p>
          <ul className="text-gray-300 space-y-3">
            <li className="flex items-start gap-3">
              <CiCalendarDate className="mt-0.5 text-xl text-red-400" />
              <span>12-Week Plan – Learn with structure</span>
            </li>
            <li className="flex items-start gap-3">
              <HiOutlineBanknotes className="mt-0.5 text-xl text-red-400" />
              <span>FAANG-Level DSA – Practice real interview problems</span>
            </li>
            <li className="flex items-start gap-3">
              <LiaChalkboardTeacherSolid className="mt-0.5 text-xl text-red-400" />
              <span>Mentorship – Weekly live doubt-solving + resume</span>
            </li>
            <li className="text-sm mt-4 text-gray-500 pl-8">
              Bonus: GitHub Projects | PDF Notes | Placement Assistance
            </li>
          </ul>
        </div>
        <div className="md:w-1/2">
          <h3 className="text-xl font-serif italic text-white mb-4">
            What Our Students Say
          </h3>
          <blockquote className="text-gray-300 mb-6 border-l-4 border-red-500 bg-gray-900 p-4 rounded-r italic">
            "From zero to ₹21 LPA – all thanks to this course"
            <br />
            <span className="font-medium text-sm text-red-400 not-italic">
              – Rohit, Amazon
            </span>
          </blockquote>
          <blockquote className="text-gray-300 border-l-4 border-red-500 bg-gray-900 p-4 rounded-r italic">
            "The patterns + practice – ultimate combo. Cracked Flipkart."
            <br />
            <span className="font-medium text-sm text-red-400 not-italic">
              – Ananya
            </span>
          </blockquote>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="px-6 md:px-16 py-10 bg-gray-900 flex flex-col md:flex-row justify-between items-center gap-6 border-b border-gray-800"
        data-aos="zoom-in"
      >
        <div className="text-lg font-semibold text-white flex items-center gap-3">
          <FcAlarmClock />
          Monsoon Offer Ending Soon — Get Full Access for just{" "}
          <span className="text-red-400">₹499</span>
        </div>
        <button
          onClick={handleClick}
          className="bg-red-500 opacity-80 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-600 transition-all shadow-lg hover:scale-105"
        >
          PAY ₹499 & START NOW
        </button>
      </section>

      <Footer />

      {/* Payment Failed Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-8 max-w-md text-center">
            <h2 className="text-xl font-semibold text-red-400 mb-4">
              Payment Failed
            </h2>
            <p className="text-gray-300 mb-6">
              Payment failed due to a network or verification issue. Please try
              again.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
