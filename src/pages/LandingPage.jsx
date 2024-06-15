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
      className="outlined"
    >
      <Stack>
        <Typography variant="h6">Hello {auth?.name?.firstName}!</Typography>
        <Typography variant="h4">
          Welcome to
          <Typography
            fontWeight="bold"
            variant="inherit"
            color="primary"
            display="inline"
            pl={1}
          >
            queBEE
          </Typography>{" "}
          Admin Portal!
        </Typography>
      </Stack>
      <br />
      <br />
      <Stack justifyContent="center" alignItems="center">
        <Box
          component="img"
          src="/assets/imgs/hello.svg"
          alt="hello"
          sx={{ maxWidth: "70%", height: "auto" }}
        />
      </Stack>
    </Stack>
  );
};

export default LandingPage;
