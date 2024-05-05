import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import useRefreshToken from "../hooks/useRefreshToken";
import { Outlet } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

const PersistLoginComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useContext(AuthContext);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.token ? verifyRefreshToken() : setIsLoading(false);
  }, [auth?.token, refresh]);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <LoadingPage /> : <Outlet />}</>
  );
};

export default PersistLoginComponent;
