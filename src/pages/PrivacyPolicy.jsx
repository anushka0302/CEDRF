import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import { MdMarkEmailRead } from "react-icons/md";
import { IoPhonePortrait } from "react-icons/io5";

export default function PrivacyPolicy() {
  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-black text-white font-serif px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-serif italic text-white text-center mb-8">
            Privacy Policy
          </h1>

          {/* Card container */}
          <div className="bg-gray-900 rounded-2xl shadow-inner p-6 md:p-10 space-y-6 border border-gray-700">
            <p className="leading-relaxed text-gray-300">
              At <strong className="text-white">CEDRF Learning</strong>, your privacy is important to us. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website or use our services.
            </p>

            <Section title="1. Information We Collect">
              <p>
                We may collect personal information such as your name, email address, phone number, educational background, payment details, and any content you submit through our platform.
              </p>
            </Section>

            <Section title="2. How We Use Your Information">
              <ul className="list-disc list-inside space-y-2">
                <li>Provide access to courses and learning materials</li>
                <li>Communicate updates and support</li>
                <li>Process payments and issue certificates</li>
                <li>Improve our platform and personalize your experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </Section>

            <Section title="3. Cookies & Tracking">
              <p>
                We use cookies to enhance your browsing experience, analyze site traffic, and understand user behavior. You can choose to disable cookies through your browser settings, but some features may not function properly.
              </p>
            </Section>

            <Section title="4. Data Security">
              <p>
                We implement industry-standard security measures to protect your data. However, no digital system is 100% secure, and we cannot guarantee absolute security of your personal information.
              </p>
            </Section>

            <Section title="5. Sharing Your Information">
              <p>
                We do not sell or rent your personal data. We may share your data with trusted service providers (e.g., payment gateways, analytics) under strict confidentiality agreements, or when required by law.
              </p>
            </Section>

            <Section title="6. Your Rights">
              <ul className="list-disc list-inside space-y-2">
                <li>Access and review your personal data</li>
                <li>Request correction or deletion</li>
                <li>Withdraw consent at any time</li>
                <li>Opt out of marketing communications</li>
              </ul>
              <p className="mt-2">
                To exercise these rights, please contact us at the email provided below.
              </p>
            </Section>

            <Section title="7. Children's Privacy">
              <p>
                Our services are intended for users aged 18 and above. We do not knowingly collect data from children under 13. If we learn that we have unintentionally collected such data, we will promptly delete it.
              </p>
            </Section>

            <Section title="8. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. Any changes will be reflected on this page with a new revision date. Please review this page periodically.
              </p>
            </Section>

            <Section title="9. Contact Us">
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center gap-2">
                  <MdMarkEmailRead className="text-[#ff6d00]" />
                  <a
                    href="mailto:infocedrf@protonmail.com"
                    className="text-[#ff6d00] hover:underline"
                  >
                    infocedrf@protonmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <IoPhonePortrait className="text-[#ff6d00]" />
                  <a
                    href="tel:+918630191968"
                    className="text-[#ff6d00] hover:underline"
                  >
                    +91 8630191968
                  </a>
                </div>
              </div>
            </Section>

            <p className="text-right text-sm text-gray-500 mt-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-2xl font-serif italic text-white mb-3">{title}</h2>
      <div className="text-gray-300 leading-relaxed">{children}</div>
    </div>
  );
}
