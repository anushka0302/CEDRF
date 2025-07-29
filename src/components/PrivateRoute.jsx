import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children, requirePayment = false }) {
  const { user } = useAuth();
  const location = useLocation();

  // Wait until loading finishes
  

  // If not logged in
  if (!user) {
    return <Navigate to="/catalog" replace />;
  }

  // If payment required and hasPaid is false
  if (requirePayment && !user.hasPaid) {
    return <Navigate to="/catalog" state={{ from: location }} replace />;
  }

  // User is authenticated and (if needed) has paid
  return children;
}
