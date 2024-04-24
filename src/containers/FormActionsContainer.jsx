import { Stack } from "@mui/material";
import React from "react";

const FormActionsContainer = ({ children, justify }) => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      gap={2}
      sx={{ justifyContent: justify, py: 0 }}
    >
      {children}
    </Stack>
  );
};

export default FormActionsContainer;
