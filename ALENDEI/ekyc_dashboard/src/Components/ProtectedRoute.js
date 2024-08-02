import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();
  const { role } = useSelector((state) => state.form);

  if (role) {
    // console.log(role);
    if (allowedRoles.includes(role)) {
      return <Outlet />;
    } else {
      return <Navigate to='/' state={{ from: location }} replace />;
    }
  } else {
    return <Navigate to='/' state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;
