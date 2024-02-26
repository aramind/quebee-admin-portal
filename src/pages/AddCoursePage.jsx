import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import courseSchema from "../schemas/course";
import { DevTool } from "@hookform/devtools";

const containerStyle = {
  minHeight: "calc(100vh - 60px)",
  py: "2rem",
  maxWidth: "900px",
};

const AddCoursePage = () => {
  // form
  const { register, control, handleSubmit, formState, watch } = useForm({
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

  const {
    fields: fieldsForTopics,
    append: appendTopic,
    remove: removeTopic,
  } = useFieldArray({
    control,
    name: "topics",
  });

  const subjData = watch("subjects", []);
  console.log(subjData);
  const onSubmit = (data) => {
    console.log("DATA:", data);
    console.log("data submitted");
  };

  const onError = (error) => {
    console.log("ERROR", error);
  };

  return (
    <Container maxWidth="xl" className="outlined" sx={{ ...containerStyle }}>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Stack gap={2}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <InputLabel
                htmlFor="code"
                sx={{
                  textAlign: "left",
                  fontSize: "0.8rem",
                  px: "5px",
                  color: "#333",
                  fontWeight: "bold",
                }}
              >
                CODE
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                id="code"
                variant="outlined"
                error={!!errors.code}
                color={!errors.code ? "success" : "error"}
                focused={dirtyFields.code && !errors.code}
                {...register("code")}
              />
            </Grid>
            <Grid item xs={3}>
              <InputLabel
                htmlFor="acronym"
                sx={{
                  textAlign: "left",
                  fontSize: "0.8rem",
                  px: "5px",
                  color: "#333",
                  fontWeight: "bold",
                }}
              >
                ACRONYM
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                id="acronym"
                variant="outlined"
                error={!!errors.acronym}
                color={!errors.acronym ? "success" : "error"}
                focused={dirtyFields.acronym && !errors.acronym}
                {...register("acronym")}
              />
            </Grid>
            <Grid item xs={6}>
              <InputLabel
                htmlFor="title"
                sx={{
                  textAlign: "left",
                  fontSize: "0.8rem",
                  px: "5px",
                  color: "#333",
                  fontWeight: "bold",
                }}
              >
                TITLE
              </InputLabel>
              <TextField
                fullWidth
                size="small"
                id="title"
                variant="outlined"
                error={!!errors.title}
                color={!errors.title ? "success" : "error"}
                focused={dirtyFields.title && !errors.title}
                {...register("title")}
              />
            </Grid>
          </Grid>
          <Stack gap={1}>
            <InputLabel
              htmlFor="description"
              sx={{
                textAlign: "left",
                fontSize: "0.8rem",
                px: "5px",
                color: "#333",
                fontWeight: "bold",
              }}
            >
              DESCRIPTION
            </InputLabel>
            <TextField
              fullWidth
              multiline
              minRows={1}
              size="small"
              id="description"
              variant="outlined"
              error={!!errors.description}
              color={!errors.description ? "success" : "error"}
              focused={dirtyFields.description && !errors.description}
              {...register("description")}
            />
          </Stack>
          <InputLabel
            htmlFor="subjects"
            sx={{
              textAlign: "left",
              fontSize: "0.8rem",
              px: "5px",
              color: "#333",
              fontWeight: "bold",
            }}
          >
            SUBJECTS
          </InputLabel>
          <Stack spacing={1}>
            <Grid container rowSpacing={2} columnSpacing={2} maxWidth="100%">
              {fieldsForSubject.map((field, index) => {
                // Create an object combining 'acronym' and 'title'
                const subjectObject = {
                  shortTitle: watch(`subjects[${index}].shortTitle`) || "",
                  longTitle: watch(`subjects[${index}].longTitle`) || "",
                  topics: watch("topics" || []),
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
                        <InputLabel>Topics</InputLabel>
                        <TextField size="small" multiline></TextField>
                      </Stack>
                    </Stack>
                  </Grid>
                );
              })}
              <Grid item xs={6} alignContent="center">
                <Button
                  className="centered-content outlined fullWandH"
                  variant="contained"
                  sx={{ bgcolor: "info.main", color: "info.contrastText" }}
                  onClick={() => appendSubject()}
                >
                  Add Subject
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </Stack>
        <Button sx={{ my: "2rem" }} variant="contained" fullWidth type="submit">
          SEND
        </Button>
      </form>
      <DevTool control={control} />
    </Container>
  );
};

export default AddCoursePage;
