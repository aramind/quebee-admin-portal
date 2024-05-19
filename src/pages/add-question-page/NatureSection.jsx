import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import ControlledRadioGroup from "../../components/form-controlled/ControlledRadioGroup";
import constants from "../../configs/constants";

const NatureSection = ({ control }) => {
  return (
    <ElevatedSectionWrapper fullW={true} fullH={true}>
      <ControlledRadioGroup
        label="nature"
        name="nature"
        // control={control}
        options={constants?.NATURE}
      />
    </ElevatedSectionWrapper>
  );
};

export default NatureSection;
