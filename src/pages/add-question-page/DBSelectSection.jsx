import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import ControlledSimpleSelect from "../../components/form/ControlledSimpleSelect";
import { Box } from "@mui/material";
import constants from "../../components/configs/constants";

const DBSelectSection = ({ control }) => {
  return (
    <ElevatedSectionWrapper>
      <Box width={{ xs: 1 }} minWidth="100px">
        <ControlledSimpleSelect
          name="database"
          id="add-question-database"
          control={control}
          label="database"
          options={constants.DATABASES}
        />
      </Box>
    </ElevatedSectionWrapper>
  );
};

export default DBSelectSection;
