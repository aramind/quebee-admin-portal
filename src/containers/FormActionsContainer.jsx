import { Stack } from "@mui/material";
import React from "react";

const FormActionsContainer = ({
  children,
  justify,
  sticky,
  width,
  flex = "100%",
}) => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      gap={2}
      width={width ? width : "100%"}
      flex={flex}
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
