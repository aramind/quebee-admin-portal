import React from "react";
import { useGlobalState } from "../context/ContextProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import UnAuthorizedPage from "../pages/unauthorized-page/UnAuthorizedPage";

const SuperProtectedLayout = ({ allowedRoles }) => {
  const {
    globalState: { currentUser },
  } = useGlobalState();

  const location = useLocation();

  return allowedRoles.includes(currentUser?.role) ? (
    <Outlet />
  ) : (
    <UnAuthorizedPage />
  );
};

export default SuperProtectedLayout;
