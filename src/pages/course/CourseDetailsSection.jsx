import React, { useState } from "react";
import MetaInfoSection from "../add-course-page/MetaInfoSection";
import SubjectSection from "../add-course-page/SubjectSection";
import { Button, Stack, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import ControlledTextField from "../../components/form-controlled/ControlledTextField";
import AddSubjectDialog from "./AddSubjectDialog";
import useFetchData from "../../hooks/api/useFetchData";

const CourseDetailsSection = () => {
  const [openAddSubject, setOpenAddSubject] = useState(false);
  const { subjectsList } = useFetchData();
  return (
    <>
      <MetaInfoSection />
      <br />
      <SubjectSection subjectsList={subjectsList} />
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
        <ControlledTextField name="remarks" label="remarks" />
      </ElevatedSectionWrapper>
      <AddSubjectDialog
        open={openAddSubject}
        setOpen={setOpenAddSubject}
        title="Add New Subject"
      />
    </>
  );
};

export default CourseDetailsSection;
