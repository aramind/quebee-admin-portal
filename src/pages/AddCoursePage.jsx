import {
  Button,
  Container,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import courseSchema from "../schemas/course";
import { DevTool } from "@hookform/devtools";
import MultiSelectCheckbox from "../components/MultiSelectCheckbox";
// styles
import { mainContainerStyles } from "./styles/add-course";
import useStyles from "../hooks/useStyles";
import LabelledTextField from "../components/form/LabelledTextField";
// TODELEDELETE
const mockDBNames = ["Engineering", "LET", "Accountancy", "Nursing"];

const AddCoursePage = () => {
  // hooks
  const styles = useStyles();

  const [success, setSuccess] = useState(false);
  // form
  const {
    register,
    control,
    handleSubmit,
    formState,

    getValues,
    isSubmitError,
  } = useForm({
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

  return (
    <Container
      maxWidth="xl"
      sx={{ ...mainContainerStyles }}
      disableGutters="true"
    >
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Stack gap={1}>
          <Stack width={1} gap={0.25}>
            <InputLabel htmlFor="databases" sx={styles.form.inputLabel}>
              DATABASE(S)
            </InputLabel>
            <MultiSelectCheckbox
              options={mockDBNames}
              register={register}
              formState={formState}
            />
          </Stack>
          <Stack spacing={3} direction="row" sx={{ width: 1 }}>
            <Stack sx={{ width: 1 }} spacing={1}>
              <Stack direction="row" spacing={2} width={1}>
                <LabelledTextField
                  label="code"
                  id="code"
                  error={!!errors.code}
                  focused={dirtyFields.code && !errors}
                  register={register}
                />
                <LabelledTextField
                  label="acronym"
                  id="acronym"
                  error={!!errors.acronym}
                  focused={dirtyFields.acronym && !errors}
                  register={register}
                />
              </Stack>
              <LabelledTextField
                label="title"
                id="title"
                error={!!errors.title}
                focused={dirtyFields.title && !errors}
                register={register}
              />
            </Stack>
            <Stack sx={{ width: 1 }}>
              <LabelledTextField
                label="description"
                id="description"
                error={!!errors.description}
                focused={dirtyFields.description && !errors}
                register={register}
                multiline={true}
                minRows={4}
              />
            </Stack>
          </Stack>
          <Stack gap={1}></Stack>
          <InputLabel htmlFor="subjects" sx={styles.form}>
            SUBJECTS
          </InputLabel>
          <Stack spacing={1}>
            <Grid container rowSpacing={2} columnSpacing={2} maxWidth="100%">
              {fieldsForSubject.map((field, index) => {
                const subjectObject = {
                  shortTitle: getValues(`subjects[${index}].shortTitle`) || "",
                  longTitle: getValues(`subjects[${index}].longTitle`) || "",
                  topics: getValues(`subjects[${index}].topics`) || "",
                };

                // Register the entire object using register
                register(`subjects[${index}]`, {
                  value: subjectObject,
                });

                return (
                  <Grid
                    item
                    xs={6}
                    spacing={1}
                    key={field.id}
                    name={`subjects[${index}]`}
                    // className="outlined"
                  >
                    <Stack
                      padding={2}
                      borderRadius={1}
                      className="centered-content fullWandH"
                    >
                      <Stack spacing={1} className="fullWandH">
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
                            color="info"
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
                          label="e.g. #Topic 1"
                          fullWidth
                          multiline
                          size="small"
                          {...register(`subjects[${index}].topics`)}
                        />
                      </Stack>
                    </Stack>
                  </Grid>
                );
              })}
              <Grid item xs={6} alignContent="center">
                <Button
                  className="centered-content outlined fullWandH"
                  variant="outlined"
                  sx={{
                    minHeight: 200,
                  }}
                  onClick={() => appendSubject()}
                >
                  Add Subject
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
        <Stack direction="row">
          <InputLabel htmlFor="subjects" sx={styles.form}>
            STATUS :
          </InputLabel>
          <Typography
            variant="body2"
            color={
              success
                ? "info.main"
                : isSubmitError || Object.keys(errors).length > 0
                ? "error.main"
                : "text.primary"
            }
          >
            {success
              ? "Pending"
              : isSubmitError || Object.keys(errors).length > 0
              ? "Error"
              : "Editing"}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={4} px={4} py={4}>
          <Button
            sx={styles.form.primaryActionButton}
            variant="contained"
            fullWidth
            type="submit"
          >
            RESET
          </Button>
          <Button
            sx={styles.form.primaryActionButton}
            variant="contained"
            fullWidth
            type="submit"
          >
            SEND
          </Button>
          <Button
            sx={styles.form.primaryActionButton}
            variant="contained"
            fullWidth
            type="submit"
            disabled
          >
            UPLOAD
          </Button>
        </Stack>
      </form>
      <DevTool control={control} />
    </Container>
  );
};

export default AddCoursePage;
