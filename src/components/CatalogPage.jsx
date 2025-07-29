import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { load } from "@cashfreepayments/cashfree-js";
import { useAuth } from "../context/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import stairimg from "../assets/mints.svg";
import { CiCalendarDate } from "react-icons/ci";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FcAlarmClock } from "react-icons/fc";
import { Gift, TrendingUp, Rocket } from 'lucide-react'; // Lucide icons
import Navbar from "./Navbar";
import aiimg from "../assets/ai.svg";
export default function CatalogPage() {
  const { user, markPaymentDone } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
 const triggerPayment = location.state?.triggerPayment || false;

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
  if (user && !user.hasPaid && triggerPayment && cashfreeInstance) {
    // Automatically start payment flow
    handleClick(new Event('auto')); // create a dummy event
  }
}, [user, triggerPayment, cashfreeInstance]);

  useEffect(() => {
    if (user && user.hasPaid ) {
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
      if (!user) {
    console.error("User not found. Redirecting to login.");
    navigate("/login");
    return null; // this is good, you already have this
  }
    
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

  if (!cashfreeInstance ) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center p-8 text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen font-serif overflow-x-hidden">
      {/* Hero Section */}
      <ScrollToTop />
      <Navbar/>
          <section className="relative flex justify-center items-center px-4 sm:px-6 md:px-16 py-12 bg-gray-900 shadow-inner border-b border-gray-800 font-['Inter']">
  <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl
    backdrop-blur-lg 
    bg-white/10 dark:bg-white/5 
    border border-white/10 
    p-6 sm:p-8 md:p-10 
    rounded-3xl 
    shadow-[0_0_40px_rgba(255,255,255,0.05)] space-y-10 md:space-y-0 md:space-x-10">

    {/* Left Content */}
    <div className="w-full md:w-1/2 space-y-6 z-10 text-center md:text-left" data-aos="fade-right">
      <h1 className="text-4xl sm:text-5xl font-['Poppins'] font-semibold text-white leading-tight tracking-wide">
        <TrendingUp className="inline-block text-[#ff6d00] w-8 h-8 mb-1 mr-2" />
        From the Hills to the Hallways of MNCs
        <br />
      <span className="text-[#ff6d00] text-3xl sm:text-1xl leading-tight block mt-2 sm:mt-1">
  Become FAANG-Ready<br className="md:hidden" /> in 8 Weeks
</span>
      </h1>

      <p className="text-gray-300 text-sm leading-relaxed">
        This isn't just a course — it's a movement. We're filling the gap between <span className="font-semibold text-white">rural talent</span> and <span className="font-semibold text-white">global opportunities</span>.
        <br />
        Backed by an NGO initiative, this program is crafted for passionate learners from the hills of Uttarakhand and beyond — who dream big but lack the ladder.
      </p>

      <button
        onClick={handleClick}
        className="mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 via-red-500 to-orange-400 hover:bg-[#FF3E3E] text-white px-6 sm:px-8 py-3 rounded-xl font-semibold shadow-lg transition-transform transform hover:scale-105 duration-300 hover:shadow-red-500/50"
      >
        <Rocket className="w-5 h-5" />
        Claim Your Seat – Limited NGO Slots
      </button>
    </div>

    {/* Right Image */}
    <div className="w-full md:w-1/2 z-10 flex justify-center" data-aos="fade-left">
      <img
        src={stairimg}
        alt="DSA Stairs"
        className="w-full max-w-xs sm:max-w-sm md:max-w-md filter brightness-95 drop-shadow-xl rounded-xl"
      />
    </div>
  </div>
</section>





      {/* Curriculum Section */}
      <section
  className="px-6 md:px-16 py-16 bg-gray-900 border-b border-gray-800 font-['Inter'] relative overflow-hidden rounded-3xl shadow-2xl backdrop-blur-xl"
  data-aos="fade-up"
>
  {/* Glow circles */}
  <div className="absolute -top-16 -left-16 w-64 h-64 bg-orange-700/30 rounded-full blur-2xl animate-pulse"></div>
  <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-red-700/30 rounded-full blur-2xl animate-pulse"></div>

  <h2 className="text-3xl md:text-4xl font-['Poppins'] font-semibold text-white mb-4 relative z-10">
    Structured Curriculum
  </h2>
  <p className="text-gray-300 text-sm md:text-base mb-8 relative z-10">
    Master DSA with a clear, pattern-based roadmap designed to crack real interviews.
  </p>

  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
    {[
      "Arrays",
      "Strings",
      "Binary Search",
      "Recursion",
      "Linked List",
      "Stacks & Queues",
    ].map((item) => (
      <div
        key={item}
        className="border border-white/20 bg-white/5 px-5 py-3 rounded-xl text-gray-200 font-medium shadow-md hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition duration-300 backdrop-blur-sm"
      >
        {item}
      </div>
    ))}
  </div>

  <div className="flex flex-wrap gap-3 mt-8 relative z-10">
    {["Beginner-Friendly", "Interview-Proven", "Time Efficient"].map((tag) => (
      <span
        key={tag}
        className="px-4 py-2 rounded-full text-sm text-[#ff6d00]  backdrop-blur-md border border-orange/20 shadow-sm"
      >
        {tag}
      </span>
    ))}
  </div>
</section>

      {/* Benefits Section */}
      <section
  className="px-6 md:px-16 py-16 flex flex-col md:flex-row justify-between gap-12 bg-gray-900 border-b border-gray-800 font-['Inter']"
  data-aos="fade-up"
>
  {/* Why Pay */}
  <div className="md:w-1/2 space-y-6">
    <h3 className="text-2xl md:text-3xl font-['Poppins'] font-semibold text-white">
      Why Pay ₹499? Because Your Future Is Worth It.
    </h3>
    <p className="text-gray-400 text-sm leading-relaxed">
      This isn’t just another online course. It’s a mission-backed, outcome-driven bootcamp
      that transforms hidden talent from the hills of India into world-class developers
      ready for MNCs like Amazon, Google, and Flipkart.
    </p>

    <ul className="text-gray-300 space-y-4 text-sm">
      <li className="flex items-start gap-3">
        <CiCalendarDate className="mt-1 text-xl text-[#ff6d00]" />
        <span> 8-Week Roadmap – Structured & focused, no distractions</span>
      </li>
      <li className="flex items-start gap-3">
        <HiOutlineBanknotes className="mt-1 text-xl text-[#ff6d00]" />
        <span> FAANG-Level Prep – Pattern-based problem solving that works</span>
      </li>
      <li className="flex items-start gap-3">
        <LiaChalkboardTeacherSolid className="mt-1 text-xl text-[#ff6d00]" />
        <span> Weekly Live Mentorship – Real mentors, real support</span>
      </li>
      <li className="text-xs text-gray-500 pl-8">
        Bonus: GitHub Projects | PDF Notes | Placement Help | Resume Reviews
      </li>
    </ul>
  </div>

  {/* Testimonials */}
  <div className="md:w-1/2 space-y-6">
  <h3 className="text-2xl md:text-3xl font-['Poppins'] font-semibold text-white">
    Real Stories. Real Impact.
  </h3>

  <blockquote className="text-gray-300 border-l-4 border-[#ff6d00] bg-black p-4 rounded-r-md italic shadow-sm">
    “From a small village to ₹21 LPA at Amazon — this course didn’t just teach DSA, it changed my life.”
    <br />
    <span className="font-medium text-sm text-[#ff6d00] not-italic block mt-2">
      – Rohit, Amazon
    </span>
  </blockquote>

  <blockquote className="text-gray-300 border-l-4 border-[#ff6d00] bg-black p-4 rounded-r-md italic shadow-sm">
    “No fluff. Just patterns + practice + mentorship = Flipkart offer.”
    <br />
    <span className="font-medium text-sm text-[#ff6d00] not-italic block mt-2">
      – Ananya, Flipkart
    </span>
  </blockquote>
</div>

</section>

<section
  className="px-6 md:px-16 py-16 bg-gray-900 flex flex-col md:flex-row items-center justify-between gap-10 border-b border-gray-800 shadow-inner rounded-3xl overflow-hidden font-['Inter']"
  data-aos="fade-up"
>
  {/* Left SVG */}
  <div className="flex-1 w-full md:w-1/2">
    <img
      src={aiimg}
      alt="AI Web3 Course"
      className="w-full h-auto max-w-md mx-auto"
    />
  </div>

  {/* Right Content */}
  <div className="flex-1 text-white w-full md:w-1/2">
    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#ff6d00]">
      AI Course Launching Soon!
    </h2>
    <p className="text-base md:text-lg text-gray-300 mb-6 leading-relaxed font-medium">
      Learn how AI powers the future of Web3, Data Engineering, and Data Science.
      This new course blends cutting-edge tools and hands-on projects to prepare you for high-growth tech careers.
    </p>
    <ul className="text-gray-400 text-sm md:text-base mb-6 space-y-2 list-disc list-inside font-normal">
      <li>Build AI-powered dApps on blockchain</li>
      <li>Create real-time data pipelines & ML models</li>
      <li>Master tools like Python, Web3.js, TensorFlow & more</li>
    </ul>
    <span className="inline-block bg-[#ff6d00] text-black font-semibold py-2 px-6 rounded-full animate-pulse shadow-md hover:scale-105 transition-all duration-300 cursor-default w-fit">
      Enrollments Open Soon
    </span>
  </div>
</section>





<section
  className="px-6 md:px-16 py-12 bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] flex flex-col md:flex-row justify-between items-center gap-6 border-b border-gray-800 shadow-inner font-['Inter'] rounded-3xl"
  data-aos="zoom-in"
>
  {/* Text content */}
  <div className="text-white text-center md:text-left text-base md:text-lg font-medium flex items-center gap-3 flex-wrap">
    <span>
      <span className="text-[#ff6d00] font-semibold">Monsoon Opportunity:</span>{" "}
      Last few seats left to access ₹1500+ value at just{" "}
      <span className="text-[#ff6d00] font-bold">₹499</span> — thanks to NGO support.
      <br className="hidden md:block" />
      <span className="text-sm text-gray-400 font-normal">
        Limited to only 200 learners from hilly & underserved regions.
      </span>
    </span>
  </div>

  {/* CTA Button */}
<button
  onClick={handleClick}
  className="bg-[#ff6d00] hover:bg-orange-500 text-black font-bold text-base md:text-lg px-8 py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 animate-glow"
>
  Join Now for DSA&nbsp;
  <span className="inline-flex items-center gap-2">
    <span className="line-through text-red-800">₹1500</span>
    <span className="text-black">₹499</span>
  </span>
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
