import React, { useContext, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useGlobalState } from "../context/ContextProvider";

const RequireAuth = ({ allowedRoles }) => {
  const {
    globalState: { currentUser },
  } = useGlobalState();
  //   const { auth } = useContext(AuthContext);
  const location = useLocation();

  console.log(allowedRoles);
  return allowedRoles.includes(currentUser?.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
