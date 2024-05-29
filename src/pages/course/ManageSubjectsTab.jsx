import { Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import useStyles from "../../hooks/useStyles";
import { useForm } from "react-hook-form";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import { grey } from "@mui/material/colors";
import AutocompleteSelector from "../../components/AutocompleteSelector";
import SubjectInfoSection from "./SubjectInfoSection";
import { DevTool } from "@hookform/devtools";
import FormActionsContainer from "../../containers/FormActionsContainer";
import FormActionButton from "../../components/form/FormActionButton";
import ACSandDOS from "./ACSandDOS";
import FormWrapper from "../../wrappers/FormWrapper";
import useFetchData from "../../hooks/api/useFetchData";
import useSubjReq from "../../hooks/api/useSubReq";
import useApiSend from "../../hooks/api/useApiSend";
import { showAckNotification } from "../../utils/showAckNotification";
import { useGlobalState } from "../../context/GlobalStatesContextProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import subjectSchema from "../../schemas/subject";

const ManageSubjectsTab = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [initialValues, setInitialValues] = useState({});

  const styles = useStyles();
  const {
    globalState: { ackAlert },
    dispatch,
  } = useGlobalState();

  const { subjectsList } = useFetchData();
  const { edit } = useSubjReq();

  const { mutate: handleEditSubject } = useApiSend(
    edit,
    (data) => showAckNotification({ dispatch, success: true, data, ackAlert }),
    (err) =>
      showAckNotification({ dispatch, success: false, data: err, ackAlert }),
    ["subjects"]
  );

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    getValues,
    formState: { isDirty, errors },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(subjectSchema),
    defaultValues: initialValues,
  });

  const formMethods = {
    handleSubmit,
    control,
    reset,
    setValue,
    errors,
    getValues,
  };

  const setIV = (subject) => {
    setInitialValues({
      _id: subject?._id,
      code: subject?.code,
      acronym: subject?.acronym,
      title: subject?.title,
      description: subject?.description,
      topics: subject?.topics,
      status: subject?.status,
      isHidden: subject?.isHidden ? "yes" : "no",
      creator: subject?.creator,
      createdAt: subject?.createdAt,
      version: subject?.version,
    });
  };

  useEffect(() => {
    setIV(selectedSubject);
  }, [selectedSubject, reset]);

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const handleFormDataSubmit = (rawData) => {
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
    handleEditSubject({ id: rawData?._id, data: formattedData });
  };

  const handleUndo = () => {
    reset();
    setIV(selectedSubject);
  };

  return (
    <FormWrapper formMethods={formMethods}>
      <Container
        component="main"
        maxWidth="xl"
        sx={styles.tabContainer}
        disableGutters
        width="100vw"
      >
        <form onSubmit={handleSubmit(handleFormDataSubmit)} noValidate>
          <ElevatedSectionWrapper bgcolor={grey[200]} px="30%" py="8px">
            <AutocompleteSelector
              value={selectedSubject}
              setValue={setSelectedSubject}
              options={subjectsList?.data}
              label="subjects"
            />
          </ElevatedSectionWrapper>
          <br />
          <Stack direction="row" spacing={1.5}>
            <ElevatedSectionWrapper flex={1} px={{ xs: "20px", md: "50px" }}>
              <SubjectInfoSection />
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
              disabled={!selectedSubject?._id || !isDirty}
            />
            <FormActionButton
              type="submit"
              label="save changes"
              variant="contained"
              disabled={
                !selectedSubject?._id ||
                !isDirty ||
                Object.keys(errors).length !== 0
              }
            />
          </FormActionsContainer>
        </form>
      </Container>
    </FormWrapper>
  );
};

export default ManageSubjectsTab;
