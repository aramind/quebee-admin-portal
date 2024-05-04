import { Paper, useTheme } from "@mui/material";
import React from "react";

const ElevatedSectionWrapper = ({ children, fullW, fullH, centered }) => {
  return (
    <Paper
      elevation={1}
      sx={{
        padding: 2,
        width: fullW ? "100%" : "auto",
        height: fullH ? "100%" : "auto",
        alignItems: centered ? "center" : "left",
      }}
    >
      {children}
    </Paper>
  );
};

export default ElevatedSectionWrapper;

const localStyle = {
  fullW: {
    width: "100%",
  },
  fullH: {
    height: "100%",
  },
  fullWandH: {
    width: "100%",
    height: "100%",
  },
};
