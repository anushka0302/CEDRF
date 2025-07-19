import React from 'react';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
export default function ContactUs() {
  return (
    <>
      {/* Load Inter font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
     <ScrollToTop/>
      <div
        className="min-h-screen bg-white text-gray-900 px-6 py-14 md:px-24"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-6 tracking-tight">
            Get in Touch with Us
          </h1>

          <p className="text-lg md:text-xl text-center text-gray-600 mb-10">
            We welcome your inquiries, feedback, and suggestions. Feel free to connect with us — we’re just a message away.
          </p>

          <div className="space-y-8 text-base md:text-lg">
            {/* Email */}
            <div className="flex items-start gap-4">
              <span className="text-xl">📧</span>
              <div>
                <h2 className="font-semibold text-gray-800">Email</h2>
                <a
                  href="mailto:infocedrf@protonmail.com"
                  className="text-blue-600 hover:underline"
                >
                  infocedrf@protonmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <span className="text-xl">📞</span>
              <div>
                <h2 className="font-semibold text-gray-800">Phone</h2>
                <a
                  href="tel:+917060666870"
                  className="text-blue-600 hover:underline"
                >
                  +91 70606 66870
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <span className="text-xl">📍</span>
              <div>
                <h2 className="font-semibold text-gray-800">Address</h2>
                <p className="text-gray-600">
                  Gurudwara Road, Charayal Nayabad,<br />
                  Haldwani (Nainital), Uttarakhand 263139
                </p>
              </div>
            </div>

            {/* Legal Name */}
            <div className="flex items-start gap-4">
              <span className="text-xl">🏢</span>
              <div>
                <h2 className="font-semibold text-gray-800">Legal Name</h2>
                <p className="text-gray-600">
                  Comprehensive Educational Development and Research Foundation (CEDRF)
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center text-sm text-gray-500">
            Response time: within 24 hours <br />
            Support Hours: 9:00 AM – 6:00 PM IST (Mon – Fri)
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}