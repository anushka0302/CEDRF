import React from "react";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { MdMarkEmailRead } from "react-icons/md";
import { IoPhonePortrait } from "react-icons/io5";
import { GoLaw } from "react-icons/go";

export default function CancellationPolicyPage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-20 font-serif text-gray-300">
        <ScrollToTop />
        <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-800 shadow-xl rounded-xl p-8 sm:p-12">
          <h1 className="text-3xl font-serif italic text-white mb-8">
            Cancellation & Refund Policy
          </h1>

          <section className="mb-8">
            <h2 className="text-xl font-serif italic text-white mb-4">
              1. Cancellation Policy
            </h2>
            <p className="leading-relaxed text-gray-300">
              All purchases made on{" "}
              <strong className="text-red-400">CEDRF Learning</strong> are for
              digital products and services. Due to the immediate access granted
              after payment, cancellations are generally not permitted. We urge
              users to carefully review course details before making a purchase.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-serif italic text-white mb-4">
              2. Refund Eligibility
            </h2>
            <p className="leading-relaxed text-gray-300 mb-4">
              Refunds will be considered only under the following circumstances:
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">•</span>
                Accidental or duplicate payment
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">•</span>
                Payment completed but user is unable to access the course due to
                a verified technical issue
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3 mt-1">•</span>
                The course has not been accessed or started (as per our system
                logs)
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-serif italic text-white mb-4">
              3. Refund Procedure
            </h2>
            <p className="leading-relaxed text-gray-300">
              To request a refund, please email us at&nbsp;
              <a
                href="mailto:infocedrf@protonmail.com"
                className="text-red-400 hover:text-red-300 underline transition-colors"
              >
                infocedrf@protonmail.com
              </a>
              &nbsp;with the subject line "Refund Request." Include your
              registered email ID, payment reference, and the reason for the
              request. Our team will evaluate your request and respond within
              3–5 business days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-serif italic text-white mb-4">
              4. Processing Timeline
            </h2>
            <p className="leading-relaxed text-gray-300">
              If your refund request is approved, the refund will be processed
              within 7–10 business days and credited back to the original mode
              of payment.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-serif italic text-white mb-4">
              5. Contact & Legal Details
            </h2>
            <p className="leading-relaxed text-gray-300 mb-6">
              For any questions or clarifications regarding cancellations or
              refunds, you may contact us:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MdMarkEmailRead className="mt-1 text-red-400" size={20} />
                <div className="text-gray-300">
                  <strong className="text-white">Email:</strong>&nbsp;
                  <a
                    href="mailto:infocedrf@protonmail.com"
                    className="text-red-400 hover:text-red-300 underline transition-colors"
                  >
                    infocedrf@protonmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <IoPhonePortrait className="mt-1 text-red-400" size={20} />
                <div className="text-gray-300">
                  <strong className="text-white">Phone:</strong>&nbsp;
                  <a
                    href="tel:+918630191968"
                    className="text-red-400 hover:text-red-300 underline transition-colors"
                  >
                    +91 8630191968
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <GoLaw className="mt-1 text-red-400" size={20} />
                <div className="text-gray-300">
                  <strong className="text-white">Legal Entity:</strong>&nbsp;
                  <span className="font-serif italic">
                    Comprehensive Educational Development and Research
                    Foundation
                  </span>
                </div>
              </li>
            </ul>
          </section>

          <footer className="text-gray-500 text-sm mt-12 border-t border-gray-800 pt-6">
            <p className="font-serif italic">Last updated: July 18, 2025</p>
          </footer>
        </div>
      </div>
      <Footer />
    </div>
  );
}
