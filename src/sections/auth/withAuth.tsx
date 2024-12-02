import React from 'react';
import { Navigate } from 'react-router-dom';

interface WithAuthProps {
  Component: React.ComponentType;
}

const WithAuth: React.FC<WithAuthProps> = ({ Component }) => {
  const isAuthenticated = !!sessionStorage.getItem('token'); // Check authentication
  return isAuthenticated ? <Component /> : <Navigate to="/" replace />;
};

export default WithAuth;
