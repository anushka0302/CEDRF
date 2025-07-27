import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';
import React from 'react';
import { toast } from 'react-toastify';

import linkIcon from '../assets/clickss.svg';
import { FcBookmark } from "react-icons/fc";
import { FcServices } from "react-icons/fc";
export default function Home({ data }) {
  const [checkedTopics, setCheckedTopics] = useState({});
  const [weeks, setWeeks] = useState(12);
  const [hours, setHours] = useState(40);
  const { user, logout} = useAuth();
  const [mindstormingTime, setMindstormingTime] = useState(0);
  const activityTimeoutRef = useRef(null);
  const activityCheckRef = useRef(null);
  const [openSubtopics, setOpenSubtopics] = useState({});
const [clickedLinks, setClickedLinks] = useState({});

const handleLinkClick = (topic, type, index, url) => {
  window.open(url, "_blank", "noopener,noreferrer");

  setClickedLinks((prev) => {
    const key = `${topic}-${type}`;
    const already = prev[key] || [];
    if (!already.includes(index)) {
      return { ...prev, [key]: [...already, index] };
    }
    return prev;
  });
};

  useEffect(() => {
    const todayKey = new Date().toISOString().slice(0, 10);
    const stored = localStorage.getItem(`mindstormingTime-${todayKey}`);
    const initialTime = stored ? parseInt(stored, 10) : 0;
    setMindstormingTime(initialTime);

    let isActive = false;
    const updateActivity = () => {
      isActive = true;
      clearTimeout(activityTimeoutRef.current);
      activityTimeoutRef.current = setTimeout(() => {
        isActive = false;
      }, 30000);
    };

    ['mousemove', 'keydown', 'click', 'scroll'].forEach((event) => {
      window.addEventListener(event, updateActivity);
    });

    activityCheckRef.current = setInterval(() => {
      if (isActive) {
        setMindstormingTime((prev) => {
          const updated = prev + 1;
          localStorage.setItem(`mindstormingTime-${todayKey}`, updated.toString());
          return updated;
        });
      }
    }, 60000);




    
    return () => {
      clearInterval(activityCheckRef.current);
      ['mousemove', 'keydown', 'click', 'scroll'].forEach((event) => {
        window.removeEventListener(event, updateActivity);
      });
    };
  }, []);

useEffect(() => {
  if (location.state?.paymentRequired) {
    toast.warning("Please complete payment to access the dashboard.");
  }
}, [location.state]);

  const toggleQuestion = (topic, type, index) => {
    const key = `${topic}-${type}`;
    setCheckedTopics((prev) => {
      const updated = { ...prev };
      const current = updated[key] || [];
      if (current.includes(index)) {
        updated[key] = current.filter((i) => i !== index);
      } else {
        updated[key] = [...current, index];
      }
      return updated;
    });
  };

  const isAllChecked = (topic, type, total) => {
    const key = `${topic}-${type}`;
    return checkedTopics[key]?.length === total;
  };

  const isTopicChecked = (topic, patterns) => {
    return patterns.every(
      (p) => checkedTopics[`${topic}-${p.type}`]?.length === p.questions.length
    );
  };

  const toggleSubtopic = (topic, index) => {
    const key = `${topic}-${index}`;
    setOpenSubtopics((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalQuestions = Object.values(data).reduce((sum, patterns) => (
    sum + patterns.reduce((acc, p) => acc + p.questions.length, 0)
  ), 0);

  const totalChecked = Object.values(checkedTopics).reduce((sum, arr) => sum + arr.length, 0);
  const totalHours = weeks * hours;
  const questionsPerHour = totalQuestions > 0 ? (totalQuestions / totalHours).toFixed(2) : 0;
  const completedPercentage = ((totalChecked / totalQuestions) * 100).toFixed(1);

//setTimeout(() => {
 // logout();
 // toast.info('Forced logout after 5 sec');
//}, 5000);
useEffect(() => {
  const timeout = setTimeout(() => {
    logout();
    toast.info('You have been logged out due to 8 hours of inactivity.');
  }, 8 * 60 * 60 * 1000); // 8 hours in milliseconds

  return () => clearTimeout(timeout);
}, []);


const email = "infocedrf@protonmail.com";
const subject = "Interested in taking the FANG template";
const body = `Hello, I found your FANG Template Resume on the website and would like to know more about your services.

Please get back to me at your earliest convenience.

Name: 

Phone:

Email:

`;

const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;


  return (
    <>
     <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
    <div className="flex flex-col lg:flex-row min-h-screen w-full overflow-x-hidden bg-gray-900">
     <ScrollToTop/>
    <aside className="lg:w-60 w-full bg-gray-900 flex flex-col px-4 py-6 space-y-6 order-1 lg:order-none">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-md text-white transition hover:border-orange-500">
  <h2 className="font-semibold text-sm mb-1">Indicate your preferences</h2>
  <p className="text-xs text-white/80">
    We will recommend the best practice questions.
  </p>
</div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl animate-pulse shadow-md transition hover:border-orange-500 text-white">
  <h2 className="font-semibold text-sm text-white/90">Max mindstorming time</h2>
  <p className="text-lg font-bold text-yellow-400 mt-2">
    {mindstormingTime} minute{mindstormingTime === 1 ? '' : 's'} (today)
  </p>
</div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-md text-white hover:border-orange-500 transition">
  <h3 className="text-sm font-semibold text-white/90">SCHEDULE</h3>
  <div className="mt-2">
    <p className="text-xs text-white/80">Weeks: {weeks}</p>
    <input type="range" min="1" max="20" value={weeks} onChange={(e) => setWeeks(Number(e.target.value))}
      className="w-full mt-1 cursor-pointer accent-orange-400"/>
  </div>


          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-md text-white hover:border-orange-500 transition mt-3">
  <p className="text-xs text-white/80">Hours/week: {hours}</p>
  <input
    type="range"
    min="1"
    max="60"
    value={hours}
    onChange={(e) => setHours(Number(e.target.value))}
    className="w-full mt-1 accent-orange-400 cursor-pointer"/>
</div>

          <div className="mt-4 text-xs text-white">
            <p><strong>Total hours:</strong> {totalHours}</p>
            <p><strong>Questions/hour:</strong> {questionsPerHour}</p>
            <p><strong>Completed:</strong> {completedPercentage}%</p>
          </div>
        </div>
      </aside>

<main className="flex-1 px-4 md:px-8 py-6 order-0 lg:order-none">
  <h1 className="text-2xl md:text-3xl text-white font-semibold mb-6 text-center lg:text-left">
    DSA Patterns
  </h1>
  <div className="space-y-6">
    {Object.entries(data).map(([topic, patterns]) => (
      <details
        key={topic}
        className=" bg-transparent border border-gray-700 rounded-xl p-4 transition-all duration-300 hover:border-orange-500"
      >
        <summary className="text-white font-semibold px-4 py-3 cursor-pointer text-lg flex items-center justify-between hover:bg-orange-500/10 transition-colors duration-300">
          <span className="flex items-center gap-2">
             <span className="rotate-270">
    <FcBookmark />
  </span>
            {topic.replace(/([a-z])([A-Z])/g, "$1 $2")}
          </span>
          {isTopicChecked(topic, patterns) && (
            <span className="text-green-600 font-bold text-lg">✔</span>
          )}
        </summary>
     <div className="space-y-4 px-4 pb-4">
  {patterns.map((pattern, idx) => {
    const isOpen = openSubtopics[`${topic}-${idx}`];

    return (
      <div key={idx}>
        {/* Pattern Header */}
       
        <div
          className="text-md font-semibold  text-white cursor-pointer px-4 py-2 rounded flex justify-between items-center  hover:bg-orange-300/10 transition-colors duration-300"
          onClick={() => toggleSubtopic(topic, idx)}
        >
          
          {pattern.type}
           <FcServices/>
          {isAllChecked(topic, pattern.type, pattern.questions.length) && (
            <span className="text-green-600 font-bold">✔</span>
          )}
        </div>

        {isOpen && (
          
          <div className="bg-transparent border border-gray-700 rounded-xl p-4 transition-all duration-300  bg-gray-900 hover:shadow transition">
            {/* Scenario and Clue */}
            <p className="text-sm text-white mb-1">
              <strong>Scenario:</strong> {pattern.scenario}
            </p>
            <p className="text-sm text-white mb-4">
              <strong>Clue:</strong> {pattern.clue}
            </p>

            {/* Mark when done header (global) */}
            <div className="flex justify-end pr-4 text-xs font-semibold mb-2 animate-pulse text-[#FEC5E5] drop-shadow-[0_0_5px_rgba(255,0,200,0.8)]">
              Mark when done
            </div>

            <ul className="space-y-3">
              {pattern.questions.map((q, i) => {
                const checked = checkedTopics[`${topic}-${pattern.type}`]?.includes(i);
                const clicked = clickedLinks[`${topic}-${pattern.type}`]?.includes(i);
                const questionNum = `Q${i + 1}`;

                return (
                  <li
                    key={i}
                    className={`flex items-center justify-between px-4 py-2 rounded-md border transition duration-200 flex-wrap gap-2 hover:bg-orange-200/10 transition-colors duration-300 ${
                      checked ? "bg-green-50 border-green-300" : "bg-gray-900 bg-transparent border border-gray-700 rounded-xl p-4 transition-all duration-300 hover:border-orange-500"
                    }`}
                  >
                    {/* Left: Question Number and Title */}
                    <div className="flex items-center gap-3 flex-wrap w-full sm:w-auto flex-1">
                      <span className="text-sm font-medium text-[#B0E0E6]">{questionNum}</span>
                      <span
                        className={`text-sm font-medium break-all ${
                          checked ? "text-green-500 " : "text-[#4FBAC7] "
                        }`}
                      >
                        {q.title}
                      </span>
                    </div>

                    {/* Middle: Click here oval */}
<div className="flex-1 flex justify-center sm:justify-start">
  <button
    onClick={() => handleLinkClick(topic, pattern.type, i, q.url)}
    className={`text-xs font-semibold px-3 py-1 rounded-full transition duration-200 ${
      clicked
        ? "bg-green-600 text-white"
        : "bg-blue-100 text-blue-700 hover:bg-blue-200"
    }`}
  >
    Click here
  </button>
</div>

                    {/* Right: Checkbox */}
                    <div>
                      <input
                        type="checkbox"
                        className="accent-blue-600 h-4 w-4"
                        checked={checked || false}
                        onChange={() => toggleQuestion(topic, pattern.type, i)}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  })}
</div>

      </details>
    ))}
  </div>
</main>

      <aside className="lg:w-60 w-full bg-gray-900 flex flex-col px-4 py-6 space-y-6 order-2 lg:order-none">
       
       <div className="rounded-2xl border border-white/20 p-6 bg-white/10 backdrop-blur-md text-white font-sans shadow-xl transition duration-300 hover:border-orange-500">
  <h5 className="text-xl font-bold text-white tracking-tight mb-3">
    Welcome to CEDRF — Code Your Future, One Hour at a Time.
  </h5>
  <p className="text-sm leading-relaxed text-white/80 mb-5">
    <strong className="text-white">CEDRF</strong> is where your ideas become real-world projects.
    Whether you're pursuing <strong className="text-white">B.Tech</strong>, <strong className="text-white">M.Tech</strong>, <strong className="text-white">MBA</strong>, or <strong className="text-white">MCA</strong>, our expert-led guidance helps you build hands-on IT projects in <strong className="text-white">AI</strong>, <strong className="text-white">Machine Learning</strong>, <strong className="text-white">Blockchain</strong>, <strong className="text-white">Android</strong>, and beyond.
    <br /><br />
    Learn from mentors who code, create, and inspire — and unlock the tools you need to succeed in today’s tech landscape.
  </p>
  <a
    href="/mentoring"
    className="inline-block text-sm font-medium text-orange-400 hover:text-orange-500 hover:underline transition duration-200"
  >
    Join today & get 20% off mentoring →
  </a>
</div>
       <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-md text-white transition hover:border-orange-500">
  <h3 className="text-sm font-semibold mb-1">Build a FAANG-Worthy Resume — Fast.</h3>
  <p className="text-xs text-white/80">
    Proven templates that land interviews.
  </p>

  <a
    href={mailtoLink}
    className="text-xs font-medium text-black bg-orange-400 hover:bg-orange-500 transition px-3 py-1 rounded mt-3 inline-block shadow hover:shadow-lg"
  >
    Click Me
  </a>
</div>
      </aside>
     
    </div>
  
      <Footer />
    
    </>
  );
}
