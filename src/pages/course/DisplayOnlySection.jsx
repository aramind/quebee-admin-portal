import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import Value from "../manage-question-page/Value";
import Label from "../manage-question-page/Label";
import { formatCreatorName as getName } from "../../utils/formatCreatorName";
import { formatDate } from "../../utils/formatDate";
import { useFormContext } from "react-hook-form";

// createdby: created on:  version:

const StackItem = ({
  label,
  values,
  direction = "row",
  inChip,
  valueOptions,
  labelOptions,
}) => (
  <Stack direction={direction} spacing={1} sx={{ flexWrap: "wrap" }}>
    <Label label={label} labelOptions={labelOptions} />
    <Value values={values} inChip={inChip} valueOptions={valueOptions} />
  </Stack>
);

const DisplayOnlySection = () => {
  const [values, setValues] = useState();
  const { control } = useFormContext();

  useEffect(() => {
    setValues(control?._options?.defaultValues);
  }, [control?._options?.defaultValues]);

  return (
    <Stack spacing={1.5}>
      <StackItem
        label="created by"
        // values={values?.title ? getName(values?.creator) : ""}
        values={getName(values?.creator) || ""}
        labelOptions={{ fontSize: "0.9rem" }}
        valueOptions={{ fontSize: "0.9rem" }}
      />
      <StackItem
        label="date created"
        values={formatDate(values?.createdAt, "digit") || ""}
        labelOptions={{ fontSize: "0.9rem" }}
        valueOptions={{ fontSize: "0.9rem" }}
      />
      <StackItem
        label="version"
        values={values?.version?.[1] || ""}
        labelOptions={{ fontSize: "0.9rem" }}
        valueOptions={{ fontSize: "0.9rem" }}
      />
    </Stack>
  );
};

export default DisplayOnlySection;
