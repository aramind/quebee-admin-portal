import {
  Box,
  Button,
  Container,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import courseSchema from "../schemas/course";
import { DevTool } from "@hookform/devtools";
import MultiSelectCheckbox from "../components/MultiSelectCheckbox";

// styles
import useStyles from "../hooks/useStyles";
import LabelledTextField from "../components/form/LabelledTextField";
import FormInputLabel from "../components/form/FormInputLabel";
import ElevatedSectionWrapper from "../wrappers/ElevatedSectionWrapper";
import GrowTransitionWrapper from "../wrappers/GrowTransitionWrapper";
import FormActionButton from "../components/form/FormActionButton";
import { teal } from "@mui/material/colors";
import FormActionsContainer from "../containers/FormActionsContainer";

// TODELEDELETE
const mockDBNames = ["Engineering", "LET", "Accountancy", "Nursing"];

const AddCoursePage = () => {
  // hooks
  const styles = useStyles();

  // form
  const { register, control, handleSubmit, formState, reset, getValues } =
    useForm({
      resolver: zodResolver(courseSchema),
      mode: "onTouched",
    });
  const { errors, dirtyFields } = formState;
  const {
    fields: fieldsForSubject,
    append: appendSubject,
    remove: removeSubject,
  } = useFieldArray({
    control,
    name: "subjects",
  });

  const onSubmit = (data) => {
    const subjects = getValues("subjects", []);

    const prepSubjects = subjects.map((subject) => {
      return {
        ...subject,
        topics: subject.topics
          .split("#")
          .map((topic) => topic.trim())
          .filter((topic) => topic.length > 1),
      };
    });
    const finalData = { ...data, subjects: prepSubjects };
    console.log("sending...", finalData);
  };

  const onError = (error) => {
    console.log("ERROR", error);
  };

  // todo
  const handleClear = () => {
    console.log("handling clearing of form..");
  };

  const handleUpload = () => {
    console.log("handling uploading of form..");
  };
  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={styles.mainContainer}
      disableGutters="true"
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Stack spacing={2}>
          <ElevatedSectionWrapper>
            <Stack
              spacing={2}
              direction={{ xs: "column", md: "row" }}
              width={1}
            >
              <Box>
                <Grid container spacing={2}>
                  <Grid xs={12} md={3}>
                    <LabelledTextField
                      label="code"
                      id="code"
                      error={!!errors.code}
                      focused={dirtyFields.code && !errors}
                      register={register}
                    />
                  </Grid>
                  <Grid xs={12} md={9}>
                    <Stack width={1} spacing={0.25}>
                      <InputLabel
                        htmlFor="databases"
                        sx={styles.form.inputLabel}
                      >
                        DATABASE(S)
                      </InputLabel>
                      <MultiSelectCheckbox
                        options={mockDBNames}
                        register={register}
                        formState={formState}
                      />
                    </Stack>
                  </Grid>

                  <Grid xs={12} md={3}>
                    <LabelledTextField
                      label="acronym"
                      id="acronym"
                      error={!!errors.acronym}
                      focused={dirtyFields.acronym && !errors}
                      register={register}
                    />
                  </Grid>
                  <Grid xs={12} md={9}>
                    <LabelledTextField
                      label="title"
                      id="title"
                      error={!!errors.title}
                      focused={dirtyFields.title && !errors}
                      register={register}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Stack sx={{ width: 1 }}>
                <LabelledTextField
                  label="description"
                  id="description"
                  error={!!errors.description}
                  focused={dirtyFields.description && !errors}
                  register={register}
                  multiline={true}
                  minRows={4.3}
                />
              </Stack>
            </Stack>
          </ElevatedSectionWrapper>
          <ElevatedSectionWrapper>
            <Stack spacing={1}>
              <FormInputLabel label="subjects" />
              <Box>
                <Grid container spacing={4}>
                  {fieldsForSubject.map((field, index) => {
                    const subjectObject = {
                      shortTitle:
                        getValues(`subjects[${index}].shortTitle`) || "",
                      longTitle:
                        getValues(`subjects[${index}].longTitle`) || "",
                      topics: getValues(`subjects[${index}].topics`) || "",
                    };

                    // Register the entire object using register
                    register(`subjects[${index}]`, {
                      value: subjectObject,
                    });

                    return (
                      <GrowTransitionWrapper key={index}>
                        <Grid
                          xs={12}
                          sm={6}
                          md={3}
                          key={field.id}
                          name={`subjects[${index}]`}
                        >
                          <Stack
                            gap={1.5}
                            padding={1.5}
                            sx={styles.form.cardBorder}
                          >
                            <Stack direction="row" spacing={1}>
                              <TextField
                                variant="outlined"
                                label="Short Title"
                                fullWidth
                                size="small"
                                {...register(`subjects[${index}].shortTitle`)}
                              />
                              <Button
                                variant="contained"
                                sx={{ bgcolor: "primary.semi" }}
                                onClick={() => removeSubject(index)}
                              >
                                Remove
                              </Button>
                            </Stack>
                            <TextField
                              variant="outlined"
                              label="Long Title"
                              fullWidth
                              size="small"
                              {...register(`subjects[${index}].longTitle`)}
                            />
                            <InputLabel sx={{ textAlign: "left" }}>
                              Topics (add topics starting with # )
                            </InputLabel>
                            <TextField
                              variant="outlined"
                              placeholder={`#Topic 1\n#Topic 2`}
                              fullWidth
                              multiline
                              rows={2}
                              size="small"
                              {...register(`subjects[${index}].topics`)}
                            />
                          </Stack>
                        </Grid>
                      </GrowTransitionWrapper>
                    );
                  })}
                  <Grid xs={12} sm={6} md={3}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => appendSubject()}
                      sx={{
                        minHeight: 242,
                      }}
                    >
                      Add Subject
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Stack>
          </ElevatedSectionWrapper>
        </Stack>
        <br />
        <FormActionsContainer>
          <FormActionButton
            label="clear"
            onClickHandler={handleClear}
            variant="outlined"
          />
          <FormActionButton
            label="upload"
            onClickHandler={handleUpload}
            variant="outlined"
          />
          <FormActionButton type="submit" label="save" variant="contained" />
        </FormActionsContainer>
      </form>
      <DevTool control={control} />
    </Container>
  );
};

export default AddCoursePage;
