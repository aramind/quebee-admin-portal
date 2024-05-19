import React from "react";
import ControlledSimpleSelect from "../form-controlled/ControlledSimpleSelect";
import constants from "../../configs/constants";

const SelectDb = ({ control }) => {
  return (
    <ControlledSimpleSelect
      label="database"
      name="database"
      // control={control}
      options={constants?.DATABASES || []}
    />
  );
};

export default SelectDb;
