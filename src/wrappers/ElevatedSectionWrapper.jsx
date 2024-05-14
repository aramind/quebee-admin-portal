import { Paper } from "@mui/material";
import { yellow } from "@mui/material/colors";
import React from "react";

const ElevatedSectionWrapper = ({
  children,
  fullW,
  fullH,
  centered,
  width,
  height,
  bgcolor,
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        padding: 2,
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
