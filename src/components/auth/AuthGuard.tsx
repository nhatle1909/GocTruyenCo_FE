import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { decodeJWT } from '../../utils/jwtUtils';

interface AuthGuardProps {
  children: ReactNode;
  requiredRoles: string[];
}

export const AuthGuard = ({ children, requiredRoles }: AuthGuardProps) => {
  const { token, isAuthenticated } = useAuthStore();
  const location = useLocation();
  // Check authentication first
  if (!isAuthenticated || !token) {
    console.log("Not authenticated, redirecting to home");
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Decode and verify token
  const claims = decodeJWT(token);
  if (!claims) {
    console.log("Invalid token, redirecting to home");
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Handle both string and array roles
  const userRoles = Array.isArray(claims.role) ? claims.role : [claims.role];
  
  // Check if user has any of the required roles
  const hasRequiredRole = requiredRoles.some(role => 
    userRoles.some(userRole => userRole.toLowerCase() === role.toLowerCase())
  );

  if (!hasRequiredRole) {
    console.log("Insufficient permissions, redirecting to home");
    console.log("User roles:", userRoles);
    console.log("Required roles:", requiredRoles);
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};