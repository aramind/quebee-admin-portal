import React from "react";
import { Button, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DangerousTwoToneIcon from "@mui/icons-material/DangerousTwoTone";

const UnAuthorizedPage = ({ location }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Stack
      display="flex"
      alignItems="center"
      height="80vh"
      justifyContent="center"
      spacing={0.5}
    >
      <DangerousTwoToneIcon
        sx={{ fontSize: "10rem", color: theme.palette.error.main }}
      />
      <Typography sx={{ fontWeight: "bold", fontSize: "3rem" }}>
        Access Denied
      </Typography>
      <Typography>You do not have access to this page</Typography>
      <br />
      <Button variant="outlined" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </Stack>
  );
};

export default UnAuthorizedPage;
