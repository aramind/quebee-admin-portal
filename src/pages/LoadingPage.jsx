import { Stack, Typography } from "@mui/material";
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
      <Typography sx={{ fontWeight: "bold", fontSize: "3rem" }}>
        Loading...
      </Typography>
    </Stack>
  );
};

export default LoadingPage;
