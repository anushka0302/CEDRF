import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { load } from '@cashfreepayments/cashfree-js';
import { useAuth } from '../context/AuthContext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './Footer';
import ScrollToTop  from './ScrollToTop'; 
import stairimg from '../assets/mintinit.svg';

export default function CatalogPage() {
  const { user, markPaymentDone } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [paymentFailed, setPaymentFailed] = useState(location.state?.paymentFailed || false);
  const [showPopup, setShowPopup] = useState(paymentFailed);
  let cashfree;

  useEffect(() => {
    AOS.init({ duration: 1000 });
    const init = async () => {
      cashfree = await load({ mode: 'sandbox' });
    };
    init();
  }, []);
 useEffect(() => {
    // Redirect to home if payment is complete
    if (user?.hasPaid) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);


  const getSessionId = async () => {
    if (!user) {
      console.error('User not found. Please log in again.');
      navigate('/login');
      return null;
    }

    try {
      const res = await axios.post('https://cedrf.umangmathpal.workers.dev/payment', {
        customer_name: user.firstName || 'Customer',
        customer_email: user.email,
        customer_phone: user.phone || '9999999999',
          amount: 599,
      });

      if (res.data && res.data.payment_session_id) {
        return {
          sessionId: res.data.payment_session_id,
          orderId: res.data.order_id,
        };
      } else {
        console.error('Failed to get payment session ID.');
        return null;
      }
    } catch (error) {
      console.error('Error fetching session ID:', error);
      return null;
    }
  };

  const verifyPayment = async (orderId) => {
    if (!orderId) return;

    try {
      const res = await axios.post('https://cedrf.umangmathpal.workers.dev/verify', { orderId });
      if (res.data && res.data.success) {
        markPaymentDone();
        navigate('/');
      } else {
        navigate('/catalog', { state: { paymentFailed: true } });
      }
    } catch (error) {
      navigate('/catalog', { state: { paymentFailed: true } });
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const result = await getSessionId();
    if (!result) return;

    const { sessionId, orderId } = result;

    try {
       await cashfree.checkout({ paymentSessionId: sessionId, redirectTarget: '_modal' });
       verifyPayment(orderId);
    } catch (error) {
      navigate('/catalog', { state: { paymentFailed: true } });
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden">
      {/* Hero Section */}
      <ScrollToTop/>
      <section className="relative flex flex-col md:flex-row justify-between items-center px-6 md:px-16 py-12 gap-8 bg-gradient-to-r from-gray-100 to-gray-300 shadow-inner">
        <div className="md:w-1/2 space-y-5 z-10" data-aos="fade-right">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-snug">
            Pay ₹599 for your Future – Become FAANG-Ready in 12 Weeks
          </h1>
          <div className="flex items-center space-x-4">
            <span className="border-2 border-black px-4 py-1 rounded text-lg font-medium animate-pulse">
              Launch Offer: ₹599
            </span>
          </div>
          <button
            onClick={handleClick}
            className="mt-6 bg-gradient-to-r from-blue-700 to-blue-900 text-white px-8 py-3 rounded-md font-semibold hover:scale-105 transition transform duration-300 shadow-lg"
          >
            Pay For Your Future Now
          </button>
        </div>

        <div className="md:w-1/2 z-10" data-aos="fade-left">
        <img src={stairimg} alt="DSA Stairs" style={{ width: '100%' }} />
      
  </div>
      </section>

      {/* Curriculum Section */}
      <section className="px-6 md:px-16 py-12 bg-gray-50" data-aos="fade-up">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Structured Curriculum</h2>
        <p className="text-gray-600 mb-6">Get clarity through pattern-based learning</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['Arrays', 'Strings', 'Binary Search', 'Recursion', 'Linked List', 'Stacks & Queues'].map((item) => (
            <button
              key={item}
              className="border border-gray-300 px-4 py-2 rounded-md text-left text-gray-800 font-medium hover:bg-white hover:shadow-lg transition duration-300"
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {['Beginner-Friendly', 'Interview-Proven', 'Time Efficient'].map((tag) => (
            <span key={tag} className="bg-gray-200 px-3 py-1 rounded text-sm text-gray-600 shadow-sm">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 md:px-16 py-12 flex flex-col md:flex-row justify-between gap-8  rounded-xl shadow-md" data-aos="fade-up">
        <div className="md:w-1/2">
          <h3 className="text-xl font-bold mb-3 text-gray-900">Why Pay For This Course?</h3>
          <p className="text-gray-600 mb-4">Not just a course. A ₹LPA outcome.</p>
          <ul className="space-y-2 text-gray-700">
            <li>⚡ 12-Week Plan – Learn with structure</li>
            <li>💼 FAANG-Level DSA – Practice real interview problems</li>
            <li>🎯 Mentorship – Weekly live doubt-solving + resume</li>
            <li className="text-sm mt-2 text-gray-500">Bonus: GitHub Projects | PDF Notes | Placement Assistance</li>
          </ul>
        </div>
        <div className="md:w-1/2">
          <h3 className="text-xl font-bold mb-3 text-gray-900">What Our Students Say</h3>
          <blockquote className="text-gray-700 mb-4 border-l-4 border-blue-600 pl-4 italic">
            “From zero to ₹21 LPA – all thanks to this course”
            <br />
            <span className="font-medium text-sm text-blue-900">– Rohit, Amazon</span>
          </blockquote>
          <blockquote className="text-gray-700 border-l-4 border-blue-600 pl-4 italic">
            “The patterns + practice – ultimate combo. Cracked Flipkart.”
            <br />
            <span className="font-medium text-sm text-blue-900">– Ananya</span>
          </blockquote>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 md:px-16 py-10 bg-indigo-100 flex flex-col md:flex-row justify-between items-center gap-6" data-aos="zoom-in">
        <div className="text-lg font-semibold text-blue-900">
          ⏰ Monsoon Offer Ending Soon — Get Full Access for just ₹599
        </div>
        <button
          onClick={handleClick}
          className="bg-blue-700 text-white px-6 py-3 rounded-md font-bold hover:bg-blue-900 transition shadow-md hover:scale-105"
        >
          PAY ₹599 & START NOW
        </button>
      </section>
<Footer/>
      {/* Payment Failed Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-4">Payment Failed</h2>
            <p className="text-gray-700 mb-6">
              Payment failed due to a network or verification issue. Please try again.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
