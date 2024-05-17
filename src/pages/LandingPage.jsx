import { Box, Button, Container, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useApiGet from "../hooks/api/useApiGet";

import LoadingPage from "./LoadingPage";
import useUserReq from "../hooks/api/useUserReq";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import useStyles from "../hooks/useStyles";

const LandingPage = () => {
  const { auth } = useContext(AuthContext);
  const refresh = useRefreshToken();
  const { get } = useUserReq();
  const navigate = useNavigate();

  const { data, isLoading, error, isError, isLoadingError } = useApiGet(
    ["users"],
    get,
    {
      enabled: true,
      refetchOnWindowFocus: true,
      retry: 2,
    }
  );

  // Redirect to login page if user is not authenticated
  // useEffect(() => {
  //   if (!auth?.token) {
  //     navigate("/login");
  //   }
  // }, [auth, navigate]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError || isLoadingError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <>
      {data && (
        <div>
          <Button onClick={() => refresh()}>Refresh</Button>
          <Box
            display="flex"
            alignItems="center"
            height="80vh"
            justifyContent="center"
          >
            <Typography variant="h3">
              Welcome to{" "}
              <Typography variant="inherit" color="primary" display="inline">
                queBEE
              </Typography>{" "}
              Admin Portal!
            </Typography>
          </Box>
        </div>
      )}
    </>
  );
};

export default LandingPage;
