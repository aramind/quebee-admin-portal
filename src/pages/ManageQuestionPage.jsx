import { Container, Stack } from "@mui/material";
import useStyles from "../hooks/useStyles";
import ElevatedSectionWrapper from "../wrappers/ElevatedSectionWrapper";

import Label from "./manage-question-page/Label";
import Value from "./manage-question-page/Value";
import { useFetchQUestions } from "../hooks/useFetchQuestions";
import { Fragment, useState } from "react";
import { usePatchQuestion } from "../hooks/usePatchQuestion";
import ButtonsSection from "./manage-question-page/ButtonsSection";
import QuestionAndChoicesSection from "./manage-question-page/QuestionAndChoicesSection";
import MetaInfoSection from "./manage-question-page/MetaInfoSection";
import EditQuestionModal from "./manage-question-page/EditQuestionModal";

const SimpleLabelValueStack = ({
  label,
  values,
  direction = "row",
  inChip,
}) => (
  <Stack direction={direction} spacing={1}>
    <Label label={label} />
    <Value values={values} inChip={inChip} />
  </Stack>
);
const ManageQuestionPage = () => {
  const [openEditQuestion, setOpenEditQuestion] = useState(false);
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
    setOpenEditQuestion(true);
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

  const handleSaveEdit = (data) => {
    try {
      editQuestion({
        params: `${questions[questionIndex]?._id}`,
        patchData: data,
      });
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };

  return (
    <Container maxWidth="xl" sx={styles.mainContainer}>
      {questions && (
        <Fragment>
          <Stack spacing={1.5} direction="row">
            <Stack spacing={1.5}>
              <ElevatedSectionWrapper fullW>
                <SimpleLabelValueStack
                  label="code"
                  values={questions[questionIndex]?.code}
                />
              </ElevatedSectionWrapper>
              <MetaInfoSection currentQuestion={questions[questionIndex]} />
            </Stack>
            <Stack spacing={1.5}>
              <Stack spacing={1.5}>
                <Stack>
                  <QuestionAndChoicesSection
                    questions={questions}
                    questionIndex={questionIndex}
                  />
                </Stack>
                <Stack spacing={1.5}>
                  <ElevatedSectionWrapper>
                    <SimpleLabelValueStack
                      label="information"
                      values={
                        questions[questionIndex]?.information || "----------"
                      }
                      direction="column"
                    />
                  </ElevatedSectionWrapper>
                  <ElevatedSectionWrapper>
                    <SimpleLabelValueStack
                      label="tags"
                      values={questions[questionIndex]?.tags}
                      inChip
                    />
                  </ElevatedSectionWrapper>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <br />
          <ButtonsSection
            currentQuestion={questions[questionIndex]}
            handlePrevious={handlePrevious}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleUpload={handleUpload}
            handleNext={handleNext}
          />
          <EditQuestionModal
            question={questions[questionIndex]}
            open={openEditQuestion}
            setOpen={setOpenEditQuestion}
            title="Edit Question"
            handleSaveEdit={handleSaveEdit}
          />
        </Fragment>
      )}
    </Container>
  );
};

export default ManageQuestionPage;
