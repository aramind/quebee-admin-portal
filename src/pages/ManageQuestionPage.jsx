import { Container, Stack } from "@mui/material";
import useStyles from "../hooks/useStyles";
import ElevatedSectionWrapper from "../wrappers/ElevatedSectionWrapper";

import Label from "./manage-question-page/Label";
import Value from "./manage-question-page/Value";
import { useFetchQUestions } from "../hooks/useFetchQuestions";
import { formatDate } from "../utils/formatDate";
import { Fragment, useState } from "react";
import { usePatchQuestion } from "../hooks/usePatchQuestion";
import ButtonsSection from "./manage-question-page/ButtonsSection";
import QuestionAndChoicesSection from "./manage-question-page/QuestionAndChoicesSection";
import MetaInfoSection from "./manage-question-page/MetaInfoSection";

const ManageQuestionPage = () => {
  const styles = useStyles();
  const [questionIndex, setQuestionIndex] = useState(0);

  const { data: questions } = useFetchQUestions({
    params: "",
    staleTime: Infinity,
  });

  const { mutate: editQuestion } = usePatchQuestion();
  // onClickHandlers

  const handlePrevious = () => {
    setQuestionIndex((prevIndex) =>
      prevIndex === 0 ? questions.length - 1 : prevIndex - 1
    );
  };

  const handleDelete = () => {
    try {
      editQuestion({
        params: `${questions[questionIndex]?._id}`,
        patchData: {
          status: "deleted",
        },
      });
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleEdit = () => {
    // alert("Clicked edit btn on manage question page");
  };
  const handleUpload = () => {
    try {
      editQuestion({
        params: `${questions[questionIndex]?._id}`,
        patchData: {
          status: "approved",
        },
      });
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  const handleNext = () => {
    setQuestionIndex((prevIndex) => (prevIndex + 1) % questions?.length);
  };

  return (
    <Container maxWidth="xl" sx={styles.mainContainer}>
      {questions && (
        <Fragment>
          <Stack spacing={1.5}>
            <ElevatedSectionWrapper fullW={true}>
              <Stack direction="row">
                <Label label="code" />
                <Value values={questions[questionIndex]?.code} />
              </Stack>
            </ElevatedSectionWrapper>
            <QuestionAndChoicesSection
              questions={questions}
              questionIndex={questionIndex}
            />

            <ElevatedSectionWrapper>
              <Stack spacing={1}>
                <Label label="information" />
                <Value
                  values={questions[questionIndex]?.information || "----------"}
                />
              </Stack>
            </ElevatedSectionWrapper>
            <ElevatedSectionWrapper>
              <Stack spacing={1} direction="row">
                <Label label="tags" />
                <Value values={questions[questionIndex]?.tags} inChip />
              </Stack>
            </ElevatedSectionWrapper>
            <MetaInfoSection currentQuestion={questions[questionIndex]} />
          </Stack>
          <br />
          <ButtonsSection
            questions={questions}
            questionIndex={questionIndex}
            handlePrevious={handlePrevious}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleUpload={handleUpload}
            handleNext={handleNext}
          />
        </Fragment>
      )}
    </Container>
  );
};

export default ManageQuestionPage;
