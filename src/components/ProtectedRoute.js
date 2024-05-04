import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGlobalState } from "../context/ContextProvider";
import UnAuthorizedPage from "../pages/unauthorized-page/UnAuthorizedPage";

const ProtectedRoute = ({ allowedRoles }) => {
  const {
    globalState: { currentUser },
  } = useGlobalState();
  //   const { auth } = useContext(AuthContext);
  const location = useLocation();

  return !currentUser?.token ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : !allowedRoles.includes(currentUser?.role) ? (
    <UnAuthorizedPage location={location} />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;
