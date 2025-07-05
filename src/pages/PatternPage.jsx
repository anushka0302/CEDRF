import { useParams } from 'react-router-dom';

export default function PatternPage({ data }) {
  const { topic } = useParams();
  const patterns = data[topic] || [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{topic} Patterns</h2>
      {patterns.map((pattern, i) => (
        <section key={i} className="p-4 border rounded bg-white shadow">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">{pattern.type}</h3>
          <p className="text-sm text-gray-600 mb-1"><strong>Scenario:</strong> {pattern.scenario}</p>
          <p className="text-sm text-gray-600 mb-2"><strong>Clue:</strong> {pattern.clue}</p>
          <ul className="list-disc list-inside space-y-1">
            {pattern.questions.map((q, idx) => (
              <li key={idx}>
                <a href={q.url} target="_blank" className="text-blue-600 hover:underline">
                  {q.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
