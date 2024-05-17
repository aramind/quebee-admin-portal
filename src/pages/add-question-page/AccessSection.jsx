import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";

import ControlledRadioGroup from "../../components/form-controlled/ControlledRadioGroup";
import constants from "../../configs/constants";

const AccessSection = ({ control }) => {
  return (
    <ElevatedSectionWrapper fullW={true} fullH={true}>
      <ControlledRadioGroup
        label="access"
        name="access"
        control={control}
        options={constants?.ACCESS}
        row
      />
      {/* <FormInputLabel label="access" />
      <Controller
        name="access"
        control={control}
        defaultValue={constants?.ACCESS[0] || ""}
        render={({ field }) => (
          <RadGroup field={field} options={constants?.ACCESS} row={false} />
        )}
      /> */}
    </ElevatedSectionWrapper>
  );
};

export default AccessSection;
