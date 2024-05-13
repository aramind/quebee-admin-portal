import React, { Fragment } from "react";
import useStyles from "../../hooks/useStyles";
import { zodResolver } from "@hookform/resolvers/zod";
import courseSchema from "../../schemas/course";
import { useFieldArray, useForm } from "react-hook-form";
import { Box, Button, Container, Stack } from "@mui/material";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import ControlledTextField from "../../components/form-controlled/ControlledTextField";
import ControlledSimpleSelect from "../../components/form-controlled/ControlledSimpleSelect";
import constants from "../../components/configs/constants";
import { DevTool } from "@hookform/devtools";
import FormActionsContainer from "../../containers/FormActionsContainer";
import FormActionButton from "../../components/form/FormActionButton";
import MetaInfoSection from "./MetaInfoSection";
import SubjectSection from "./SubjectSection";

const dummySubjects = [
  { code: "A001", name: "Engineering" },
  { code: "A002", name: "Science and Tech" },
  { code: "A003", name: "Humanities" },
];

const AddCoursePage = () => {
  const styles = useStyles();

  const { control, handleSubmit } = useForm({
    // resolver: zodResolver(courseSchema),
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    alert("CLICKED");
    console.log("COURSE", data);
  };

  const onError = (err) => {
    console.log("Error in form", err);
  };
  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={styles.mainContainer}
      disableGutters
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <MetaInfoSection control={control} />
        <br />
        <SubjectSection control={control} />
        {/* <ElevatedSectionWrapper>
          {subjects.map((subject, subjectIndex) => (
            <Fragment key={subject.id}>
              <Stack direction="row">
                <Box flex="1">
                  <ControlledSimpleSelect
                    label="Subject Code"
                    name={`subjects[${subjectIndex}].code`}
                    control={control}
                    options={dummySubjects?.map((s) => s.code)}
                  />
                </Box>
                <Box flex={4}>
                  <ControlledSimpleSelect
                    label="Subject title"
                    name={`subjects[${subjectIndex}].title`}
                    control={control}
                    options={dummySubjects?.map((s) => s.name)}
                  />
                </Box>
                <Button onClick={() => removeSubject(subjectIndex)}>
                  Remove Subject
                </Button>
              </Stack>

              <Box ml="4rem">
                {topics.map((topic, topicIndex) => {
                  if (topic.index === subjectIndex) {
                    return (
                      <Stack direction="row" key={topic.id}>
                        <ControlledTextField
                          control={control}
                          name={`subjects[${subjectIndex}].topics[${topicIndex}].name`}
                          label={`Topic ${topicIndex + 1}`}
                        />
                        <Button onClick={() => removeTopic(topicIndex)}>
                          Remove Topic
                        </Button>
                      </Stack>
                    );
                  }
                  return null;
                })}
                <Button onClick={() => appendTopic({ index: subjectIndex })}>
                  Add Topic
                </Button>
              </Box>
            </Fragment>
          ))}
          <Button onClick={() => appendSubject()}>Add Subject</Button>
        </ElevatedSectionWrapper> */}
        <br />
        <ElevatedSectionWrapper>
          <ControlledTextField
            name="remarks"
            label="remarks"
            control={control}
          />
        </ElevatedSectionWrapper>
        <br />
        <FormActionsContainer justify={{ sm: "flex-end", xs: "center" }}>
          <FormActionButton
            label="clear"
            // onClickHandler={handleClear}
            variant="outlined"
          />
          <FormActionButton
            label="upload"
            // onClickHandler={handleUpload}
            variant="outlined"
          />
          <FormActionButton type="submit" label="save" variant="contained" />
        </FormActionsContainer>
        <DevTool control={control} />
      </form>
    </Container>
  );
};

export default AddCoursePage;
