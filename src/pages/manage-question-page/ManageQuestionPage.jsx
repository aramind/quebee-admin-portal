import { Container, Grid, Stack } from "@mui/material";

import { Fragment, useState } from "react";
import useStyles from "../../hooks/useStyles";
import useAxiosPrivate from "../../hooks/api/useAxiosPrivate";
import { usePatchQuestion } from "../../hooks/usePatchQuestion";
import { useFetchQUestions } from "../../hooks/useFetchQuestions";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import SimpleLabelValue from "../../components/SimpleLabelValue";
import MetaInfoSection from "./MetaInfoSection";
import QuestionAndChoicesSection from "./QuestionAndChoicesSection";
import ButtonsSection from "./ButtonsSection";
import EditQuestionModal from "./EditQuestionModal";
import useQuestionReq from "../../hooks/api/useQuestionReq";
import RequestErrorPage from "../RequestErrorPage";
import LoadingPage from "../LoadingPage";
import useApiGet from "../../hooks/api/useApiGet";
import { useLocation, useNavigate } from "react-router-dom";

const ManageQuestionPage = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { get } = useQuestionReq();
  const [openEditQuestion, setOpenEditQuestion] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [params, setParams] = useState("");

  // const axiosPrivate = useAxiosPrivate();

  const {
    data: questions,
    isLoading,
    error,
  } = useApiGet("questions", () => get(params), {
    refetchOnWindowFocus: true,
    retry: 3,
    staleTime: Infinity,
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    console.log(error?.response?.status);
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      console.log("re logging in");
      navigate("/login", { state: { from: location }, replace: true });
    } else {
      return <RequestErrorPage error={error} />;
    }
  }

  //   const { data: questions2 } = useFetchQUestions({
  //   axiosPriv: axiosPrivate,
  //   params: "",
  //   staleTime: Infinity,
  // });

  const { mutate: editQuestion } = usePatchQuestion;
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
          <Grid container spacing={1.5}>
            <Grid item xs={4}>
              <Stack spacing={1.5} width="100%" height="100%">
                <ElevatedSectionWrapper fullW>
                  <SimpleLabelValue
                    label="code"
                    values={questions[questionIndex]?.code}
                  />
                </ElevatedSectionWrapper>
                <MetaInfoSection currentQuestion={questions[questionIndex]} />
              </Stack>
            </Grid>
            <Grid item xs={8}>
              <Stack spacing={1.5}>
                <Stack spacing={1.5} sx={{ flex: "1 1 auto" }}>
                  <Stack>
                    <QuestionAndChoicesSection
                      questions={questions}
                      questionIndex={questionIndex}
                    />
                  </Stack>
                  <Stack spacing={1.5}>
                    <ElevatedSectionWrapper>
                      <SimpleLabelValue
                        label="information"
                        values={
                          questions[questionIndex]?.information || "----------"
                        }
                        direction="column"
                      />
                    </ElevatedSectionWrapper>
                    <ElevatedSectionWrapper>
                      <SimpleLabelValue
                        label="tags"
                        values={questions[questionIndex]?.tags}
                        inChip
                      />
                    </ElevatedSectionWrapper>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
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
