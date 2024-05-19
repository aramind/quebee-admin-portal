import { Container, Stack } from "@mui/material";
import React from "react";
import useStyles from "../../hooks/useStyles";
import { useForm } from "react-hook-form";
import ControlledTextField from "../../components/form-controlled/ControlledTextField";

import { DevTool } from "@hookform/devtools";

import QuestionSection from "../add-question-page/QuestionSection";

import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import FormWrapper from "../../wrappers/FormWrapper";
import useFormSubmit from "../../hooks/useFormSubmit";
import ContMultiSelectToTable from "../../components/form-controlled/ContMultiSelectToTable";
import useApiGet from "../../hooks/api/useApiGet";
import useTopicReq from "../../hooks/api/useTopicReq";
import DifficultySection from "./DifficultySection";
import ControlledRadioGroup from "../../components/form-controlled/ControlledRadioGroup";
import constants from "../../configs/constants";

const AddQuestionTab = () => {
  const styles = useStyles();
  const { fetchTopics } = useTopicReq();

  const { data: topicsList } = useApiGet(
    ["topics"],
    () => fetchTopics({ params: "/trimmed" }),
    {
      refetchOnWindowFocus: false,
      retry: 3,
      staleTime: Infinity,
    }
  );

  console.log(topicsList);

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
            <Stack flex={2} spacing={1.5}>
              <ElevatedSectionWrapper>
                <ControlledTextField name="code" label="code" />
              </ElevatedSectionWrapper>

              <Stack direction="row" spacing={1.5}>
                <Stack flex={3}>
                  <DifficultySection />
                </Stack>
                <ElevatedSectionWrapper flex={1}>
                  <ControlledRadioGroup
                    label="access"
                    name="access"
                    options={constants?.ACCESS}
                  />
                </ElevatedSectionWrapper>
                <ElevatedSectionWrapper flex={1}>
                  <ControlledRadioGroup
                    label="type"
                    name="type"
                    options={constants?.TYPE}
                  />
                </ElevatedSectionWrapper>
              </Stack>
              <QuestionSection control={control} />
            </Stack>
            <Stack spacing={1.5} flex={1}>
              <ElevatedSectionWrapper>
                {/* <TopicSelector /> */}
                <ContMultiSelectToTable
                  objOptionsWithTitles={topicsList || []}
                  nameForController="topics"
                  label="Topic(s)"
                />
              </ElevatedSectionWrapper>

              <br />
            </Stack>
            <br />
          </Stack>
          <DevTool control={control} />
        </form>
      </Container>
    </FormWrapper>
  );
};

export default AddQuestionTab;
