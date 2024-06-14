import { Box, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";

import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  // Redirect to login page if user is not authenticated
  useEffect(() => {
    if (!auth?.token) {
      navigate("/login");
    }
  }, [auth, navigate]);

  return (
    <Stack
      height="90vh"
      justifyContent="center"
      alignItems="center"
      px="10vw"
      py="10vh"
      spacing={2}
    >
      <Stack>
        <Typography variant="h4">
          {`Hello ${auth?.name?.firstName}! Welcome to `}
          <Typography variant="inherit" color="primary" display="inline">
            queBEE
          </Typography>{" "}
          Admin Portal!
        </Typography>
      </Stack>
      <Box pt={4}>
        <Box
          component="img"
          src="/assets/imgs/hello.svg"
          alt="hello"
          sx={{ maxWidth: "100%", height: "auto" }}
        />
      </Box>
    </Stack>
  );
};

export default LandingPage;
