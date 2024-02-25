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
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import courseSchema from "../schemas/course";

const containerStyle = {
  minHeight: "calc(100vh - 60px)",
  py: "2rem",
  maxWidth: "1000px",
};

const AddCoursePage = () => {
  // form
  const { register, control, handleSubmit, formState } = useForm({
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
    console.log("DATA:", data);
    console.log("data submitted");
  };

  const onError = (error) => {
    console.log("ERROR", error);
  };
  return (
    <Container maxWidth="xl" sx={{ ...containerStyle }}>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Stack gap={2}>
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <InputLabel
                htmlFor="code"
                fullWidth
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
                fullWidth
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
                fullWidth
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
              fullWidth
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
              rows={1}
              maxRows={4}
              size="small"
              id="description"
              variant="outlined"
              error={!!errors.description}
              color={!errors.description ? "success" : "error"}
              focused={dirtyFields.description && !errors.description}
              {...register("description")}
            />
          </Stack>
          <Stack spacing={1}>
            <InputLabel
              htmlFor="subjects"
              fullWidth
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
              {fieldsForSubject.map((field, index) => (
                <Stack direction="row" spacing={1} key={field.id}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    {...register(`subjects[${index}]`)}
                    size="small"
                    sx={{ flex: "80%" }}
                  />
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => removeSubject(index)}
                  >
                    Remove
                  </Button>
                </Stack>
              ))}
              <Button variant="text" onClick={() => appendSubject()}>
                Add Subject
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
};

export default AddCoursePage;
