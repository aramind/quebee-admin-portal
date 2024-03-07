import { Stack } from "@mui/material";
import React from "react";

const DialogActionsContainer = ({ children }) => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      gap={1}
      sx={{ justifyContent: { sm: "flex-end", xs: "center" }, py: 0 }}
    >
      {children}
    </Stack>
  );
};

export default DialogActionsContainer;
