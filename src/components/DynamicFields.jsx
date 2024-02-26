import { Button, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

const DynamicFields = ({ title }) => {
  // form
  const { register, control, handleSubmit, formState } = useForm({
    mode: "onBlur",
  });

  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contents",
  });

  const onSubmit = (data) => {
    const contentsArray = data.contents.map((content) => content.content);
    console.log(contentsArray);
    return contentsArray;
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={1}>
        <Typography variant="body" className="uppercase ">
          {title}
        </Typography>
        {fields.map((field, index) => {
          return (
            <Stack spacing={1} key={field.id}>
              <Stack spacing={1} direction="row">
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  {...register(`contents[${index}].content`)}
                />
                <Button
                  sx={{ flex: "20%" }}
                  variant="contained"
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </Stack>
            </Stack>
          );
        })}
        <Button variant="text" onClick={() => append()}>
          Add
        </Button>
        <Button type="submit">SAVE</Button>
      </Stack>
    </form>
  );
};

export default DynamicFields;
