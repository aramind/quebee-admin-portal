import {
  Button,
  Container,
  Grid,
  InputLabel,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import courseSchema from "../schemas/course";
import { DevTool } from "@hookform/devtools";
import MultiSelectCheckbox from "../components/MultiSelectCheckbox";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
// styles
import useStyles from "../hooks/useStyles";
import LabelledTextField from "../components/form/LabelledTextField";
import FormInputLabel from "../components/form/FormInputLabel";
import { grey } from "@mui/material/colors";
import ElevatedSectionWrapper from "../wrappers/ElevatedSectionWrapper";
import GrowTransitionWrapper from "../wrappers/GrowTransitionWrapper";
import FormActionButton from "../components/form/FormActionButton";

// TODELEDELETE
const mockDBNames = ["Engineering", "LET", "Accountancy", "Nursing"];

const AddCoursePage = () => {
  // hooks
  const styles = useStyles();

  const [success, setSuccess] = useState(false);
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
    <Container maxWidth="xl" sx={styles.mainContainer} disableGutters="true">
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Stack gap={2}>
          <ElevatedSectionWrapper>
            <Stack spacing={1} direction="row" sx={{ width: 1 }}>
              <Stack sx={{ width: 1 }} gap={1}>
                <Grid container spacing={2} width={1}>
                  <Grid item xs={3}>
                    <LabelledTextField
                      label="code"
                      id="code"
                      error={!!errors.code}
                      focused={dirtyFields.code && !errors}
                      register={register}
                    />
                  </Grid>
                  <Grid item xs={9} sx={{ justifyContent: "center" }}>
                    <Stack width={1} gap={0.25}>
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
                </Grid>
                <Grid container spacing={2} width={1}>
                  <Grid item xs={3}>
                    <LabelledTextField
                      label="acronym"
                      id="acronym"
                      error={!!errors.acronym}
                      focused={dirtyFields.acronym && !errors}
                      register={register}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <LabelledTextField
                      label="title"
                      id="title"
                      error={!!errors.title}
                      focused={dirtyFields.title && !errors}
                      register={register}
                    />
                  </Grid>
                </Grid>
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
          </ElevatedSectionWrapper>
          <ElevatedSectionWrapper>
            <Stack gap={1}>
              <FormInputLabel label="subjects" />
              <Grid
                container
                // rowSpacing={2}
                spacing={2}
                width={1}
              >
                {fieldsForSubject.map((field, index) => {
                  const subjectObject = {
                    shortTitle:
                      getValues(`subjects[${index}].shortTitle`) || "",
                    longTitle: getValues(`subjects[${index}].longTitle`) || "",
                    topics: getValues(`subjects[${index}].topics`) || "",
                  };

                  // Register the entire object using register
                  register(`subjects[${index}]`, {
                    value: subjectObject,
                  });

                  // const colorIndex = index % colors.length;

                  return (
                    <GrowTransitionWrapper>
                      <Grid
                        item
                        xs={3}
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
                            // label={`#Topic 1\n#Topic 2`}
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
                <Grid item xs={3} alignContent="center">
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
          </ElevatedSectionWrapper>
        </Stack>
        <br />
        <Stack
          direction="row"
          gap={2}
          sx={{ justifyContent: "flex-end", py: 0 }}
        >
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
        </Stack>
      </form>
      <DevTool control={control} />
    </Container>
  );
};

export default AddCoursePage;
