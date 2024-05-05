import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import UnAuthorizedPage from "../pages/unauthorized-page/UnAuthorizedPage";
import { AuthContext } from "../context/AuthProvider";

const ProtectedRoute = ({ allowedRoles }) => {
  const location = useLocation();

  const { auth } = useContext(AuthContext);

  return !auth?.token ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : !allowedRoles.includes(auth?.role) ? (
    <UnAuthorizedPage location={location} />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;
