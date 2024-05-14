import React, { useContext, useState } from "react";
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
import { red } from "@mui/material/colors";
import useSubjReq from "../../hooks/api/useSubReq";
import useErrorHandlerUnAuthReq from "../../hooks/api/useErrorHandlerUnAuthReq";
import useApiGet from "../../hooks/api/useApiGet";
import LoadingPage from "../LoadingPage";
import useCourseReq from "../../hooks/api/useCourseReq";
import { AuthContext } from "../../context/AuthProvider";

const AddCoursePage = () => {
  const { auth } = useContext(AuthContext);
  const [openAddSubject, setOpenAddSubject] = useState(false);

  const styles = useStyles();

  const { fetchSubjects } = useSubjReq();
  const { addCourse } = useCourseReq();
  const handleUnAuthError = useErrorHandlerUnAuthReq();
  const {
    data: subjectsList,
    isLoading,
    error,
  } = useApiGet("subjects", () => fetchSubjects({ params: "" }), {
    refetchOnWindowFocus: true,
    retry: 3,
  });

  console.log(auth);
  const { control, handleSubmit } = useForm({
    // resolver: zodResolver(courseSchema),
    mode: "onTouched",
  });

  const onSubmit = (data) => {
    const finalData = { ...data, subjects: data?.subjects.map((s) => s.title) };
    // console.log("COURSE", finalData);
    addCourse({ data: finalData });
    alert("SUBMITTED");
  };

  const onError = (err) => {
    console.log("Error in form", err);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    handleUnAuthError(error);
  }

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

        <SubjectSection control={control} subjectsList={subjectsList} />
        <Stack
          // className="outlined"
          my={1}
          width="100%"
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          // spacing={1.5}
        >
          <Typography variant="body" color={red["A100"]} mx={1}>
            Subject not in the list?
          </Typography>

          <Button
            variant="text"
            size="small"
            onClick={() => setOpenAddSubject(true)}
            sx={{ textDecoration: "underline" }}
          >
            Create a subject
          </Button>
        </Stack>
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
