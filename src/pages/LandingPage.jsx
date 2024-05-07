import { Box, Button, Typography } from "@mui/material";
import React from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useApiGet from "../hooks/api/useApiGet";

import LoadingPage from "./LoadingPage";
import useUserReq from "../hooks/api/useUserReq";

const LandingPage = () => {
  const refresh = useRefreshToken();
  const { get } = useUserReq();

  const { data, isLoading, error, isError, isLoadingError } = useApiGet(
    ["users"],
    get,
    {
      enabled: true,
      refetchOnWindowFocus: true,
      retry: 2,
    }
  );

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError || isLoadingError) {
    return <div>Error: {error?.message}</div>;
  }

  if (data) console.log("USERS", data);

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
              <Typography
                variant="inherit"
                color="primary"
                display="inline"
                fontStyle="italic"
              >
                eTHERIA
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
