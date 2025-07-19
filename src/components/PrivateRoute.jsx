import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children, requirePayment = false }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait until loading finishes
  if (loading) return null;

  // If not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If payment required and hasPaid is false
  if (requirePayment && !user.hasPaid) {
    return <Navigate to="/catalog" state={{ from: location }} replace />;
  }

  // User is authenticated and (if needed) has paid
  return children;
}
