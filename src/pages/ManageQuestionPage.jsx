import { Container, Stack, Typography } from "@mui/material";
import React from "react";
import useStyles from "../hooks/useStyles";
import { useForm } from "react-hook-form";
import questionSchema from "../schemas/question";
import { zodResolver } from "@hookform/resolvers/zod";
import ElevatedSectionWrapper from "../wrappers/ElevatedSectionWrapper";
import LabelledText from "../components/form/LabelledText";

const ManageQuestionPage = () => {
  const styles = useStyles();

  const { handleSubmit } = useForm({
    resolver: zodResolver(questionSchema),
    mode: "onTouched",
  });
  const onSubmit = (data) => {
    console.log("Submitting Question:", data);
  };

  const onError = (error) => {
    console.log("Error submitting question:", error);
  };
  return (
    <Container maxWidth="xl" sx={styles.mainContainer}>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Stack spacing={1.5}>
          <ElevatedSectionWrapper fullW={true}>
            <LabelledText label="code" values={["001", "AA3"]} />
          </ElevatedSectionWrapper>
        </Stack>
      </form>
    </Container>
  );
};

export default ManageQuestionPage;
