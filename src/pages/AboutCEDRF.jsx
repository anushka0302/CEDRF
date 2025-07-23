import React from "react";
import Footer from "../components/Footer";
import { MdMarkEmailRead } from "react-icons/md";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { CgWebsite } from "react-icons/cg";
const AboutCEDRF = () => {
  return (
    <>
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
    <main className="max-w-4xl mx-auto font-sans px-6 py-12 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">About CEDRF</h1>

      <p className="mb-6">
        <strong>Established in 2009</strong>, the{" "}
        <strong>
          Comprehensive Educational Development and Research Foundation (CEDRF)
        </strong>{" "}
        is a mission-driven organization dedicated to empowering students and young
        professionals through structured, industry-relevant education in technology and
        innovation.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Our Mission</h2>
      <p className="mb-6">
        We aim to bridge the gap between academic learning and industry expectations. Through
        affordable, accessible, and high-impact programs like our{" "}
        <strong>DSA Pattern Course</strong>, we help students become interview-ready, build
        strong resumes, and land top tech jobs — including at FAANG and other product companies.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">What We Offer</h2>
      <div className="list-disc list-inside space-y-2 mb-6">
        <p>🔹 12-Week DSA Program based on real-world coding patterns</p>
        <p>🔹 Practice with 480+ curated questions across Arrays, Trees, Graphs, and DP</p>
        <p>🔹 FAANG-level mock interviews and resume-building support</p>
        <p>🔹 Weekly mentorship, doubt-solving, and placement assistance</p>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Trusted by Learners Across India</h2>
      <p className="mb-6">
        Whether you’re a B.Tech, M.Tech, MBA, or MCA student, our programs are designed to turn
        your knowledge into projects — and projects into placement offers.
      </p>

      <blockquote className="border-l-4 border-blue-700 pl-4 italic text-gray-700 mb-6">
        “From zero to ₹21 LPA — all thanks to this course” — Rohit, Amazon <br />
        “From zero to ₹36 LPA — all thanks to this course” — Anuj Mishra, Lenskart
      </blockquote>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Backed by Passion, Not Profits</h2>
      <p className="mb-6">
        CEDRF operates with a not-for-profit mindset — we’ve kept our DSA course at just ₹499 so
        that every student, regardless of background, can access world-class education and
        mentorship.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Our Vision</h2>
      <p className="mb-6">
        To become India’s most trusted launchpad for tech careers — from college to corporate,
        from skills to startups.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">Connect With Us</h2>
<p>
  {/*<span className="flex items-center gap-2">
    <HiMiniBuildingOffice2 />
    Haldwani, Uttarakhand, India
  </span>*/}
  <span className="flex items-center gap-2 block mt-1">
    <CgWebsite />
    Website:{" "}
    <a
      href="https://www.cedrf.com"
      className="text-blue-600 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      www.cedrf.com
    </a>
  </span>
  <span className="flex items-center gap-2 block mt-1">
    <MdMarkEmailRead />
    Email:{" "}
    <a
      href="mailto:infocedrf@protonmail.com"
      className="text-blue-600 hover:underline"
    >
      infocedrf@protonmail.com
    </a>
  </span>

        <br />
      {/*    🔗{" "}
      <a
          href="https://www.linkedin.com/company/cedrf"
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>{" "}
        |{" "}
        <a
          href="https://www.facebook.com/cedrf"
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        */}
      </p>
     
    </main>
 <Footer/>
 
    </>
  );
};

export default AboutCEDRF;
