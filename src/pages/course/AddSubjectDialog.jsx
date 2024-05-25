import React, { useState } from "react";
import useStyles from "../../hooks/useStyles";
import { useForm } from "react-hook-form";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
} from "@mui/material";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";

import Draggable from "react-draggable";
import { grey } from "@mui/material/colors";
import DialogActionsContainer from "../../containers/DialogActionsContainer";
import DialogActionButton from "../../components/form/DialogActionButton";

import useApiSend from "../../hooks/api/useApiSend";
import useSubjReq from "../../hooks/api/useSubReq";
import SubjectInfoSection from "./SubjectInfoSection";
import useFormSubmit from "../../hooks/useFormSubmit";
import FormWrapper from "../../wrappers/FormWrapper";
import { DevTool } from "@hookform/devtools";

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

const AddSubjectDialog = ({ open, setOpen, title = "", data }) => {
  const styles = useStyles();
  const { addSubject } = useSubjReq();

  const { mutate: handleAddSubject } = useApiSend(
    addSubject,
    (data) => console.log("Success", data),
    (err) => console.log("Error", err),
    ["subjects"]
  );

  const { handleSubmit, control, setValue } = useForm({
    mode: "onTouched",
  });

  const formMethods = { handleSubmit, control, setValue };
  const handleClose = (e) => {
    e.stopPropagation();
  };

  const handleFormDataSubmit = async (data) => {
    const selectedTopics = data?.topics?.map((topic) => topic?.title);
    console.log({ ...data, topics: selectedTopics });
    const finalData = { ...data, topics: selectedTopics };
    console.log(finalData);
    handleAddSubject({ data: finalData });
    alert("SUBMITTED");
  };

  const handleFormSubmit = useFormSubmit(handleFormDataSubmit);

  return (
    <>
      <FormWrapper formMethods={formMethods}>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle sx={styles.dialog.title} id="draggable-dialog-title">
            {title}
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
              <Box>
                <ElevatedSectionWrapper>
                  <SubjectInfoSection />
                </ElevatedSectionWrapper>
              </Box>
            </form>
          </DialogContent>
          <DialogActions>
            <DialogActionsContainer>
              <DialogActionButton
                label="cancel"
                onClickHandler={() => setOpen(false)}
              />
              <DialogActionButton
                label="save"
                onClickHandler={() => {
                  handleSubmit(handleFormSubmit)();
                  setOpen(false);
                }}
              />
            </DialogActionsContainer>
          </DialogActions>
        </Dialog>
      </FormWrapper>
    </>
  );
};

export default AddSubjectDialog;
