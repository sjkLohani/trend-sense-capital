
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requireAuth = true,
  requireAdmin = false,
}) => {
  const { user, profile, isLoading, isAdmin } = useAuth();

  if (isLoading) {
    // Show loading state while checking authentication
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  // If not authenticated and authentication is required, redirect to login
  if (requireAuth && !user) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated but admin access is required and user is not admin, redirect to investor dashboard
  if (requireAuth && requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  // If authenticated but trying to access auth pages (login/register), redirect to dashboard
  if (!requireAuth && user) {
    return <Navigate to={isAdmin ? "/admin/users" : "/dashboard"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
