import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { MdMarkEmailRead } from "react-icons/md";
import { IoPhonePortrait } from "react-icons/io5";
export default function PrivacyPolicy() {
  return (
    <>
      {/* Load Inter font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen bg-gray-50 text-gray-800 p-6 md:p-12"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        <ScrollToTop />
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-12">
          <h1 className="text-4xl font-extrabold text-center text-blue-900 mb-8 tracking-tight">
            Privacy Policy
          </h1>

          <p className="mb-6 text-lg leading-relaxed">
            At <strong>CEDRF Learning</strong>, your privacy is important to us. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or use our services.
          </p>

          <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-3">1. Information We Collect</h2>
          <p className="mb-5 leading-relaxed">
            We may collect personal information such as your name, email address, phone number, educational background, payment details, and any content you submit through our platform.
          </p>

          <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-3">2. How We Use Your Information</h2>
          <p className="mb-5 leading-relaxed">
            Your information is used to:
            <ul className="list-disc pl-6 mt-2">
              <li>Provide access to courses and learning materials</li>
              <li>Communicate updates and support</li>
              <li>Process payments and issue certificates</li>
              <li>Improve our platform and personalize your experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </p>

          <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-3">3. Cookies & Tracking</h2>
          <p className="mb-5 leading-relaxed">
            We use cookies to enhance your browsing experience, analyze site traffic, and understand user behavior. You can choose to disable cookies through your browser settings, but some features may not function properly.
          </p>

          <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-3">4. Data Security</h2>
          <p className="mb-5 leading-relaxed">
            We implement industry-standard security measures to protect your data. However, no digital system is 100% secure, and we cannot guarantee absolute security of your personal information.
          </p>

          <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-3">5. Sharing Your Information</h2>
          <p className="mb-5 leading-relaxed">
            We do not sell or rent your personal data. We may share your data with trusted service providers (e.g., payment gateways, analytics) under strict confidentiality agreements, or when required by law.
          </p>

          <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-3">6. Your Rights</h2>
          <p className="mb-5 leading-relaxed">
            You have the right to:
            <ul className="list-disc pl-6 mt-2">
              <li>Access and review your personal data</li>
              <li>Request correction or deletion</li>
              <li>Withdraw consent at any time</li>
              <li>Opt out of marketing communications</li>
            </ul>
            To exercise these rights, please contact us at the email provided below.
          </p>

          <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-3">7. Children's Privacy</h2>
          <p className="mb-5 leading-relaxed">
            Our services are intended for users aged 18 and above. We do not knowingly collect data from children under 13. If we learn that we have unintentionally collected such data, we will promptly delete it.
          </p>

          <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-3">8. Changes to This Policy</h2>
          <p className="mb-5 leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes will be reflected on this page with a new revision date. Please review this page periodically.
          </p>

          <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-3">9. Contact Us</h2>
                  <p className="mb-5 leading-relaxed">
  For any questions regarding these Terms, feel free to reach out to us:
  <br />
  <span className="flex items-center gap-2 mt-2">
    <MdMarkEmailRead />
    <a href="mailto:infocedrf@protonmail.com" className="text-blue-600 hover:underline">
      infocedrf@protonmail.com
    </a>
  </span>
  <span className="flex items-center gap-2 mt-2">
    <IoPhonePortrait />
    <a href="tel:+918630191968" className="text-blue-600 hover:underline">
      +91 8630191968
    </a>
  </span>
</p>


          <p className="mt-10 text-sm text-gray-500 text-right">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
       
      </div>
       <Footer />
    </>
  );
}