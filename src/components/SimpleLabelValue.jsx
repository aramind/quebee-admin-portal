import { Stack } from "@mui/material";
import React from "react";
import Value from "./form/Value";
import Label from "./form/Label";

const SimpleLabelValue = ({
  label,
  values,
  direction = "row",
  inChip,
  labelOptions,
}) => {
  return (
    <Stack direction={direction} spacing={1} alignItems="center">
      <Stack flex={1}>
        <Label
          label={label}
          labelOptions={{ color: "primary.dark", fontSize: "0.9rem" }}
        />
      </Stack>
      <Stack flex={3}>
        <Value values={values} inChip={inChip} />
      </Stack>
    </Stack>
  );
};

export default SimpleLabelValue;
