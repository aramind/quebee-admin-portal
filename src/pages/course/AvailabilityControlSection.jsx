import { Stack } from "@mui/material";
import React from "react";
import constants from "../../components/configs/constants";
import ControlledRadioGroup from "../../components/form-controlled/ControlledRadioGroup";

const AvailabilityControlSection = ({ control }) => {
  return (
    <Stack spacing={1.5}>
      <ControlledRadioGroup
        control={control}
        name="status"
        label="status"
        options={constants?.AVAILABILITY_CONTROLS_STATUSES}
      />
      <ControlledRadioGroup
        control={control}
        name="isHidden"
        label="hide"
        options={["yes", "no"]}
      />
    </Stack>
  );
};

export default AvailabilityControlSection;
