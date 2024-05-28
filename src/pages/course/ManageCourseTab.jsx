import React, { useEffect, useState } from "react";
import useStyles from "../../hooks/useStyles";
import { useForm } from "react-hook-form";
import FormWrapper from "../../wrappers/FormWrapper";
import { Container, Stack } from "@mui/material";
import useFormSubmit from "../../hooks/useFormSubmit";
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

const ManageCourseTab = () => {
  const [initialValues, setInitialValues] = useState({});
  const [value, setValue] = useState(null);
  const styles = useStyles();
  const { coursesList } = useFetchData();
  const { patch } = useCourseReq();

  const { mutate: sendEditCourse } = useApiSend(
    patch,
    () =>
      alert("Successful updating of course", (err) =>
        alert("Error updating course. Try again.", err)
      ),
    ["courses"]
  );

  const {
    control,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({
    // resolver: zodResolver(courseSchema),
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
      _id: value?._id,
      code: value?.code,
      acronym: value?.acronym,
      database: value?.database,
      title: value?.title,
      description: value?.description,
      remarks: value?.remarks,
      subjects: value?.subjects,
      status: value?.status,
      isHidden: value?.isHidden ? "yes" : "no",
      creator: value?.creator,
      createdAt: value?.createdAt,
      version: value?.version,
    });
  }, [value]);

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const handleUndo = () => {
    console.log("CLICKED UNDO");
  };

  const handleFormDataSubmit = async (rawData) => {
    alert("CLICKED SUBMIT", rawData);
    // console.log("RAW DATA", rawData);
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
    // console.log("FD", formattedData);
    sendEditCourse({ id: _id, data: formattedData });
  };
  const handleFormSubmit = useFormSubmit(handleFormDataSubmit);
  return (
    <FormWrapper formMethods={formMethods}>
      <Container
        component="main"
        maxWidth="xl"
        sx={styles.tabContainer}
        disableGutters
      >
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <ElevatedSectionWrapper bgcolor={grey[200]} px="30%" py="8px">
            <AutocompleteSelector
              value={value}
              setValue={setValue}
              options={coursesList?.data}
              label="courses"
            />
          </ElevatedSectionWrapper>
          <br />
          <Stack direction="row" spacing={1.5}>
            <Stack flex={1}>
              <CourseDetailsSection
              // control={control}
              />
            </Stack>
            <Stack spacing={1.5} justifyContent="flex-start" width="180px">
              <ACSandDOS
                // control={control}
                values={initialValues}
              />
            </Stack>
          </Stack>

          <br />

          {/* <DevTool control={control} /> */}
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
          <DevTool control={control} />
        </form>
      </Container>
    </FormWrapper>
  );
};

export default ManageCourseTab;
