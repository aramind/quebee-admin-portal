import { Stack } from "@mui/material";
import React from "react";

const FormActionsContainer = ({ children, justify, sticky }) => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      gap={2}
      sx={{
        justifyContent: justify,
        py: 0,
        position: sticky ? "sticky" : "static",
        bottom: "1rem",
      }}
      // className="outlined"
    >
      {children}
    </Stack>
  );
};

export default FormActionsContainer;
