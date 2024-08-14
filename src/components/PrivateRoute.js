import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const authToken = sessionStorage.getItem('authToken');
  return authToken ? children : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
