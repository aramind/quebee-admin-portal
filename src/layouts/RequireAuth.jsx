import React from "react";
import { useGlobalState } from "../context/ContextProvider";
import { useLocation } from "react-router-dom";

const RequireAuth = () => {
  const {
    globalState: { currentUser },
    dispatch,
  } = useGlobalState();
  const location = useLocation();

  return <div>RequireAuth</div>;
};

export default RequireAuth;
