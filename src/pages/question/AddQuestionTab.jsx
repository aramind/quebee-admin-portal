import { Container, Stack } from "@mui/material";
import React from "react";
import useStyles from "../../hooks/useStyles";
import { useForm } from "react-hook-form";
import ControlledTextField from "../../components/form-controlled/ControlledTextField";

import { DevTool } from "@hookform/devtools";

import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import FormWrapper from "../../wrappers/FormWrapper";
import useFormSubmit from "../../hooks/useFormSubmit";
import ContMultiSelectToTable from "../../components/form-controlled/ContMultiSelectToTable";
import useApiGet from "../../hooks/api/useApiGet";
import useTopicReq from "../../hooks/api/useTopicReq";
import DifficultySection from "./DifficultySection";
import constants from "../../configs/constants";
import ContRadGroup from "../../components/form-controlled/ContRadGroup";
import ControlledChipMultiAutoComp from "../../components/form-controlled/ControlledChipMultiAutoComp";
import QSection from "./QSection";
import ChoicesSection from "./ChoicesSection";
import FormActionsSection from "../add-question-page/FormActionsSection";

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

  const { control, handleSubmit, setValue, reset } = useForm({
    mode: "onTouched",
    defaultValues: {
      code: "",
      topics: [],
      access: 2,
      type: "ob",
      isHidden: false,
    },
  });

  const formMethods = { control, handleSubmit, setValue };

  const handleFormDataSubmit = async (rawData) => {
    console.log("Submitting...");
    // console.log(rawData);
    const questionData = {
      code: rawData?.code,
      access: +rawData?.access,
      difficulty: +rawData?.difficulty,
      topics: rawData?.topics?.map((topic) => topic?._id),
      type: rawData?.type,
      question: { text: rawData?.question, image: "" },
      choices: [
        {
          value: { text: rawData?.A, image: "" },
          isCorrect: rawData?.correctAnswer === "A",
        },
        {
          value: { text: rawData?.B, image: "" },
          isCorrect: rawData?.correctAnswer === "B",
        },
        {
          value: { text: rawData?.C, image: "" },
          isCorrect: rawData?.correctAnswer === "C",
        },
        {
          value: { text: rawData?.D, image: "" },
          isCorrect: rawData?.correctAnswer === "D",
        },
      ],

      information: {
        text: rawData?.information,
        image: "",
      },

      isHidden:
        typeof rawData.isHidden !== "string"
          ? rawData.isHidden
          : rawData?.isHidden === "true"
          ? true
          : false,
      tags: rawData?.tags,
      remarks: rawData?.remarks,
      status: "pending",
    };

    // console.log("QD", questionData);
  };

  const handleFormSubmit = useFormSubmit(handleFormDataSubmit);

  const handleClear = () => {
    reset();
  };
  return (
    <FormWrapper formMethods={formMethods}>
      <Container
        component="main"
        maxWidth="xl"
        sx={styles.tabContainer}
        disableGutters
      >
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <Stack spacing={1.5} direction="row" alignItems="flex-start">
            <Stack flex={1} spacing={1.5}>
              <ElevatedSectionWrapper flex={1}>
                <ControlledTextField name="code" label="code" />
              </ElevatedSectionWrapper>
              <ElevatedSectionWrapper>
                <ContMultiSelectToTable
                  objOptionsWithTitles={topicsList || []}
                  nameForController="topics"
                  label="Topic(s)"
                />
              </ElevatedSectionWrapper>
              <Stack direction="row" spacing={1.5}>
                <ElevatedSectionWrapper flex={1}>
                  <ContRadGroup
                    label="access"
                    name="access"
                    options={constants?.ACCESS}
                  />
                </ElevatedSectionWrapper>
                <ElevatedSectionWrapper flex={1}>
                  <ContRadGroup
                    name="type"
                    label="type"
                    options={constants?.QUESTION_TYPE}
                  />
                </ElevatedSectionWrapper>
              </Stack>

              <Stack flex={2}>
                <DifficultySection />
              </Stack>
            </Stack>
            <Stack flex={3} spacing={1.5}>
              <ElevatedSectionWrapper>
                <QSection />
                <ChoicesSection />
              </ElevatedSectionWrapper>
              <ElevatedSectionWrapper>
                <ControlledTextField
                  label="information"
                  name="information"
                  tfProps={{ multiline: true, minRows: 4 }}
                />
              </ElevatedSectionWrapper>
              <ElevatedSectionWrapper>
                <ControlledChipMultiAutoComp
                  name="tags"
                  label="select tag(s)"
                  options={constants.TAGS}
                  free
                />
              </ElevatedSectionWrapper>
            </Stack>
          </Stack>
          <FormActionsSection
            handleClear={handleClear}
            handleSubmit={handleSubmit}
          />
          <DevTool control={control} />
        </form>
      </Container>
    </FormWrapper>
  );
};

export default AddQuestionTab;
