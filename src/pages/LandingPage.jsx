import { Box, Button, Typography } from "@mui/material";
import React from "react";
import useRefreshToken from "../hooks/useRefreshToken";

const LandingPage = () => {
  const refresh = useRefreshToken();

  return (
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
  );
};

export default LandingPage;
