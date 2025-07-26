import Footer from "../components/Footer";
import { MdMarkEmailRead } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";

const AboutCEDRF = () => {
  return (
    <div className="bg-black min-h-screen text-gray-300">
      <main className="max-w-4xl mx-auto font-serif px-6 py-12">
        <h1 className="text-4xl font-serif italic text-white mb-8">
          About CEDRF
        </h1>

        <p className="mb-6 text-gray-300 leading-relaxed">
          <strong className="text-white">Established in 2009</strong>, the{" "}
          <strong className="text-white font-serif italic">
            Comprehensive Educational Development and Research Foundation
            (CEDRF)
          </strong>{" "}
          is a mission-driven organization dedicated to empowering students and
          young professionals through structured, industry-relevant education in
          technology and innovation.
        </p>

        <h2 className="text-2xl font-serif italic text-white mt-10 mb-4">
          Our Mission
        </h2>
        <p className="mb-6 text-gray-300 leading-relaxed">
          We aim to bridge the gap between academic learning and industry
          expectations. Through affordable, accessible, and high-impact programs
          like our <strong className="text-red-400">DSA Pattern Course</strong>,
          we help students become interview-ready, build strong resumes, and
          land top tech jobs — including at FAANG and other product companies.
        </p>

        <h2 className="text-2xl font-serif italic text-white mt-10 mb-4">
          What We Offer
        </h2>
        <div className="space-y-3 mb-8">
          <p className="text-gray-300 flex items-start">
            <span className="text-red-400 mr-3">•</span>
            12-Week DSA Program based on real-world coding patterns
          </p>
          <p className="text-gray-300 flex items-start">
            <span className="text-red-400 mr-3">•</span>
            Practice with 480+ curated questions across Arrays, Trees, Graphs,
            and DP
          </p>
          <p className="text-gray-300 flex items-start">
            <span className="text-red-400 mr-3">•</span>
            FAANG-level mock interviews and resume-building support
          </p>
          <p className="text-gray-300 flex items-start">
            <span className="text-red-400 mr-3">•</span>
            Weekly mentorship, doubt-solving, and placement assistance
          </p>
        </div>

        <h2 className="text-2xl font-serif italic text-white mt-10 mb-4">
          Trusted by Learners Across India
        </h2>
        <p className="mb-6 text-gray-300 leading-relaxed">
          Whether you're a B.Tech, M.Tech, MBA, or MCA student, our programs are
          designed to turn your knowledge into projects — and projects into
          placement offers.
        </p>

        <blockquote className="border-l-4 border-red-500 bg-gray-900 p-4 italic text-gray-400 mb-8 rounded-r">
          <p className="mb-2">
            "From zero to ₹21 LPA — all thanks to this course" —{" "}
            <span className="text-white">Rohit, Amazon</span>
          </p>
          <p>
            "From zero to ₹36 LPA — all thanks to this course" —{" "}
            <span className="text-white">Anuj Mishra, Lenskart</span>
          </p>
        </blockquote>

        <h2 className="text-2xl font-serif italic text-white mt-10 mb-4">
          Backed by Passion, Not Profits
        </h2>
        <p className="mb-6 text-gray-300 leading-relaxed">
          CEDRF operates with a not-for-profit mindset — we've kept our DSA
          course at just <strong className="text-red-400">₹499</strong> so that
          every student, regardless of background, can access world-class
          education and mentorship.
        </p>

        <h2 className="text-2xl font-serif italic text-white mt-10 mb-4">
          Our Vision
        </h2>
        <p className="mb-6 text-gray-300 leading-relaxed">
          To become India's most trusted launchpad for tech careers — from
          college to corporate, from skills to startups.
        </p>

        <h2 className="text-2xl font-serif italic text-white mt-10 mb-4">
          Connect With Us
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-300">
            <CgWebsite className="text-red-400" size={20} />
            <span>Website:</span>
            <a
              href="https://www.cedrf.com"
              className="text-red-400 hover:text-red-300 hover:underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.cedrf.com
            </a>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <MdMarkEmailRead className="text-red-400" size={20} />
            <span>Email:</span>
            <a
              href="mailto:infocedrf@protonmail.com"
              className="text-red-400 hover:text-red-300 hover:underline transition-colors"
            >
              infocedrf@protonmail.com
            </a>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm font-serif italic">
            — Since 2009 —
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutCEDRF;
