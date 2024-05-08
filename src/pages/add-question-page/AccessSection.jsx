import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import constants from "../../components/configs/constants";

import ControlledRadioGroup from "../../components/form-controlled/ControlledRadioGroup";

const AccessSection = ({ control }) => {
  return (
    <ElevatedSectionWrapper fullW={true} fullH={true}>
      <ControlledRadioGroup
        label="access"
        name="access"
        control={control}
        options={constants?.ACCESS}
        row={true}
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
