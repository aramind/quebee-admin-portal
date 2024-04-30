import React, { useState } from "react";
import FormInputLabel from "../../components/form/FormInputLabel";
import { Controller } from "react-hook-form";
import RadGroup from "../../components/RadGroup";

const Choices2 = ({ control }) => {
  const [choices, setChoices] = useState(["", "", "", ""]);
  return (
    <>
      <FormInputLabel label="choices" />
      <Controller
        name="choices"
        control={control}
        defaultValue={choices?.[0]}
        render={({ field }) => <RadGroup field={field} options={choices} />}
      />
    </>
  );
};

export default Choices2;
