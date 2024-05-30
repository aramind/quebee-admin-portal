import React, { useEffect, useState } from "react";
import useStyles from "../../hooks/useStyles";
import { useForm } from "react-hook-form";
import FormWrapper from "../../wrappers/FormWrapper";
import { Container, Stack } from "@mui/material";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import AutocompleteSelector from "../../components/AutocompleteSelector";
import { grey } from "@mui/material/colors";
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

const ManageCourseTab = () => {
  const [initialValues, setInitialValues] = useState({});
  const [selectedCourse, setSelectedCourse] = useState(null);
  const styles = useStyles();

  const { coursesList } = useFetchData();
  const { patch } = useCourseReq();
  const { mutate: sendEditCourse } = useApiSend(patch, ["courses"]);

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

  return (
    <FormWrapper formMethods={formMethods}>
      <Container
        component="main"
        maxWidth="xl"
        sx={styles.tabContainer}
        disableGutters
      >
        <form onSubmit={handleSubmit(handleFormDataSubmit)} noValidate>
          <ElevatedSectionWrapper bgcolor={grey[200]} px="30%" py="8px">
            <AutocompleteSelector
              value={selectedCourse}
              setValue={setSelectedCourse}
              options={coursesList?.data}
              label="courses"
            />
          </ElevatedSectionWrapper>
          <br />
          <Stack direction="row" spacing={1.5}>
            <Stack flex={1}>
              <CourseDetailsSection />
            </Stack>
            <Stack spacing={1.5} justifyContent="flex-start" width="180px">
              <ACSandDOS values={initialValues} />
            </Stack>
          </Stack>

          <br />

          {/* <DevTool control={control} /> */}
          <FormActionsContainer justify={{ sm: "flex-end", xs: "center" }}>
            <FormActionButton
              label="undo changes"
              onClickHandler={handleUndo}
              variant="outlined"
              disabled={!selectedCourse?._id || !isDirty}
            />
            <FormActionButton
              type="submit"
              label="save changes"
              variant="contained"
              disabled={
                !selectedCourse?._id ||
                !isDirty ||
                Object.keys(errors).length !== 0
              }
            />
          </FormActionsContainer>
          <DevTool control={control} />
        </form>
      </Container>
    </FormWrapper>
  );
};

export default ManageCourseTab;
