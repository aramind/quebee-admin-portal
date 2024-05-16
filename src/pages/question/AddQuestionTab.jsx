import { Container, Stack } from "@mui/material";
import React from "react";
import useStyles from "../../hooks/useStyles";
import { useForm } from "react-hook-form";

const AddQuestionTab = () => {
  const styles = useStyles();

  const { control, handleSubmit } = useForm({
    mode: "onTouched",
  });

  const onSubmit = (rawData) => {
    console.log(rawData);
    alert("SUBMIT");
  };

  const onError = (err) => {
    console.log("error submitting form", err);
  };
  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={styles.tabContainer}
      disableGutters
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Stack direction={{ md: "row" }}>
          <Stack>
            <Stack></Stack>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
};

export default AddQuestionTab;
