import React, { useEffect, useState } from "react";
import useStyles from "../../hooks/useStyles";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
} from "@mui/material";
import Draggable from "react-draggable";
import { grey } from "@mui/material/colors";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import questionSchema from "../../schemas/question";
import { useForm } from "react-hook-form";
import FormContentsSection from "../add-question-page/FormContentsSection";
import DialogActionButton from "../../components/form/DialogActionButton";
import { DevTool } from "@hookform/devtools";
import { usePatchQuestion } from "../../hooks/usePatchQuestion";

const PaperComponent = (props) => {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} sx={{ bgcolor: grey[100], width: "100%" }} />
    </Draggable>
  );
};

const EditQuestionModal = ({
  open,
  setOpen,
  title = "",
  question,
  handleSaveEdit,
}) => {
  const styles = useStyles();
  const [defaultValues, setDefaultValues] = useState({});

  const { mutate: editQuestion } = usePatchQuestion();

  const BoxWrapper = ({ children }) => {
    return (
      <Box
        sx={{
          width: { xs: "100%", md: "100%" },
          flex: "1 1 auto",
        }}
      >
        {children}
      </Box>
    );
  };

  useEffect(() => {
    setDefaultValues({
      ...question,
      A: question?.choices[0]?.value,
      B: question?.choices[1]?.value,
      C: question?.choices[2]?.value,
      D: question?.choices[3]?.value,
      correctAnswer: question?.choices.find((choice) => choice.isCorrect)
        ?.value,
    });
  }, [question]);
  // form related

  const formatData = (originalData) => {
    const {
      code,
      database,
      courses,
      subjects,
      topics,
      tags,
      difficulty,
      type,
      nature,
      access,
      question,
      correctAnswer,
      information,
      remarks,
      ...choicesData
    } = originalData;

    const choices = Object.entries(choicesData).map(([key, value]) => ({
      value,
      isCorrect: key.toLowerCase() === correctAnswer.toLowerCase(),
    }));

    const formattedData = {
      code,
      database,
      courses,
      subjects,
      topics,
      tags,
      difficulty,
      type,
      nature,
      access,
      question,
      choices,
      information,
      remarks,
      creator: "6606cd49d6e168904285a93c",
    };

    // console.log(formattedData);
    return formattedData;
  };

  console.log(defaultValues);
  // form related
  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(questionSchema),
    mode: "onTouched",
    defaultValues: defaultValues,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const onSubmit = (data) => {
    alert("Clicked save edit");
    const formattedData = formatData(data);
    console.log(formattedData);
    handleSaveEdit(formattedData);
    // try {
    //   editQuestion({
    //     params: `${question?._id}`,
    //     patchData: formattedData,
    //   });
    // } catch (error) {
    //   console.error("Error updating question:", error);
    // }
  };

  const onError = (err) => {
    console.log("Error submitting question", err);
  };

  const handleClose = (e) => {
    e.stopPropagation();
  };

  const handleSave = () => {
    handleSubmit(onSubmit, onError)();
    setOpen(false);
  };

  return (
    <form noValidate>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        fullWidth
        maxWidth
      >
        <DialogTitle sx={styles.dialog.title} id="draggable-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <Box width="100%">
            <ElevatedSectionWrapper>
              <Stack
                sx={{
                  flexDirection: { xs: "column", md: "row" },
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <BoxWrapper>
                  <FormContentsSection
                    control={control}
                    defaultValues={defaultValues}
                  />
                </BoxWrapper>
              </Stack>
            </ElevatedSectionWrapper>
          </Box>
        </DialogContent>
        <DialogActions>
          <DialogActionButton
            label="cancel"
            onClickHandler={() => setOpen(false)}
          />
          <DialogActionButton label="save" onClickHandler={handleSave} />
        </DialogActions>
      </Dialog>
      <DevTool control={control} />
    </form>
  );
};

export default EditQuestionModal;
