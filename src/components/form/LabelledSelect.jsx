import { Box } from "@mui/material";
import React from "react";
import FormInputLabel from "./FormInputLabel";

const LabelledSelect = ({ label, select }) => {
  return (
    <Box>
      <FormInputLabel label={label} />
      {select}
    </Box>
  );
};

export default LabelledSelect;
