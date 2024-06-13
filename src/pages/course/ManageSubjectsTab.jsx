import { Box, Container, Stack } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import useStyles from "../../hooks/useStyles";
import { useForm } from "react-hook-form";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import AutocompleteSelector from "../../components/AutocompleteSelector";
import SubjectInfoSection from "./SubjectInfoSection";
import { DevTool } from "@hookform/devtools";
import ACSandDOS from "./ACSandDOS";
import FormWrapper from "../../wrappers/FormWrapper";
import useFetchData from "../../hooks/api/useFetchData";
import useSubjReq from "../../hooks/api/useSubReq";
import useApiSend from "../../hooks/api/useApiSend";
import { zodResolver } from "@hookform/resolvers/zod";
import subjectSchema from "../../schemas/subject";
import FormActions from "./FormActions";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";

const ManageSubjectsTab = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [initialValues, setInitialValues] = useState({});

  const styles = useStyles();

  const { subjectsList } = useFetchData();
  const { edit, simpleUpdate } = useSubjReq();

  const { mutate: handleEditSubject } = useApiSend(edit, ["subjects"]);
  const { mutate: handleSimpleUpdate } = useApiSend(simpleUpdate, ["subjects"]);

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

  const setIV = useCallback((subject) => {
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
      remarks: subject?.remarks,
    });
  }, []);

  useEffect(() => {
    setIV(selectedSubject);
  }, [selectedSubject, reset, setIV]);

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const handleFormDataSubmit = () => {
    const rawData = getValues();

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
    handleEditSubject({
      id: rawData?._id,
      data: formattedData,
    });
  };

  const handleUndo = useCallback(() => {
    reset();
    setIV(selectedSubject);
  }, [reset, selectedSubject, setIV]);

  const handleUpload = useCallback(() => {
    handleSimpleUpdate({
      id: selectedSubject?._id,
      data: { status: "live" },
    });
  }, [handleSimpleUpdate, selectedSubject?._id]);

  const handleDelete = useCallback(() => {
    handleSimpleUpdate({
      id: selectedSubject?._id,
      data: { status: "deleted" },
    });
  }, [selectedSubject?._id, handleSimpleUpdate]);

  const { handleOpen: handleConfirmDelete, renderConfirmActionDialog } =
    useConfirmActionDialog(
      "Delete this Subject?",
      {
        code: selectedSubject?.code,
        acronym: selectedSubject?.acronym,
        title: selectedSubject?.title,
        description: selectedSubject?.description,
        topics: selectedSubject?.topics.map((topic) => topic.title),
        "  ": "",
        status: selectedSubject?.status,
        isHidden: selectedSubject?.isHidden ? "yes" : "no",
        " ": "",
        remarks: selectedSubject?.remarks,
      },
      handleDelete
    );

  const renderFormActions = () => (
    <FormActions
      selected={selectedSubject?._id}
      status={selectedSubject?.status}
      handleUpload={handleUpload}
      handleConfirmDelete={handleConfirmDelete}
      handleUndo={handleUndo}
      handleFormDataSubmit={handleFormDataSubmit}
      isDirty={isDirty}
      errors={errors}
    />
  );
  return (
    <>
      <FormWrapper formMethods={formMethods}>
        <Container
          component="main"
          maxWidth="xl"
          sx={styles.tabContainer}
          disableGutters
          width="100vw"
        >
          <form noValidate>
            <Stack direction="row" spacing={1}>
              <Box width="100%" pt={0.4}>
                <AutocompleteSelector
                  value={selectedSubject}
                  setValue={setSelectedSubject}
                  options={subjectsList?.data}
                  label="subjects"
                />
              </Box>
              {renderFormActions()}
            </Stack>
            <br />
            {selectedSubject?._id && (
              <Stack direction="row" spacing={1.5}>
                <ElevatedSectionWrapper
                  flex={1}
                  px={{ xs: "20px", md: "50px" }}
                >
                  <SubjectInfoSection />
                </ElevatedSectionWrapper>
                <Stack spacing={1.5} justifyContent="flex-start" width="180px">
                  <ACSandDOS values={initialValues} />
                </Stack>
              </Stack>
            )}
            <br />
            <DevTool control={control} />

            {selectedSubject?._id && renderFormActions()}
          </form>
        </Container>
      </FormWrapper>
      {renderConfirmActionDialog(selectedSubject || [])}
    </>
  );
};

export default ManageSubjectsTab;
