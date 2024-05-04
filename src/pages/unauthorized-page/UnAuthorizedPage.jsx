import React from "react";
import { Stack, Typography } from "@mui/material";

const UnAuthorizedPage = ({ location }) => {
  return (
    <Stack
      display="flex"
      alignItems="center"
      height="80vh"
      justifyContent="center"
      spacing={2}
    >
      <Typography>Access Denied</Typography>
    </Stack>
  );
};

export default UnAuthorizedPage;
