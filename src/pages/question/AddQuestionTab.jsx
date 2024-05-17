import { Container, Stack } from "@mui/material";
import React from "react";
import useStyles from "../../hooks/useStyles";
import { useForm } from "react-hook-form";
import SelectDb from "../../components/form-finished/SelectDb";
import ControlledTextField from "../../components/form-controlled/ControlledTextField";

import { DevTool } from "@hookform/devtools";

import QuestionSection from "../add-question-page/QuestionSection";

import TopicSelector from "./TopicSelector";

const AddQuestionTab = () => {
  const styles = useStyles();

  const { control, handleSubmit } = useForm({
    mode: "onTouched",
    defaultValues: {
      topics: [],
    },
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
        <Stack direction={{ md: "row" }} spacing={1.5}>
          <Stack
            // className="outlined"
            spacing={1.5}
            flex={1}
          >
            <Stack direction="row" spacing={1}>
              <SelectDb control={control} />
              <ControlledTextField name="code" label="code" control={control} />
            </Stack>
            <TopicSelector control={control} />
            <br />
          </Stack>
          <br />
          <Stack className="outlined2" flex={2}>
            <QuestionSection control={control} />
          </Stack>
        </Stack>
        <DevTool control={control} />
      </form>
    </Container>
  );
};

export default AddQuestionTab;
