import React, { useState } from "react";
import useStyles from "../../hooks/useStyles";

import { useForm } from "react-hook-form";
import { Button, Container, Stack, Typography } from "@mui/material";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import ControlledTextField from "../../components/form-controlled/ControlledTextField";

import { DevTool } from "@hookform/devtools";
import FormActionsContainer from "../../containers/FormActionsContainer";
import FormActionButton from "../../components/form/FormActionButton";
import MetaInfoSection from "./MetaInfoSection";
import SubjectSection from "./SubjectSection";
import AddSubjectDialog from "./AddSubjectDialog";

const AddCoursePage = () => {
  const [openAddSubject, setOpenAddSubject] = useState(false);

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
        <Stack flex={2} width="100%" direction="row" justifyContent="flex-end">
          <Typography>Not on the list?</Typography>
          <Stack width="150px">
            <Button
              variant="outlined"
              size="small"
              onClick={() => setOpenAddSubject(true)}
            >
              Add a subject
            </Button>
            <Button variant="outlined" size="small">
              Add a topic
            </Button>
          </Stack>
        </Stack>

        <br />

        <SubjectSection control={control} />

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
        <AddSubjectDialog
          open={openAddSubject}
          setOpen={setOpenAddSubject}
          title="Add New Subject"
        />
      </form>
    </Container>
  );
};

export default AddCoursePage;
