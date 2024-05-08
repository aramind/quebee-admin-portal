import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RequestErrorPage from "../../pages/RequestErrorPage";

const useErrorHandlerUnAuthReq = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleError = (err) => {
    const status = err?.response?.status;
    console.log(status);
    if (status === 401 || status === 403) {
      console.log("re logging in");
      navigate("/login", { state: { from: location }, replace: true });
      return;
    } else {
      return <RequestErrorPage error={err} />;
    }
  };

  return handleError;
};

export default useErrorHandlerUnAuthReq;
