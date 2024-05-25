import { Label } from "@mui/icons-material";
import { Stack } from "@mui/material";
import React from "react";
import Value from "./form/Value";

const SimpleLabelValue = ({ label, values, direction = "row", inChip }) => {
  return (
    <Stack direction={direction} spacing={1}>
      <Label label={label} />
      <Value values={values} inChip={inChip} />
    </Stack>
  );
};

export default SimpleLabelValue;
