import React, { useCallback, useEffect, useState } from "react";
import useStyles from "../../hooks/useStyles";
import { useForm } from "react-hook-form";
import FormWrapper from "../../wrappers/FormWrapper";
import { Box, Container, Stack } from "@mui/material";
import AutocompleteSelector from "../../components/AutocompleteSelector";

import CourseDetailsSection from "./CourseDetailsSection";
import ACSandDOS from "./ACSandDOS";
import { DevTool } from "@hookform/devtools";
import FormActionsContainer from "../../containers/FormActionsContainer";
import FormActionButton from "../../components/form/FormActionButton";
import useFetchData from "../../hooks/api/useFetchData";
import useCourseReq from "../../hooks/api/useCourseReq";
import useApiSend from "../../hooks/api/useApiSend";
import { zodResolver } from "@hookform/resolvers/zod";
import courseSchema from "../../schemas/course.js";
import ConfirmActionDialog from "../../components/ConfirmActionDialog.jsx";
import DeleteDialogContent from "../../components/dialog/DeleteDialogContent.jsx";

const setDeleteDialogContent = (selectedCourse) => {
  const obj = {
    code: selectedCourse?.code,
    acronym: selectedCourse?.acronym,
    title: selectedCourse?.title,
    description: selectedCourse?.description,
    database: selectedCourse?.database,
    subjects: selectedCourse?.subjects?.map((subject) => subject.title),
    status: selectedCourse?.status,
    "  ": "",
    remarks: selectedCourse?.remarks,
  };
  return obj;
};

const FormActions = ({
  selectedCourse,
  handleUpload,
  handleConfirmDelete,
  handleUndo,
  isDirty,
  errors,
}) => {
  return (
    <FormActionsContainer justify={{ sm: "flex-end", xs: "center" }}>
      <FormActionButton
        label="upload"
        onClickHandler={handleUpload}
        variant="outlined"
        disabled={!selectedCourse?._id || selectedCourse?.status === "live"}
      />
      <FormActionButton
        label="delete"
        onClickHandler={handleConfirmDelete}
        variant="outlined"
        disabled={!selectedCourse?._id || selectedCourse?.status === "deleted"}
      />
      <FormActionButton
        label="undo"
        onClickHandler={handleUndo}
        variant="outlined"
        disabled={!selectedCourse?._id || !isDirty}
      />
      <FormActionButton
        type="submit"
        label="save"
        variant="contained"
        disabled={
          !selectedCourse?._id || !isDirty || Object.keys(errors).length !== 0
        }
      />
    </FormActionsContainer>
  );
};
const ManageCourseTab = () => {
  const [initialValues, setInitialValues] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const styles = useStyles();

  const { coursesList } = useFetchData();
  const { patch, simpleUpdate } = useCourseReq();
  const { mutate: sendEditCourse } = useApiSend(patch, ["courses"]);
  const { mutate: sendSimpleUpdate } = useApiSend(simpleUpdate, ["courses"]);

  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(courseSchema),
    mode: "onTouched",
    defaultValues: initialValues,
  });

  const formMethods = {
    control,
    handleSubmit,
    errors,
  };

  useEffect(() => {
    setInitialValues({
      _id: selectedCourse?._id,
      code: selectedCourse?.code,
      acronym: selectedCourse?.acronym,
      database: selectedCourse?.database,
      title: selectedCourse?.title,
      description: selectedCourse?.description,
      remarks: selectedCourse?.remarks,
      subjects: selectedCourse?.subjects,
      status: selectedCourse?.status,
      isHidden: selectedCourse?.isHidden ? "yes" : "no",
      creator: selectedCourse?.creator,
      createdAt: selectedCourse?.createdAt,
      version: selectedCourse?.version,
    });
  }, [selectedCourse]);

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const handleUndo = () => {
    reset(initialValues);
  };

  const handleFormDataSubmit = async () => {
    const rawData = getValues();
    const { _id, creator, createdAt, ...selectedData } = rawData;
    const formattedData = {
      ...selectedData,
      subjects: [
        ...new Set(
          selectedData?.subjects?.map((s) => s.title).filter((title) => title)
        ),
      ],
      isHidden: selectedData?.isHidden === "yes",
    };
    // console.log(formattedData);
    sendEditCourse({ id: _id, data: formattedData });
  };

  const handleUpload = () => {
    sendSimpleUpdate({ id: selectedCourse?._id, data: { status: "live" } });
  };

  const handleDelete = useCallback(() => {
    sendSimpleUpdate({ id: selectedCourse?._id, data: { status: "deleted" } });
  }, [selectedCourse?._id, sendSimpleUpdate]);

  const handleConfirmDelete = useCallback(() => {
    setOpenConfirmDelete(true);
  }, []);

  return (
    <>
      <FormWrapper formMethods={formMethods}>
        <Container
          component="main"
          maxWidth="xl"
          sx={styles.tabContainer}
          disableGutters
        >
          <form onSubmit={handleSubmit(handleFormDataSubmit)} noValidate>
            <Stack direction="row" spacing={1}>
              <Box width="100%" pt={0.4}>
                <AutocompleteSelector
                  value={selectedCourse}
                  setValue={setSelectedCourse}
                  options={coursesList?.data}
                  label="courses"
                />
              </Box>
              <FormActions
                selectedCourse={selectedCourse}
                handleUpload={handleUpload}
                handleConfirmDelete={handleConfirmDelete}
                handleUndo={handleUndo}
                isDirty={isDirty}
                errors={errors}
              />
            </Stack>
            <br />
            {selectedCourse && (
              <Stack direction="row" spacing={1.5}>
                <Stack flex={1}>
                  <CourseDetailsSection />
                </Stack>
                <Stack spacing={1.5} justifyContent="flex-start" width="180px">
                  <ACSandDOS values={initialValues} />
                </Stack>
              </Stack>
            )}

            <br />

            {/* <DevTool control={control} /> */}
            {selectedCourse && (
              <FormActions
                selectedCourse={selectedCourse}
                handleUpload={handleUpload}
                handleConfirmDelete={handleConfirmDelete}
                handleUndo={handleUndo}
                isDirty={isDirty}
                errors={errors}
              />
            )}
            <DevTool control={control} />
          </form>
        </Container>
      </FormWrapper>
      <ConfirmActionDialog
        open={openConfirmDelete}
        setOpen={setOpenConfirmDelete}
        title="Delete this course?"
        content={
          <DeleteDialogContent data={setDeleteDialogContent(selectedCourse)} />
        }
        handleConfirm={handleDelete}
      />
    </>
  );
};

export default ManageCourseTab;
