import React, { useCallback, useEffect, useState } from "react";
import useStyles from "../../hooks/useStyles";
import { useForm } from "react-hook-form";
import FormWrapper from "../../wrappers/FormWrapper";
import { Box, Container, Stack } from "@mui/material";
import AutocompleteSelector from "../../components/AutocompleteSelector";

import CourseDetailsSection from "./CourseDetailsSection";
import ACSandDOS from "./ACSandDOS";
import { DevTool } from "@hookform/devtools";
import useFetchData from "../../hooks/api/useFetchData";
import useCourseReq from "../../hooks/api/useCourseReq";
import useApiSend from "../../hooks/api/useApiSend";
import { zodResolver } from "@hookform/resolvers/zod";
import courseSchema from "../../schemas/course.js";
import FormActions from "./FormActions.jsx";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog.js";

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

const ManageCourseTab = () => {
  const [initialValues, setInitialValues] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null);
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

  const handleUndo = useCallback(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const handleFormDataSubmit = useCallback(() => {
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
    sendEditCourse({ id: _id, data: formattedData });
  }, [getValues, sendEditCourse]);

  const handleUpload = useCallback(() => {
    sendSimpleUpdate({ id: selectedCourse?._id, data: { status: "live" } });
  }, [selectedCourse?._id, sendSimpleUpdate]);

  const handleDelete = useCallback(() => {
    sendSimpleUpdate({ id: selectedCourse?._id, data: { status: "deleted" } });
  }, [selectedCourse?._id, sendSimpleUpdate]);

  const { handleOpen: handleConfirmDelete, renderConfirmActionDialog } =
    useConfirmActionDialog(
      "Delete this Course?",
      () => setDeleteDialogContent(selectedCourse),
      handleDelete
    );
  return (
    <>
      <FormWrapper formMethods={formMethods}>
        <Container
          component="main"
          maxWidth="xl"
          sx={styles.tabContainer}
          disableGutters
        >
          <form noValidate>
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
                selected={selectedCourse?._id}
                status={selectedCourse?.status}
                handleUpload={handleUpload}
                handleConfirmDelete={handleConfirmDelete}
                handleUndo={handleUndo}
                handleFormDataSubmit={handleFormDataSubmit}
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
                selected={selectedCourse?._id}
                status={selectedCourse?.status}
                handleUpload={handleUpload}
                handleConfirmDelete={handleConfirmDelete}
                handleUndo={handleUndo}
                handleFormDataSubmit={handleFormDataSubmit}
                isDirty={isDirty}
                errors={errors}
              />
            )}
            <DevTool control={control} />
          </form>
        </Container>
      </FormWrapper>
      {renderConfirmActionDialog(selectedCourse || [])}
    </>
  );
};

export default ManageCourseTab;
