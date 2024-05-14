import { Paper } from "@mui/material";
import React from "react";

const ElevatedSectionWrapper = ({
  children,
  fullW,
  fullH,
  centered,
  width,
  height,
  bgcolor,
  px = "16px",
  py = "16px",
  flex = "1",
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        flex: flex,
        px: px,
        py: py,
        width: fullW ? "100%" : width,
        height: fullH ? "100%" : height,
        alignItems: centered ? "center" : "left",
        backgroundColor: bgcolor,
      }}
    >
      {children}
    </Paper>
  );
};

export default ElevatedSectionWrapper;
