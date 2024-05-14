import {
  Autocomplete,
  Container,
  InputLabel,
  Stack,
  TextField,
  ThemeProvider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useStyles from "../../hooks/useStyles";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import CourseDetailsSection from "../common-sections/CourseDetailsSection";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import FormActionsContainer from "../../containers/FormActionsContainer";
import FormActionButton from "../../components/form/FormActionButton";
import useCourseReq from "../../hooks/api/useCourseReq";
import useApiGet from "../../hooks/api/useApiGet";
import { grey } from "@mui/material/colors";

const ManageCoursePage = () => {
  const [value, setValue] = useState(null);
  const [initialValues, setInitialValues] = useState({});

  console.log(value);
  console.log(initialValues);
  const styles = useStyles();
  const { get } = useCourseReq();

  const {
    data: coursesList,
    // isLoading,
    // error,
  } = useApiGet("courses", () => get("/trimmed"), {
    refetchOnWindowFocus: true,
    retry: 3,
  });

  console.log(coursesList);
  const { control, handleSubmit, reset } = useForm({
    // resolver: zodResolver(courseSchema),
    mode: "onTouched",
    defaultValues: initialValues,
  });

  useEffect(() => {
    setInitialValues({
      code: value?.code,
      acronym: value?.acronym,
      database: value?.database,
      title: value?.title,
      description: value?.description,
      remarks: value?.remarks,
      subjects: value?.subjects,
    });
  }, [value]);

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
        <ElevatedSectionWrapper bgcolor={grey[200]} px="30%" py="8px">
          <Autocomplete
            // className="outlined"
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
            options={coursesList || []}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                variant="outlined"
                placeholder="Type here to select course..."
                sx={{ bgcolor: grey[50] }}
              />
            )}
          />
        </ElevatedSectionWrapper>
        <br />
        <CourseDetailsSection control={control} />
        <br />
      </form>
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
    </Container>
  );
};

export default ManageCoursePage;
