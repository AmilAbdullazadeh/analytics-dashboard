import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { isAuthenticated, hasRole } from '@/utils/auth';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

export function PrivateRoute({ children, requiredRole }: PrivateRouteProps) {
  const location = useLocation();
  const authState = useSelector((state: RootState) => state.auth);

  // Check both Redux state and token validity
  const isAuthed = authState.isAuthenticated && isAuthenticated();

  if (!isAuthed) {
    // Save the attempted location
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
