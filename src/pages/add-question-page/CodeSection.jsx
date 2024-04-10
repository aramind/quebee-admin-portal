import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import { Controller } from "react-hook-form";
import FormInputLabel from "../../components/form/FormInputLabel";

const CodeSection = ({ control }) => {
  return (
    <ElevatedSectionWrapper fullW={true} fullH={true}>
      <FormInputLabel label="access" />
      <Controller
        name="access"
        control={control}
        defaultValue={constants?.ACCESS[0] || ""}
        render={({ field }) => (
          <RadGroup field={field} options={constants?.ACCESS} row={false} />
        )}
      />
    </ElevatedSectionWrapper>
  );
};

export default CodeSection;
