import { Stack } from "@mui/material";
import React from "react";

const FormActionsContainer = ({ children }) => {
  return (
    <Stack direction="row" gap={2} sx={{ justifyContent: "flex-end", py: 0 }}>
      {children}
    </Stack>
  );
};

export default FormActionsContainer;
