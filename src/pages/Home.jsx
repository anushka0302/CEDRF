import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Home({ data }) {
  const [checkedTopics, setCheckedTopics] = useState({});
  const [weeks, setWeeks] = useState(12);
  const [hours, setHours] = useState(40);
  const { user } = useAuth();
  const [mindstormingTime, setMindstormingTime] = useState(0);
  const activityTimeoutRef = useRef(null);
  const activityCheckRef = useRef(null);

  useEffect(() => {
    const todayKey = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const stored = localStorage.getItem(`mindstormingTime-${todayKey}`);
    const initialTime = stored ? parseInt(stored, 10) : 0;
    setMindstormingTime(initialTime);

    let isActive = false;
    const updateActivity = () => {
      isActive = true;
      clearTimeout(activityTimeoutRef.current);
      activityTimeoutRef.current = setTimeout(() => {
        isActive = false;
      }, 30000); // user inactive after 30s idle
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
    }, 60000); // every 1 minute

    return () => {
      clearInterval(activityCheckRef.current);
      ['mousemove', 'keydown', 'click', 'scroll'].forEach((event) => {
        window.removeEventListener(event, updateActivity);
      });
    };
  }, []);

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

  const totalQuestions = Object.values(data).reduce((sum, patterns) => (
    sum + patterns.reduce((acc, p) => acc + p.questions.length, 0)
  ), 0);

  const totalChecked = Object.values(checkedTopics).reduce((sum, arr) => sum + arr.length, 0);
  const totalHours = weeks * hours;
  const questionsPerHour = totalQuestions > 0 ? (totalQuestions / totalHours).toFixed(2) : 0;
  const completedPercentage = ((totalChecked / totalQuestions) * 100).toFixed(1);

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden bg-gray-50">
      {/* Left Sidebar */}
      <aside className="w-60 bg-white flex flex-col px-4 py-6 space-y-6">
        <div className="bg-indigo-100 p-4 rounded">
          <h2 className="font-semibold text-sm">Indicate your preferences</h2>
          <p className="text-xs text-gray-600 mt-1">We will recommend the best practice questions.</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded animate-pulse">
          <h2 className="font-semibold text-sm text-gray-700">⏱️Max mindstorming time</h2>
          <p className="text-lg font-bold text-yellow-800 mt-2">
            {mindstormingTime} minute{mindstormingTime === 1 ? '' : 's'} (today)
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700">SCHEDULE</h3>
          <div className="mt-2">
            <p className="text-xs">Weeks: {weeks}</p>
            <input
              type="range"
              min="1"
              max="20"
              value={weeks}
              onChange={(e) => setWeeks(Number(e.target.value))}
              className="w-full mt-1 cursor-pointer"
            />
          </div>
          <div className="mt-3">
            <p className="text-xs">Hours/week: {hours}</p>
            <input
              type="range"
              min="1"
              max="60"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full mt-1 text-blue-500 cursor-pointer"
            />
          </div>
          <div className="mt-4 text-xs text-gray-600">
            <p><strong>Total hours:</strong> {totalHours}</p>
            <p><strong>Questions/hour:</strong> {questionsPerHour}</p>
            <p><strong>Completed:</strong> {completedPercentage}%</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-8 py-10">
        <h1 className="text-3xl font-semibold mb-6">DSA Patterns</h1>
        <div className="space-y-6">
          {Object.entries(data).map(([topic, patterns]) => (
            <details
              key={topic}
              className="border rounded bg-white shadow-sm transition-all duration-300"
            >
              <summary className="text-blue-700 font-semibold px-4 py-3 cursor-pointer text-lg flex items-center justify-between hover:bg-blue-50">
                <span className="flex items-center gap-2">
                  ▶ {topic.replace(/([a-z])([A-Z])/g, '$1 $2')}
                </span>
                {isTopicChecked(topic, patterns) && <span className="text-green-600 font-bold text-lg">✔</span>}
              </summary>
              <div className="space-y-4 px-4 pb-4">
                {patterns.map((pattern, idx) => (
                  <div key={idx} className="p-4 border border-gray-200 rounded bg-white hover:shadow transition">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-blue-700">
                        {pattern.type}
                      </h3>
                      {isAllChecked(topic, pattern.type, pattern.questions.length) && (
                        <span className="text-green-600 font-bold text-lg">✔</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mb-1">
                      <strong>Scenario:</strong> {pattern.scenario}
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Clue:</strong> {pattern.clue}
                    </p>
                    <ul className="space-y-2">
                      {pattern.questions.map((q, i) => {
                        const checked = checkedTopics[`${topic}-${pattern.type}`]?.includes(i);
                        return (
                          <li
                            key={i}
                            className={`flex items-center justify-between px-4 py-2 rounded-md border transition duration-200 ${
                              checked ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <a
                              href={q.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-sm font-medium ${
                                checked ? 'text-green-700' : 'text-blue-700 hover:underline'
                              }`}
                            >
                              {q.title}
                            </a>
                            <input
                              type="checkbox"
                              className="accent-blue-600 h-4 w-4"
                              checked={checked || false}
                              onChange={() => toggleQuestion(topic, pattern.type, i)}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-60 bg-white  flex flex-col px-4 py-6 space-y-6">
        <div className="bg-blue-100 p-4 rounded">
          <h3 className="text-sm font-semibold">Welcome to Hoursdev — Code Your Future, One Hour at a Time.</h3>
          <p className="text-xs text-gray-700 mt-1">We help students turn ideas into real IT projects — fast.<br></br> <br></br>

Whether you're in B.Tech, M.Tech, MBA, or MCA, build with AI, ML, Blockchain, Android, and more — guided by experts, powered by the latest tech.<br></br> <br></br>
Let’s code your future, invest in your skills.</p>
          <a href="#" className="text-xs text-blue-600 hover:underline mt-1 block">
            Join today for a 20% discount!
          </a>
        </div>
        <div className="bg-red-100 p-4 rounded">
          <h3 className="text-sm font-semibold">Build a FAANG-Worthy Resume — Fast.</h3>
          <p className="text-xs text-gray-700 mt-1">
            Proven templates that land interviews.
          </p>
          <a href="#" className="text-xs text-red-600 hover:underline mt-1 block">
            Grab yours now at 70% OFF — limited time!
          </a>
        </div>
      </aside>
    </div>
  );
}
