import { useEffect, useState } from "react";
import Papa from "papaparse";

const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGwA0BCBpGv51pmvnz5d-KwpbaipbOf5S7G5bnlY5TdRqalSiJYHKe-CQnuMLz6v5E1bM1GJlcego0/pub?output=csv";

export default function JobPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(GOOGLE_SHEET_CSV_URL)
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => setJobs(results.data),
        });
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {jobs.map((job, idx) => (
        <div key={idx} className="bg-white p-4 rounded-2xl shadow-lg border hover:scale-[1.02] transition">
          <div className="flex justify-between mb-2">
            <h2 className="text-xl font-bold">{job.Title}</h2>
            <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded">{job.Tag}</span>
          </div>
          <p className="text-gray-700">{job.Company} • {job.Type}</p>
          <p className="text-sm text-gray-500">{job.Location}</p>
          <a
            href={job.Link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Apply Now →
          </a>
        </div>
      ))}
    </div>
  );
}