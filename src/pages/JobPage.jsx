import { useEffect, useState } from "react";
import Papa from "papaparse";
import Footer from "../components/Footer";
import { SiLaunchpad } from "react-icons/si";
import { ArrowLeft, ArrowRight, Loader } from "lucide-react";

const GOOGLE_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGwA0BCBpGv51pmvnz5d-KwpbaipbOf5S7G5bnlY5TdRqalSiJYHKe-CQnuMLz6v5E1bM1GJlcego0/pub?output=csv";

const JOBS_PER_PAGE = 9;

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);

  const fetchJobs = () => {
    fetch(GOOGLE_SHEET_CSV_URL)
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const sorted = results.data.sort(
              (a, b) => new Date(b.Date) - new Date(a.Date)
            );
            setJobs(sorted);
          },
        });
      })
      .catch((err) => console.error("Failed to fetch jobs:", err));
  };

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let filtered = jobs.filter(
      (job) =>
        job.Title?.toLowerCase().includes(search.toLowerCase()) ||
        job.Company?.toLowerCase().includes(search.toLowerCase())
    );
    if (filter !== "All") {
      filtered = filtered.filter((job) => job.Tag === filter);
    }
    setFilteredJobs(filtered);
    setPage(1);
  }, [search, filter, jobs]);

  const paginatedJobs = filteredJobs.slice(
    (page - 1) * JOBS_PER_PAGE,
    page * JOBS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);

  return (
    <div className="bg-black min-h-screen">
      <div className="p-6">
        <h1 className="text-4xl font-serif italic text-white mb-8 text-center">
          <span className="inline-flex items-center justify-center gap-3">
            <SiLaunchpad className="text-[#ff6d00]" />
            Job Opportunities
            <SiLaunchpad className="text-[#ff6d00]" />
          </span>
        </h1>

        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 max-w-6xl mx-auto">
          <input
            type="text"
            placeholder="Search by title or company"
            className="w-full md:w-1/3 px-4 py-3 italic  bg-white/10 border border-gray-700 rounded-sm text-white placeholder-gray-400 focus:border-[#ff6d00] focus:outline-none transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-3">
            {["All", "MNC", "Government", "Internship"].map((tag) => (
              <button
                key={tag}
                className={`px-2 py-1 rounded-sm border italic transition-colors bg-white/10 bg-opacity-20 backdrop-blur-sm border-[#ff6d00] border-opacity-30
        ${
          filter === tag
            ? "text-[#ff6d00] opacity-80"
            : "text-white border-gray-700 hover:border-[#ff6d00] hover:text-[#ff6d00]"
        }`}
                onClick={() => setFilter(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {paginatedJobs.length === 0 ? (
            <div className="text-center col-span-full py-12 flex justify-center items-center min-w-full">
              <Loader className="text-gray-400 text-lg animate-spin" />
            </div>
          ) : (
            paginatedJobs.map((job, idx) => (
              <div
                key={idx}
                className="bg-gray-900 border border-gray-700 rounded-lg   p-6 hover:scale-[1.01] hover:border-gray-700 transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-white leading-tight pr-2">
                    {job.Title}
                  </h2>
                  
                  <span className="text-xs px-1 py-0.5 text-white italic rounded-sm border border-[#ff6d00] border-opacity-30 bg-white/10 bg-opacity-20 backdrop-blur-sm">
                    {job.Tag}
                  </span>
                </div>
                <p className="text-gray-300 font-medium mb-2">
                  {job.Company} •{" "}
                  <span className="text-gray-400">{job.Type}</span>
                </p>
                <p className="text-sm text-gray-500 mb-6">{job.Location}</p>
                <a
                  href={job.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-auto px-5 py-2 text-[#ff6d00]  rounded-lg hover:text-green-500 transition-colors font-semibold"
                >
                  Apply Now →
                </a>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center gap-2 items-center">
            {/* Prev button */}
            <button
              onClick={() => setPage(page > 1 ? page - 1 : 1)}
              disabled={page === 1}
              className={`px-2 rounded-sm transition-colors font-medium flex items-center gap-1
        ${page === 1 ? "opacity-40 cursor-not-allowed" : "hover:text-[#ff6d00]"}
      `}
            >
              <ArrowLeft size={16} className="text-[#ff6d00]" />
            </button>

            {/* Page number buttons */}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-2 rounded-sm transition-colors font-medium ${
                  page === i + 1
                    ? "bg-[#ff6d00] text-white opacity-80"
                    : "bg-white/10 text-gray-300 border border-gray-700 hover:border-[#ff6d00] hover:text-[#ff6d00]"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next button */}
            <button
              onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
              disabled={page === totalPages}
              className={`px-2 rounded-sm transition-colors font-medium flex items-center gap-1
        ${
          page === totalPages
            ? "opacity-40 cursor-not-allowed"
            : "hover:text-[#ff6d00]"
        }
      `}
            >
              <ArrowRight size={16} className="text-[#ff6d00]" />
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
