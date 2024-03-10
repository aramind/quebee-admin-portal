import { Stack } from "@mui/material";
import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import FormInputLabel from "../../components/form/FormInputLabel";
import { Controller } from "react-hook-form";
import RadGroup from "../../components/RadGroup";
import constants from "../../components/configs/constants";

const RadioGroupsSection = ({ control }) => {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={1.5}
      sx={{ flex: 1 }}
    >
      <ElevatedSectionWrapper fullW={true} fullH={true}>
        <FormInputLabel label="type" />
        <Controller
          name="type"
          control={control}
          defaultValue={constants?.TYPE[0]?.key || ""}
          render={({ field }) => (
            <RadGroup field={field} options={constants.TYPE} />
          )}
        />
      </ElevatedSectionWrapper>
      <ElevatedSectionWrapper fullW={true} fullH={true}>
        <FormInputLabel label="nature" />
        <Controller
          name="nature"
          control={control}
          defaultValue={constants?.NATURE[0]?.key || ""}
          render={({ field }) => (
            <RadGroup field={field} options={constants.NATURE} />
          )}
        />
      </ElevatedSectionWrapper>
    </Stack>
  );
};

export default RadioGroupsSection;
