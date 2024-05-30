import { Stack } from "@mui/material";
import React from "react";
import FormInputLabel from "./FormInputLabel";
const LabelledSelect = ({ label, select, hasError }) => {
  return (
    <Stack spacing={0.3}>
      <FormInputLabel label={label} hasError={hasError} />
      {select}
    </Stack>
  );
};

export default LabelledSelect;
