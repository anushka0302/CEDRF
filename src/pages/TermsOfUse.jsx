import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export default function TermsOfUse() {
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
            Terms of Use
          </h1>

          <p className="mb-6 text-lg leading-relaxed">
            Welcome to <strong>CEDRF Learning</strong>! These Terms of Use ("Terms") govern your access to and use of our website, services, and content. By accessing or using our platform, you agree to comply with these Terms. Please read them carefully.
          </p>

          <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-3">1. Acceptance of Terms</h2>
          <p className="mb-5 leading-relaxed">
            By accessing our platform, you confirm that you are at least 18 years old or have legal parental or guardian consent. You agree to be legally bound by these Terms and our Privacy Policy.
          </p>

          <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-3">2. Modifications to Terms</h2>
          <p className="mb-5 leading-relaxed">
            We reserve the right to update or revise these Terms at any time. Any changes will be posted on this page with an updated revision date. Continued use of our platform after changes means you accept the revised Terms.
          </p>

          <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-3">3. Account Responsibilities</h2>
          <p className="mb-5 leading-relaxed">
            You are responsible for maintaining the confidentiality of your login credentials. Any activity under your account will be deemed your responsibility. Notify us immediately of any unauthorized use of your account.
          </p>

          <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-3">4. Intellectual Property</h2>
          <p className="mb-5 leading-relaxed">
            All website content, course materials, designs, logos, and trademarks are the intellectual property of{" "}
            <strong>Comprehensive Educational Development and Research Foundation</strong>. You may not reproduce, distribute, or modify any content without written permission.
          </p>

          <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-3">5. User Conduct</h2>
          <p className="mb-5 leading-relaxed">
            You agree not to misuse our services. Prohibited activities include hacking, posting offensive or misleading content, violating copyright, or engaging in behavior that disrupts learning or community standards.
          </p>

          <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-3">6. Limitation of Liability</h2>
          <p className="mb-5 leading-relaxed">
            We are not liable for any direct, indirect, incidental, or consequential damages resulting from your use or inability to use our services, including data loss, service interruption, or unauthorized access.
          </p>

          <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-3">7. Governing Law</h2>
          <p className="mb-5 leading-relaxed">
            These Terms are governed by and construed under the laws of India. Any disputes shall be resolved under the exclusive jurisdiction of the courts in <strong>Haldwani, India</strong>.
          </p>

          <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-3">8. Privacy</h2>
          <p className="mb-5 leading-relaxed">
            We take your privacy seriously. Your personal information is collected and handled as per our <a href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</a>. We never sell or share your data without your consent.
          </p>

          <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-3">9. Payment & Refund Policy</h2>
          <p className="mb-5 leading-relaxed">
            All paid courses and services are non-transferable. Refunds, if applicable, are governed by our Refund Policy. Please review eligibility terms carefully before making a payment.
          </p>

          <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-3">10. Course Access & Use</h2>
          <p className="mb-5 leading-relaxed">
            When you enroll in a course, you receive a limited, non-exclusive, non-transferable license to access content solely for personal and educational use. Sharing course content externally is strictly prohibited.
          </p>

          <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-3">11. Termination</h2>
          <p className="mb-5 leading-relaxed">
            We may suspend or terminate your account if you violate these Terms, abuse our services, or engage in harmful behavior. You may also delete your account at any time by contacting us.
          </p>

          <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-3">12. Third-Party Links</h2>
          <p className="mb-5 leading-relaxed">
            Our website may contain links to external sites. We do not control or endorse their content and are not responsible for their privacy practices or terms.
          </p>

          <h2 className="text-2xl font-semibold text-blue-800 mt-6 mb-2">
            13. Shipping and Delivery
          </h2>
          <p className="mb-4">
            At <strong>CEDRF Learning</strong>, we currently do not offer any physical products; therefore, shipping and delivery charges are not applicable. If physical items are introduced in the future (e.g., printed certificates or merchandise), the applicable shipping charges and delivery timelines will be clearly mentioned on the product or checkout page.
          </p>

          <p className="mb-4">
            As of now, all content and services are delivered digitally. You are responsible for ensuring your internet access and device compatibility to access course materials and services.
          </p>

       { /*<p className="mb-4 italic text-sm text-gray-600">
            Note: Shipping and delivery charges and timelines are not currently specified on the website as no physical delivery is involved.
          </p>*/}

       <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-3">14. Contact Information</h2>
          <p className="mb-5 leading-relaxed">
            For any questions regarding these Terms, feel free to reach out to us:
            <br />
            📧 <a href="mailto:infocedrf@protonmail.com" className="text-blue-600 hover:underline">infocedrf@protonmail.com</a>
            <br />
            📞 <a href="tel:+917060666870" className="text-blue-600 hover:underline">+91 70606 66870</a>
            <br />
            📍 Gurudwara Road, Charayal Nayabad, Haldwani (Nainital), Uttarakhand 263139
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