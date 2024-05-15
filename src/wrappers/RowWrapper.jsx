import { Stack } from "@mui/material";
import React from "react";

const RowWrapper = ({ children }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      flexWrap="wrap"
      justifyContent="space-between"
    >
      {children}
    </Stack>
  );
};

export default RowWrapper;
