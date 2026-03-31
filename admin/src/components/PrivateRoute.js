import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ isAdmin }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && !userInfo.isAdmin) {
    return <Navigate to="/" replace />; // Redirect to home or an unauthorized page
  }

  return <Outlet />;
};

export default PrivateRoute;