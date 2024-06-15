import { Box, Stack } from "@mui/material";
import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../components/animations/loading-animation.json";

const LoadingPage = () => {
  return (
    <Stack
      display="flex"
      alignItems="center"
      height="80vh"
      justifyContent="center"
      spacing={2}
    >
      {/* <CircularProgress color="primary" size="5rem" /> */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <Lottie
          animationData={loadingAnimation}
          style={{
            width: "30%",
          }}
        />
      </Box>
      {/* <Typography sx={{ fontSize: "2rem", color: "primary.main" }}>
        Loading...
      </Typography> */}
    </Stack>
  );
};

export default LoadingPage;
