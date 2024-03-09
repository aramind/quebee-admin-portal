import { Box, Container, Divider, Stack } from "@mui/material";
import React from "react";
import useStyles from "../hooks/useStyles";
import ElevatedSectionWrapper from "../wrappers/ElevatedSectionWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import LabelledSelect from "../components/form/LabelledSelect";
import SimpleSelect from "../components/SimpleSelect";
import constants from "../components/configs/constants";
import ControlledSimpleSelect from "../components/form/ControlledSimpleSelect";
import FormActionsContainer from "../containers/FormActionsContainer";
import FormActionButton from "../components/form/FormActionButton";
import questionSchema from "../schemas/question";
import ControlledChipMultiSelect from "../components/form/ControlledChipMultiSelect";
import ControlledChipMultiAutoComp from "../components/form/ControlledChipMultiAutoComp";
import {
  cyan,
  green,
  lightBlue,
  lightGreen,
  orange,
  purple,
} from "@mui/material/colors";

const AddQuestionPage = () => {
  const styles = useStyles();

  // form related
  const { register, handleSubmit, formState, reset, control } = useForm({
    resolver: zodResolver(questionSchema),
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    console.log(data);
    console.log("Submitting question...", data);
  };

  const onError = (err) => {
    console.log("Error submitting question", err);
  };

  // handlers todo
  const handleClear = () => {
    console.log("handling clear");
  };
  const handleUpload = () => {
    console.log("handling clear");
  };

  return (
    <Container maxWidth="xl" sx={styles.mainContainer} disableGutters="true">
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Stack spacing={1.5}>
          <Stack spacing={1.5}>
            <ElevatedSectionWrapper>
              <Box width={{ xs: 1, md: "33%" }} minWidth="300px">
                <ControlledSimpleSelect
                  name="database"
                  id="add-question-database"
                  control={control}
                  label="database"
                  options={constants.DATABASES}
                />
              </Box>
            </ElevatedSectionWrapper>
          </Stack>
          <Stack direction={{ xs: "column", md: "row" }}>
            <Box flex={{ xs: 1, md: "50%" }}>
              <ElevatedSectionWrapper>
                <Stack spacing={1.5}>
                  {/* <ControlledChipMultiSelect
                    name="courses"
                    control={control}
                    id="controlled-multi-select"
                    label="course(s)"
                    options={constants.COURSES}
                  /> */}
                  <ControlledChipMultiAutoComp
                    name="courses"
                    control={control}
                    id="controlled-multi-auto-comp"
                    label="course(s)"
                    options={constants.COURSES}
                    chipColor={lightGreen[100]}
                    textTransform="uppercase"
                  />

                  {/* <ControlledChipMultiSelect
                    name="subjects"
                    control={control}
                    id="controlled-multi-select"
                    label="subject(s)"
                    options={constants.SUBJECTS}
                  /> */}
                  <ControlledChipMultiAutoComp
                    name="subjects"
                    control={control}
                    id="controlled-multi-auto-comp"
                    label="subject(s)"
                    options={constants.SUBJECTS}
                    chipColor={orange[100]}
                    textTransform="uppercase"
                  />
                  {/* <ControlledChipMultiSelect
                    name="topics"
                    control={control}
                    id="controlled-multi-select"
                    label="select topic(s)"
                    options={constants.TOPICS}
                  /> */}
                  <ControlledChipMultiAutoComp
                    name="topics"
                    control={control}
                    id="controlled-multi-auto-comp"
                    label="topic(s)"
                    options={constants.TOPICS}
                    chipColor={lightBlue[100]}
                    textTransform="capitalize"
                  />
                </Stack>
              </ElevatedSectionWrapper>
            </Box>
            <Box flex={{ xs: 1, md: "50%" }}>
              {/* <ElevatedSectionWrapper>Hey</ElevatedSectionWrapper> */}
            </Box>
          </Stack>

          <ElevatedSectionWrapper>
            <ControlledChipMultiAutoComp
              name="tags"
              control={control}
              id="controlled-multi-select"
              label="select tag(s)"
              options={constants.TAGS}
            />
          </ElevatedSectionWrapper>
        </Stack>
        <br />
        <FormActionsContainer>
          <FormActionButton
            label="clear"
            onClickHandler={handleClear}
            variant="outlined"
          />
          <FormActionButton
            label="upload"
            onClickHandler={handleUpload}
            variant="outlined"
          />
          <FormActionButton type="submit" label="save" variant="contained" />
        </FormActionsContainer>
      </form>
    </Container>
  );
};

export default AddQuestionPage;
