// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

// This is a placeholder. You'd get this from your state management (Redux, Context, etc.)
const useAuth = () => {
  // Replace with your actual authentication logic
  const user = { loggedIn: true, role: 'admin' }; 
  return user;
};

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly }) => {
  const { loggedIn, role } = useAuth();

  if (!loggedIn) {
    // If not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  if (adminOnly && role !== 'admin') {
    // If route is for admins only and user is not an admin, redirect to home
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;