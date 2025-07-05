import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h2 className="text-2xl font-bold">Welcome, {user?.username}</h2>
      <p className="mt-2 text-gray-600">Your progress will be shown here soon.</p>
      <div className="mt-6 border rounded p-4">
        <p className="text-sm text-gray-500">Feature coming: track completion per topic and pattern</p>
      </div>
    </div>
  );
}
