import { Autocomplete, Container, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import useStyles from "../../hooks/useStyles";
import { useForm } from "react-hook-form";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import { grey } from "@mui/material/colors";
import useSubjReq from "../../hooks/api/useSubReq";
import useApiGet from "../../hooks/api/useApiGet";
import AutocompleteSelector from "../../components/AutocompleteSelector";
import SubjectInfoSection from "./SubjectInfoSection";
import { DevTool } from "@hookform/devtools";
import FormActionsContainer from "../../containers/FormActionsContainer";
import FormActionButton from "../../components/form/FormActionButton";

const ManageSubjectsTab = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [initialValues, setInitialValues] = useState({});

  const styles = useStyles();
  const { fetchSubjects } = useSubjReq();

  const {
    data: subjectsList,
    // isLoading,
    // error,
  } = useApiGet("subjects", () => fetchSubjects({ params: "/trimmed" }), {
    refetchOnWindowFocus: true,
    retry: 3,
  });

  console.log(subjectsList);
  const { handleSubmit, control, reset } = useForm({
    mode: "onTouched",
    defaultValues: initialValues,
  });

  useEffect(() => {
    setInitialValues({
      code: selectedSubject?.code,
      acronym: selectedSubject?.acronym,
      title: selectedSubject?.title,
      description: selectedSubject?.description,
      topics: selectedSubject?.subjects,
    });
  }, [selectedSubject]);

  useEffect(() => {
    // Update form values when initialValues change
    reset(initialValues);
  }, [initialValues, reset]);

  const onSubmit = (rawData) => {
    alert("CLICKED SUBMIT", rawData);
  };

  const onError = (err) => {
    alert("Encountered an error updating user. Please try again later", err);
  };

  const handleUndo = () => {
    console.log("CLICKED UNDO");
  };

  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={styles.tabContainer}
      disableGutters
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <ElevatedSectionWrapper
          bgcolor={grey[200]}
          px="30%"
          py="8px"
          className="outlined"
        >
          <AutocompleteSelector
            value={selectedSubject}
            setValue={setSelectedSubject}
            options={subjectsList}
            label="subjects"
          />
        </ElevatedSectionWrapper>
        <br />
        <ElevatedSectionWrapper px={{ md: "20px", lg: "200px" }}>
          <SubjectInfoSection control={control} />
        </ElevatedSectionWrapper>
        <br />
        <DevTool control={control} />
        <FormActionsContainer justify={{ sm: "flex-end", xs: "center" }}>
          <FormActionButton
            label="undo changes"
            onClickHandler={handleUndo}
            variant="outlined"
          />
          <FormActionButton
            type="submit"
            label="save changes"
            variant="contained"
          />
        </FormActionsContainer>
      </form>
    </Container>
  );
};

export default ManageSubjectsTab;
