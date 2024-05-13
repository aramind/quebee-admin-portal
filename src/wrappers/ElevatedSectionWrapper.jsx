import { Paper } from "@mui/material";
import React from "react";

const ElevatedSectionWrapper = ({
  children,
  fullW,
  fullH,
  centered,
  width,
  height,
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        padding: 2,
        width: fullW ? "100%" : width,
        height: fullH ? "100%" : height,
        alignItems: centered ? "center" : "left",
      }}
    >
      {children}
    </Paper>
  );
};

export default ElevatedSectionWrapper;
