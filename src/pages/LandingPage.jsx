import { Box, Typography } from "@mui/material";
import React from "react";

const LandingPage = () => {
  return (
    <div>
      <Box
        display="flex"
        alignItems="center"
        height="80vh"
        justifyContent="center"
      >
        <Typography variant="h2">
          Welcome to{" "}
          <Typography
            variant="inherit"
            color="primary"
            display="inline"
            fontStyle="italic"
          >
            eTHERIA
          </Typography>{" "}
          Admin!
        </Typography>
      </Box>
    </div>
  );
};

export default LandingPage;
