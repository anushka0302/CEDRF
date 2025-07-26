import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { MdMarkEmailRead } from "react-icons/md";
import { IoPhonePortrait } from "react-icons/io5";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";

export default function ContactUs() {
  return (
    <div className="bg-black min-h-screen">
      <ScrollToTop />
      <div className="min-h-screen text-gray-300 px-6 py-14 md:px-24 font-serif">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif italic text-white text-center mb-8 tracking-tight">
            Get in Touch with Us
          </h1>

          <p className="text-lg md:text-xl text-center text-gray-400 mb-12 leading-relaxed">
            We welcome your inquiries, feedback, and suggestions. Feel free to
            connect with us — we're just a message away.
          </p>

          <div className="space-y-10 text-base md:text-lg">
            {/* Email */}
            <div className="flex items-start gap-5 bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
              <span className="text-2xl text-red-400 mt-1">
                <MdMarkEmailRead />
              </span>
              <div>
                <h2 className="font-semibold text-white mb-2">Email</h2>
                <a
                  href="mailto:infocedrf@protonmail.com"
                  className="text-red-400 hover:text-red-300 hover:underline transition-colors"
                >
                  infocedrf@protonmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-5 bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
              <span className="text-2xl text-red-400 mt-1">
                <IoPhonePortrait />
              </span>
              <div>
                <h2 className="font-semibold text-white mb-2">Phone</h2>
                <a
                  href="tel:+918630191968"
                  className="text-red-400 hover:text-red-300 hover:underline transition-colors"
                >
                  +91 8630191968
                </a>
              </div>
            </div>

            {/* Legal Name */}
            <div className="flex items-start gap-5 bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-gray-700 transition-colors">
              <span className="text-2xl text-red-400 mt-1">
                <HiMiniBuildingOffice2 />
              </span>
              <div>
                <h2 className="font-semibold text-white mb-2">Legal Name</h2>
                <p className="text-gray-300 font-serif italic">
                  Comprehensive Educational Development and Research Foundation
                  (CEDRF)
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <p className="text-sm text-gray-400 leading-relaxed">
                <span className="text-white font-semibold">Response time:</span>{" "}
                within 24 hours
                <br />
                <span className="text-white font-semibold">
                  Support Hours:
                </span>{" "}
                9:00 AM – 6:00 PM IST (Mon – Fri)
              </p>
            </div>

            <div className="mt-8">
              <p className="text-gray-500 text-sm font-serif italic">
                — Since 2009 —
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
