import { useEffect, useState } from "react";
import Papa from "papaparse";

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
    const interval = setInterval(fetchJobs, 60000);
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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">🚀 Job Opportunities</h1>

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Search by title or company"
          className="w-full md:w-1/3 px-4 py-2 border rounded-lg shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          {['All', 'MNC', 'Government', 'Internship'].map((tag) => (
            <button
              key={tag}
              className={`px-3 py-1 rounded-full border ${
                filter === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700'
              }`}
              onClick={() => setFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedJobs.length === 0 ? (
          <p className="text-center col-span-full">No jobs found.</p>
        ) : (
          paginatedJobs.map((job, idx) => (
            <div
              key={idx}
              className="bg-white border rounded-2xl shadow-md p-5 hover:shadow-lg hover:scale-[1.02] transition"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold text-blue-800">{job.Title}</h2>
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                  {job.Tag}
                </span>
              </div>
              <p className="text-gray-700 font-medium">{job.Company} • {job.Type}</p>
              <p className="text-sm text-gray-500 mb-4">{job.Location}</p>
              <a
                href={job.Link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Apply Now →
              </a>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}