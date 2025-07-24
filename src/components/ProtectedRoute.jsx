import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
    </div>;
  }

  if (!user) {
    // Save the current location they were trying to go to
    localStorage.setItem('returnPath', location.pathname);
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute; 