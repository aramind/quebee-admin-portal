import {
  Autocomplete,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useStyles from "../../hooks/useStyles";
import { Controller, useForm } from "react-hook-form";
import SelectDb from "../../components/form-finished/SelectDb";
import ControlledTextField from "../../components/form-controlled/ControlledTextField";
import QSection from "./QSection";
import useCourseReq from "../../hooks/api/useCourseReq";
import useApiGet from "../../hooks/api/useApiGet";
import { DevTool } from "@hookform/devtools";
import { blue, grey, red } from "@mui/material/colors";
import QuestionSection from "../add-question-page/QuestionSection";

const AddQuestionTab = () => {
  const styles = useStyles();

  const { get } = useCourseReq();
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  // autocomplete
  // const [selectedCourses, setSelectedCourses] = useState([]);
  // const handleCourseSelect = (e) => {
  //   setSelectedCourses(
  //     typeof e.target.value === "string"
  //       ? e.target.value.split(",")
  //       : e.target.value
  //   );
  // };

  const { data: coursesList } = useApiGet("courses", () => get("/trimmed"), {
    refetchOnWindowFocus: true,
    retry: 3,
  });

  console.log("CLIST", coursesList);
  // console.log("SC", selectedCourses);
  console.log("SS", selectedSubjects);
  const { control, handleSubmit } = useForm({
    mode: "onTouched",
    defaultValues: {
      courses: [],
    },
  });

  const onSubmit = (rawData) => {
    console.log(rawData);
    alert("SUBMIT");
  };

  const onError = (err) => {
    console.log("error submitting form", err);
  };
  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={styles.tabContainer}
      disableGutters
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Stack direction={{ md: "row" }} spacing={1.5}>
          <Stack
            // className="outlined"
            spacing={1.5}
            flex={1}
          >
            <Stack direction="row" spacing={1}>
              <SelectDb control={control} />
              <ControlledTextField name="code" label="code" control={control} />
            </Stack>
            <>
              <Controller
                name="courses"
                control={control}
                // defaultValue={[]}
                render={({ field }) => (
                  <>
                    <Typography>Courses</Typography>
                    <Autocomplete
                      {...field}
                      fullWidth
                      multiple
                      options={coursesList || []}
                      getOptionLabel={(course) => course?.title}
                      filterSelectedOptions
                      value={field.value}
                      onChange={(e, newCourse) => {
                        const selectedSubjects =
                          newCourse.map((course) => course.subjects) || [];
                        setSelectedSubjects(selectedSubjects);
                        field.onChange(newCourse);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="Type here to select course(s)"
                        />
                      )}
                      renderValue={(field) => (
                        <Box sx={localStyle.box}>
                          {field.value.map((course) => ({ course }))}
                        </Box>
                      )}
                      sx={{
                        ...localStyle.autocomplete,
                        ...localStyle.chipOnBox,
                      }}
                    />
                  </>
                )}
              />
            </>
            <br />
            <Controller
              name="subjects"
              control={control}
              // defaultValue={[]}
              render={({ field }) => (
                <>
                  <Typography>Subjects</Typography>
                  <Autocomplete
                    {...field}
                    fullWidth
                    multiple
                    options={selectedSubjects || []}
                    getOptionLabel={(option) => option?.title}
                    filterSelectedOptions
                    value={field.value}
                    onChange={(e, newValue) => {
                      const selectedSubjects =
                        newValue.map((item) => item.subjects) || [];
                      setSelectedSubjects(selectedSubjects);
                      field.onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Type here to select a subject(s)"
                      />
                    )}
                    renderValue={(field) => (
                      <Box sx={localStyle.box}>
                        {field.value.map((course) => ({ course }))}
                      </Box>
                    )}
                    sx={{
                      ...localStyle.autocomplete,
                      ...localStyle.chipOnBox,
                    }}
                  />
                </>
              )}
            />
          </Stack>
          <br />
          <Stack className="outlined2" flex={2}>
            {/* <QSection control={control} /> */}
            <QuestionSection control={control} />
          </Stack>
        </Stack>
        <DevTool control={control} />
      </form>
    </Container>
  );
};

export default AddQuestionTab;

// localStyles
const localStyle = {
  box: { display: "flex", flexWrap: "wrap", gap: 0.5 },
  autocomplete: {
    "& .MuiChip-root:hover": {
      bgcolor: red[100],
      color: grey[900],
      borderColor: red[100],
      cursor: "default",
    },
    "& .MuiChip-deleteIconColorDefault.MuiChip-deleteIconFilledColorDefault:hover":
      {
        color: red["A200"],
      },
  },
  chipOnBox: {
    "& .MuiChip-label": {
      // textTransform: textTransform || "",
      fontFamily: (theme) => theme.typography.chip,
      color: "black",
      fontSize: { xs: "0.8rem", md: "0.9rem" },
    },
    "& .MuiChip-root": {
      // bgcolor: blue[200],
      bgcolor: (theme) => theme.palette.tertiary.lightest,
    },
    "& .MuiInputBase": {
      height: "725px",
      color: red[500],
    },
  },
};
