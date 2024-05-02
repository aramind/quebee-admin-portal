import { Stack } from "@mui/material";
import React from "react";
import Value from "../pages/manage-question-page/Value";
import Label from "../pages/manage-question-page/Label";

const SimpleLabelValue = ({ label, values, direction = "row", inChip }) => {
  return (
    <Stack direction={direction} spacing={1}>
      <Label label={label} />
      <Value values={values} inChip={inChip} />
    </Stack>
  );
};

export default SimpleLabelValue;
