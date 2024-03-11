import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import FormInputLabel from "../../components/form/FormInputLabel";
import { Controller } from "react-hook-form";
import { Box } from "@mui/material";
import DifficultySlider from "../../components/form/DifficultySlider";

const DifficultySection = ({ control }) => {
  return (
    <ElevatedSectionWrapper>
      <FormInputLabel label="difficulty" />
      <Controller
        id="difficulty-slider"
        name="difficulty"
        control={control}
        defaultValue={3}
        render={({ field }) => (
          <Box sx={{ width: "100%", px: { xs: 2, md: 3 } }}>
            <DifficultySlider field={field} />
          </Box>
        )}
      />
    </ElevatedSectionWrapper>
  );
};

export default DifficultySection;
