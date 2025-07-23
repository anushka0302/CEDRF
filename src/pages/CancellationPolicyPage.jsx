import React from 'react';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import { MdMarkEmailRead } from "react-icons/md";
import { IoPhonePortrait } from "react-icons/io5";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { GoLaw } from "react-icons/go";
export default function CancellationPolicyPage() {
  return (
    <>
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-20 font-sans text-gray-800">
      <ScrollToTop/>
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8 sm:p-12">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-6">Cancellation & Refund Policy</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">1. Cancellation Policy</h2>
          <p className="leading-relaxed">
            All purchases made on <strong>CEDRF Learning</strong> are for digital products and services. 
            Due to the immediate access granted after payment, cancellations are generally not permitted.
            We urge users to carefully review course details before making a purchase.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">2. Refund Eligibility</h2>
          <p className="leading-relaxed">
            Refunds will be considered only under the following circumstances:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Accidental or duplicate payment</li>
            <li>Payment completed but user is unable to access the course due to a verified technical issue</li>
            <li>The course has not been accessed or started (as per our system logs)</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">3. Refund Procedure</h2>
          <p className="leading-relaxed">
            To request a refund, please email us at&nbsp;
            <a href="mailto:infocedrf@protonmail.com" className="text-blue-700 underline">
              infocedrf@protonmail.com
            </a>
            &nbsp;with the subject line “Refund Request.” Include your registered email ID, payment reference, and the reason for the request. Our team will evaluate your request and respond within 3–5 business days.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">4. Processing Timeline</h2>
          <p className="leading-relaxed">
            If your refund request is approved, the refund will be processed within 7–10 business days and credited back to the original mode of payment.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-800 mb-2">5. Contact & Legal Details</h2>
          <p className="leading-relaxed mb-3">
            For any questions or clarifications regarding cancellations or refunds, you may contact us:
          </p>
        <ul className="space-y-2">
  <li className="flex items-start gap-2">
    <MdMarkEmailRead className="mt-1" />
    <div>
      <strong>Email:</strong> <a href="mailto:infocedrf@protonmail.com" className="text-blue-700 underline">infocedrf@protonmail.com</a>
    </div>
  </li>
  <li className="flex items-start gap-2">
    <IoPhonePortrait className="mt-1" />
    <div>
      <strong>Phone:</strong> <a href="tel:+918630191968" className="text-blue-700 underline">+91 8630191968</a>
    </div>
  </li>
 {/*} <li className="flex items-start gap-2">
    <HiMiniBuildingOffice2 className="mt-1" />
    <div>
      <strong>Registered Address:</strong> CEDRF Learning, Haldwani, Uttarakhand, India
    </div>
  </li>
  */}
  <li className="flex items-start gap-2">
    <GoLaw className="mt-1" />
    <div>
      <strong>Legal Entity:</strong> Comprehensive Educational Development and Research Foundation
    </div>
  </li>
</ul>

        </section>

        <footer className="text-gray-500 text-sm mt-10 border-t pt-4">
          Last updated: July 18, 2025
        </footer>
      </div>
     
    </div>
     <Footer/>
</>
  );
}