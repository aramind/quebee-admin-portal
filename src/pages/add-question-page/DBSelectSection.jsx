import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import { Box } from "@mui/material";
import constants from "../../components/configs/constants";
import ControlledSimpleSelect from "../../components/form-controlled/ControlledSimpleSelect";

const DBSelectSection = ({ control }) => {
  return (
    <ElevatedSectionWrapper>
      <Box width={{ xs: 1 }} minWidth="100px">
        {/* <ControlledSimpleSelect
          name="database"
          id="add-question-database"
          control={control}
          label="database"
          defaultValue={constants.DATABASES[0]}
          options={constants.DATABASES}
          highlighted
        /> */}
        <ControlledSimpleSelect
          label="database"
          name="database"
          control={control}
          options={constants?.DATABASES}
        />
      </Box>
    </ElevatedSectionWrapper>
  );
};

export default DBSelectSection;
