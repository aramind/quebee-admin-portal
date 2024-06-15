import { CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";

const LoadingPage = () => {
  return (
    <Stack
      display="flex"
      alignItems="center"
      height="80vh"
      justifyContent="center"
      spacing={0.5}
    >
      <CircularProgress color="primary" />
      {/* <Typography sx={{ fontWeight: "bold", fontSize: "3rem" }}>
        Loading...
      </Typography> */}
    </Stack>
  );
};

export default LoadingPage;
