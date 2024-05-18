import { Container, Stack } from "@mui/material";
import React from "react";
import useStyles from "../../hooks/useStyles";
import { useForm } from "react-hook-form";
import ControlledTextField from "../../components/form-controlled/ControlledTextField";

import { DevTool } from "@hookform/devtools";

import QuestionSection from "../add-question-page/QuestionSection";

import TopicSelector from "./TopicSelector";
import TopicSelectorV2 from "./TopicSelectorV2";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";

const AddQuestionTab = () => {
  const styles = useStyles();

  const { control, handleSubmit, setValue } = useForm({
    mode: "onTouched",
    defaultValues: {
      topics: [],
    },
  });

  const formMethods = { control, handleSubmit, setValue };

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
          <Stack spacing={1.5} flex={1}>
            <Stack direction="row" spacing={1}>
              {/* <SelectDb control={control} /> */}
              <ControlledTextField name="code" label="code" control={control} />
            </Stack>
            <ElevatedSectionWrapper>
              <TopicSelector control={control} setValue={setValue} />
            </ElevatedSectionWrapper>
            {/* <TopicSelectorV2 control={control} /> */}

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
