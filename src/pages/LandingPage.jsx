import { Box, Button, Container, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useApiGet from "../hooks/api/useApiGet";

import LoadingPage from "./LoadingPage";
import useUserReq from "../hooks/api/useUserReq";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import useStyles from "../hooks/useStyles";
import { useForm } from "react-hook-form";
import FormContentsSection from "./add-question-page/FormContentsSection";
import FormActionsSection from "./add-question-page/FormActionsSection";
import { red } from "@mui/material/colors";

const LandingPage = () => {
  const { auth } = useContext(AuthContext);
  const styles = useStyles();
  const refresh = useRefreshToken();
  const { get } = useUserReq();
  const navigate = useNavigate();

  console.log(auth);

  const { data, isLoading, error, isError, isLoadingError } = useApiGet(
    ["users"],
    get,
    {
      enabled: true,
      refetchOnWindowFocus: true,
      retry: 2,
    }
  );

  const { control } = useForm();
  // Redirect to login page if user is not authenticated
  useEffect(() => {
    if (!auth?.token) {
      navigate("/login"); // Redirect to login page// Return null to prevent further rendering
    }
  }, [auth, navigate]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError || isLoadingError) {
    return <div>Error: {error?.message}</div>;
  }

  if (data) console.log("USERS", data);

  return (
    <>
      <>
        <Container maxWidth="xl" sx={styles.mainContainer} disableGutters>
          <Typography color={red[500]}>OLD ADD QUESTION PAGE</Typography>
          <br />
          <form>
            <FormContentsSection control={control} />
            <br />
            <FormActionsSection
            // handleClear={handleClear}
            // handleSubmit={handleSubmit}
            />
          </form>
          {/* <DevTool control={control} /> */}
        </Container>
      </>
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
