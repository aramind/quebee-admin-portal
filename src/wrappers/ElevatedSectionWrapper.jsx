import { Paper, useTheme } from "@mui/material";
import React from "react";

const ElevatedSectionWrapper = ({ children }) => {
  return (
    <Paper elevation={1} sx={{ padding: 2 }}>
      {children}
    </Paper>
  );
};

export default ElevatedSectionWrapper;
