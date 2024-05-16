import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import AvailabilityControlSection from "./AvailabilityControlSection";
import DisplayOnlySection from "./DisplayOnlySection";
import { Stack } from "@mui/material";

const ACSandDOS = ({ control, values }) => {
  return (
    <Stack justifyContent="flex-start" spacing={1.5}>
      <ElevatedSectionWrapper>
        <AvailabilityControlSection control={control} />
      </ElevatedSectionWrapper>
      <ElevatedSectionWrapper>
        <DisplayOnlySection values={values} />
      </ElevatedSectionWrapper>
    </Stack>
  );
};

export default ACSandDOS;
