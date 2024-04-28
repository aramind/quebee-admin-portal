import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import Draggable from "react-draggable";
import useStyles from "../../hooks/useStyles";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import DialogActionButton from "../../components/form/DialogActionButton";

import { DevTool } from "@hookform/devtools";
import FormContentsSection from "../add-question-page/FormContentsSection";
import { zodResolver } from "@hookform/resolvers/zod";
import questionSchema from "../../schemas/question";
import { useForm } from "react-hook-form";
import constants from "../../components/configs/constants";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} sx={{ bgcolor: grey[100], width: "100%" }} />
    </Draggable>
  );
}

const EditQuestionModal = ({ open, setOpen, title = "" }) => {
  const styles = useStyles();

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

  const handleClose = (e) => {
    e.stopPropagation();
  };

  const handleSave = (data) => {
    console.log("clicked saved");
  };

  // form related
  const defaultValues = {
    code: "default code",
    database: constants.DATABASES[0],
    courses: ["default course1", "default course2"],
    subjects: ["default subject1", "default subject2"],
    tags: ["default tag1", "default tag2"],
    difficulty: 1,
    type: "default type",
    nature: "default nature",
    access: "basic",
    question: "default question",
    A: "default A",
    B: "default B",
    C: "default C",
    D: "default D",

    correctAnswer: "default A",
    information: "default information",
    remarks: "default remarks",
  };

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
  // form related
  const { handleSubmit, control, watch, getValue, register } = useForm({
    resolver: zodResolver(questionSchema),
    mode: "onTouched",
    defaultValues: defaultValues,
  });

  const onSubmit = (data) => {
    const formattedData = formatData(data);
    console.log(formattedData);
  };

  const onError = (err) => {
    console.log("Error submitting question", err);
  };
  return (
    <>
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
                  <>
                    <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
                      <FormContentsSection
                        register={register}
                        control={control}
                        getValue={getValue}
                        watch={watch}
                        defaultValues={defaultValues}
                      />

                      <br />
                    </form>
                    <DevTool control={control} />
                  </>
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
          <DialogActionButton
            label="save"
            onClickHandler={() => {
              handleSave();
              setOpen(false);
            }}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditQuestionModal;
