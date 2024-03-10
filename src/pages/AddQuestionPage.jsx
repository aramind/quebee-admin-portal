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
import DifficultySlider from "../components/form/DifficultySlider";
import FormInputLabel from "../components/form/FormInputLabel";
import RadGroup from "../components/RadGroup";
import TagSection from "./add-question-page/TagSection";
import RadioGroupsSection from "./add-question-page/RadioGroupsSection";
import DifficultySection from "./add-question-page/DifficultySection";
import CYTSection from "./add-question-page/CYTSection";
import DBSelectSection from "./add-question-page/DBSelectSection";
import STSection from "./add-question-page/STSection";
import CourseSection from "./add-question-page/CourseSection";
import AccessSection from "./add-question-page/AccessSection";

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
        <Stack spacing={1.5} id="all-items">
          <Stack
            spacing={1.5}
            direction={{ xs: "column", md: "row" }}
            id="all-forms"
          >
            <Stack spacing={1.5} flex={"20%"}>
              <DBSelectSection control={control} />
              <AccessSection control={control} />
            </Stack>
            <Stack spacing={1.5} flex={"45%"}>
              {/* <CourseSection control={control} />
              <STSection control={control} /> */}
              <CYTSection control={control} />
            </Stack>

            <Stack spacing={1.5} flex={"35%"}>
              <RadioGroupsSection control={control} />
              <DifficultySection control={control} />
            </Stack>
          </Stack>
        </Stack>
        <br />
        <TagSection control={control} />
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
