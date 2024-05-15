import { Paper, Stack } from "@mui/material";
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
  flex,
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        flex: flex ? flex : 1,
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
