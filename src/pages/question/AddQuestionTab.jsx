import { Container, Stack } from "@mui/material";
import React from "react";
import useStyles from "../../hooks/useStyles";
import { useForm } from "react-hook-form";
import ControlledTextField from "../../components/form-controlled/ControlledTextField";

import { DevTool } from "@hookform/devtools";

import QuestionSection from "../add-question-page/QuestionSection";

import TopicSelector from "./TopicSelector";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import FormWrapper from "../../wrappers/FormWrapper";
import useFormSubmit from "../../hooks/useFormSubmit";

const AddQuestionTab = () => {
  const styles = useStyles();

  const { control, handleSubmit, setValue } = useForm({
    mode: "onTouched",
    defaultValues: {
      topics: [],
    },
  });

  const formMethods = { control, handleSubmit, setValue };

  const handleFormDataSubmit = async (rawData) => {
    console.log("Submitting...");
  };

  const handleFormSubmit = useFormSubmit(handleFormDataSubmit);

  return (
    <FormWrapper formMethods={formMethods}>
      <Container
        component="main"
        maxWidth="xl"
        sx={styles.tabContainer}
        disableGutters
      >
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <Stack direction={{ md: "row" }} spacing={1.5}>
            <Stack spacing={1.5} flex={1}>
              <Stack direction="row" spacing={1}>
                <ControlledTextField name="code" label="code" />
              </Stack>
              <ElevatedSectionWrapper>
                <TopicSelector />
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
    </FormWrapper>
  );
};

export default AddQuestionTab;
