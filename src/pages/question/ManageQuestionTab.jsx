import React, { useCallback, useEffect, useState } from "react";
import useQuestionReq from "../../hooks/api/useQuestionReq";
import { useForm } from "react-hook-form";
import FormWrapper from "../../wrappers/FormWrapper";
import {
  Box,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import useStyles from "../../hooks/useStyles";
import AutocompleteSelector from "../../components/AutocompleteSelector";
import ACSandDOS from "../course/ACSandDOS";
import { DevTool } from "@hookform/devtools";
import useApiSend from "../../hooks/api/useApiSend";
import QuestionDetailsSection from "./QuestionDetailsSection";
import { yupResolver } from "@hookform/resolvers/yup";
import questionSchema from "../../schemas/question";
import FormActions from "../course/FormActions";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";
import useFetchQuestions from "../../hooks/api/useFetchQuestions";
import GTable from "../../components/grid-table/GTable";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import DeleteDialogContent from "../../components/dialog/DeleteDialogContent";
import { red, teal } from "@mui/material/colors";

const getLetterOfCorrectAnswer = (choices) => {
  const correct = choices?.find((choice) => choice.isCorrect);
  const indexOfCorrectAnswer = choices?.indexOf(correct);

  switch (indexOfCorrectAnswer) {
    case 0:
      return "A";
    case 1:
      return "B";
    case 2:
      return "C";
    case 3:
      return "D";
    default:
      return undefined;
  }
};

const ManageQuestionTab = () => {
  const [initialValues, setInitialValues] = useState({});
  const [fetchValues, setFetchValues] = useState(null);
  const [status, setStatus] = useState("all");
  const styles = useStyles();
  const { edit, simpleUpdate } = useQuestionReq();
  // const { questionsList } = useFetchData();
  const { questionsList } = useFetchQuestions("questions");
  const { mutate: sendUpdate } = useApiSend(edit, ["questions"]);
  const { mutate: sendSimpleUpdate } = useApiSend(simpleUpdate, ["questions"]);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors, isDirty },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(questionSchema),
    defaultValues: initialValues,
  });

  const formMethods = {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    errors,
    isDirty,
  };

  useEffect(() => {
    setInitialValues({
      ...fetchValues,
      question: fetchValues?.question?.text,
      A: fetchValues?.choices?.[0].value?.text,
      B: fetchValues?.choices?.[1].value?.text,
      C: fetchValues?.choices?.[2].value?.text,
      D: fetchValues?.choices?.[3].value?.text,
      information: fetchValues?.information?.text,
      correctAnswer: getLetterOfCorrectAnswer(fetchValues?.choices),
      isHidden: fetchValues?.isHidden ? "yes" : "no",
    });
  }, [fetchValues]);

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const handleUndo = () => {
    reset(initialValues);
  };

  const handleFormDataSubmit = async () => {
    const rawData = getValues();
    const formattedData = {
      code: rawData?.code,
      access: Number(rawData?.access),
      difficulty: Number(rawData?.difficulty),
      topics: rawData?.topics?.map((topic) => topic._id),
      type: rawData?.type,
      question: { text: rawData?.question },
      choices: [
        {
          value: { text: rawData?.A, image: "" },
          isCorrect: rawData?.correctAnswer === "A",
        },
        {
          value: { text: rawData?.B, image: "" },
          isCorrect: rawData?.correctAnswer === "B",
        },
        {
          value: { text: rawData?.C, image: "" },
          isCorrect: rawData?.correctAnswer === "C",
        },
        {
          value: { text: rawData?.D, image: "" },
          isCorrect: rawData?.correctAnswer === "D",
        },
      ],
      information: { text: rawData?.information },
      isHidden: rawData?.isHidden === "yes",
      sources: rawData?.sources,
      tags: rawData?.tags,
      remarks: rawData?.remarks,
      status: rawData?.status,
    };
    sendUpdate({
      id: rawData?._id,
      data: formattedData,
    });
  };

  const handleUpload = useCallback(() => {
    sendSimpleUpdate({
      id: initialValues?._id,
      data: { status: "live" },
    });
  }, [initialValues?._id, sendSimpleUpdate]);

  const handleDelete = useCallback(() => {
    sendSimpleUpdate({
      id: initialValues?._id,
      data: { status: "deleted" },
    });
  }, [initialValues?._id, sendSimpleUpdate]);

  const { handleOpen: handleConfirmDelete, renderConfirmActionDialog } =
    useConfirmActionDialog(
      "Delete this Question?",
      <DeleteDialogContent
        data={{
          code: initialValues?.code,
          question: initialValues?.question,
          A: `${initialValues?.choices?.[0]?.value?.text}${
            initialValues?.choices?.[0]?.isCorrect ? " ✅" : ""
          }`,
          B: `${initialValues?.choices?.[1]?.value?.text}${
            initialValues?.choices?.[1]?.isCorrect ? " ✅" : ""
          }`,
          C: `${initialValues?.choices?.[2]?.value?.text}${
            initialValues?.choices?.[2]?.isCorrect ? " ✅" : ""
          }`,
          D: `${initialValues?.choices?.[3]?.value?.text}${
            initialValues?.choices?.[3]?.isCorrect ? " ✅" : ""
          }`,
          information: initialValues?.information,

          "  ": "",
          status: initialValues?.status,
          isHidden: initialValues?.isHidden ? "yes" : "no",
          " ": "",
          remarks: initialValues?.remarks,
        }}
      />,
      handleDelete
    );

  const renderFormActions = () => (
    <FormActions
      selected={initialValues?._id}
      status={initialValues?.status}
      handleUpload={handleUpload}
      handleConfirmDelete={handleConfirmDelete}
      handleUndo={handleUndo}
      handleFormDataSubmit={handleFormDataSubmit}
      isDirty={isDirty}
      errors={errors}
    />
  );

  const getFormattedQData = (data) => {
    const formatted = data?.map((qd) => ({
      _id: qd._id,
      QUESTION: qd.question?.text,
      A: qd.choices?.[0]?.value?.text,
      B: qd.choices?.[1]?.value?.text,
      C: qd.choices?.[2]?.value?.text,
      D: qd.choices?.[3]?.value?.text,
      CORRECT_ANS: getLetterOfCorrectAnswer(qd.choices),
      CODE: qd.code,
      ACCESS: qd.access,
      DIFFICULTY: qd.difficulty,
      TOPICS: qd.topics?.map((t) => t.title),
      INFORMATION: qd.information?.text,
      SOURCES: qd.sources,
      IS_HIDDEN: qd.isHidden,
      TAGS: qd.tags,
      REMARKS: qd.remarks,
      STATUS: qd.status,
    }));
    return formatted;
  };

  console.log(questionsList?.data);
  const getHeaderData = (data) => {
    const headers = Object.keys(data).filter((key) => key !== "_id");
    return headers;
  };
  return (
    <>
      <FormWrapper formMethods={formMethods}>
        <Container
          component="main"
          maxWidth="xl"
          sx={styles.tabContainer}
          disableGutters
        >
          <form noValidate>
            <Stack direction="row" spacing={1}>
              <Box width="100%" pt={0.4}>
                <AutocompleteSelector
                  value={fetchValues}
                  setValue={setFetchValues}
                  options={questionsList?.data}
                  label="question"
                />
              </Box>
              {renderFormActions()}
            </Stack>
            {initialValues?._id && <br />}
            {initialValues?._id && (
              <Stack direction="row" spacing={1.5}>
                <Stack flex={1}>
                  <QuestionDetailsSection />
                </Stack>
                <Stack spacing={1.5} justifyContent="flex-start" width="180px">
                  <ACSandDOS values={initialValues} />
                </Stack>
              </Stack>
            )}
            {initialValues?._id && <br />}
            {/* <DevTool control={control} /> */}
            {initialValues?._id && renderFormActions()}

            <DevTool control={control} />
          </form>
          {initialValues?._id && <br />}
          {initialValues?._id && <Divider />}
          <br />
          {questionsList?.data?.[0] && (
            <ElevatedSectionWrapper>
              <Stack direction="row" alignItems="center">
                <Typography
                  textTransform={"uppercase"}
                  color="primary"
                  // fontWeight="bold"
                >
                  List of
                </Typography>
                <FormControl
                  // variant="filled"
                  sx={{ m: 1, minWidth: "100px" }}
                  size="small"
                >
                  <Select
                    labelId="status-selector"
                    id="status-selector"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    sx={{
                      color: teal[700],
                      fontWeight: "bold",
                    }}
                  >
                    <MenuItem value="all">
                      <em>ALL</em>
                    </MenuItem>
                    <MenuItem value="pending">
                      <em>PENDING</em>
                    </MenuItem>
                    <MenuItem value="live">
                      <em>LIVE</em>
                    </MenuItem>
                    <MenuItem value="deleted">
                      <em>DELETED</em>
                    </MenuItem>
                  </Select>
                </FormControl>
                <Typography
                  textTransform={"uppercase"}
                  color="primary"
                  // fontWeight="bold"
                >
                  Questions
                </Typography>
              </Stack>
              <GTable
                tableData={
                  status === "all"
                    ? getFormattedQData(questionsList?.data)
                    : getFormattedQData(
                        questionsList?.data?.filter((q) => q.status === status)
                      )
                }
                headerData={getHeaderData(
                  getFormattedQData(questionsList?.data)?.[0]
                )}
                setFetchValues={setFetchValues}
              />
            </ElevatedSectionWrapper>
          )}
        </Container>
      </FormWrapper>
      {renderConfirmActionDialog(initialValues || [])}
    </>
  );
};

export default ManageQuestionTab;
