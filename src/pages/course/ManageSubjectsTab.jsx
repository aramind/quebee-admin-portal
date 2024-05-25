import { Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import useStyles from "../../hooks/useStyles";
import { useForm, useFormContext } from "react-hook-form";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import { grey } from "@mui/material/colors";
import useSubjReq from "../../hooks/api/useSubReq";
import useApiGet from "../../hooks/api/useApiGet";
import AutocompleteSelector from "../../components/AutocompleteSelector";
import SubjectInfoSection from "./SubjectInfoSection";
import { DevTool } from "@hookform/devtools";
import FormActionsContainer from "../../containers/FormActionsContainer";
import FormActionButton from "../../components/form/FormActionButton";
import ACSandDOS from "./ACSandDOS";
import FormWrapper from "../../wrappers/FormWrapper";
import useFormSubmit from "../../hooks/useFormSubmit";
import useFetchData from "../../hooks/api/useFetchData";

const ManageSubjectsTab = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [initialValues, setInitialValues] = useState({});

  const styles = useStyles();
  // const { fetchSubjects } = useSubjReq();
  const { subjectsList } = useFetchData();

  // const {
  //   data: subjectsList,
  //   // isLoading,
  //   // error,
  // } = useApiGet("subjects", () => fetchSubjects({ params: "/trimmed" }), {
  //   refetchOnWindowFocus: true,
  //   retry: 3,
  // });

  // console.log(subjectsList);
  const { handleSubmit, control, reset, setValue } = useForm({
    mode: "onTouched",
    defaultValues: initialValues,
  });

  const formMethods = { handleSubmit, control, reset, setValue };

  useEffect(() => {
    setInitialValues({
      code: selectedSubject?.code,
      acronym: selectedSubject?.acronym,
      title: selectedSubject?.title,
      description: selectedSubject?.description,
      topics: selectedSubject?.topics,
      status: selectedSubject?.status,
      isHidden: selectedSubject?.isHidden ? "yes" : "no",
      creator: selectedSubject?.creator,
      createdAt: selectedSubject?.createdAt,
      version: selectedSubject?.version,
    });
  }, [selectedSubject]);

  useEffect(() => {
    // Update form values when initialValues change
    reset(initialValues);
  }, [initialValues, reset]);

  const handleFormDataSubmit = (rawData) => {
    alert("CLICKED SUBMIT");
    // console.log("RAWDATA", rawData);
    const formattedData = {
      code: rawData?.code,
      acronym: rawData?.acronym,
      title: rawData?.title,
      description: rawData?.description,
      topics: rawData?.topics?.map((topic) => topic._id),
      status: rawData?.status,
      isHidden: rawData?.isHidden === "yes",
      remarks: rawData?.remarks,
    };
    console.log("FD", formattedData);
  };

  const handleUndo = () => {
    console.log("CLICKED UNDO");
  };

  const handleFormSubmit = useFormSubmit(handleFormDataSubmit);

  return (
    <FormWrapper formMethods={formMethods}>
      <Container
        component="main"
        maxWidth="xl"
        sx={styles.tabContainer}
        disableGutters
        width="100vw"
      >
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <ElevatedSectionWrapper bgcolor={grey[200]} px="30%" py="8px">
            <AutocompleteSelector
              value={selectedSubject}
              setValue={setSelectedSubject}
              options={subjectsList}
              label="subjects"
            />
          </ElevatedSectionWrapper>
          <br />
          <Stack direction="row" spacing={1.5}>
            <ElevatedSectionWrapper flex={1} px={{ xs: "20px", md: "50px" }}>
              <SubjectInfoSection
                options={initialValues?.topics?.map((topic) => topic.title)}
              />
            </ElevatedSectionWrapper>
            <Stack spacing={1.5} justifyContent="flex-start" width="180px">
              <ACSandDOS values={initialValues} />
            </Stack>
          </Stack>
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
    </FormWrapper>
  );
};

export default ManageSubjectsTab;
