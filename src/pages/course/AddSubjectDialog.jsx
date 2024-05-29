import React from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import subjectSchema from "../../schemas/subject";
import useAcknowledgeSnackbar from "../../hooks/useAcknowledgeSnackbar";
import { useGlobalState } from "../../context/GlobalStatesContextProvider";
import { showAckNotification } from "../../utils/showAckNotification";
import ContMultiSelectToTable from "../../components/form-controlled/ContMultiSelectToTable";

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
  const {
    globalState: { ackAlert },
    dispatch,
  } = useGlobalState();

  const { mutate: handleAddSubject } = useApiSend(
    addSubject,
    (data) => showAckNotification({ dispatch, success: true, data, ackAlert }),
    (err) =>
      showAckNotification({ dispatch, success: false, data: err, ackAlert }),
    ["subjects"]
  );

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(subjectSchema),
  });

  const formMethods = { handleSubmit, control, setValue, errors, dirtyFields };

  const handleClose = (e) => {
    e.stopPropagation();
  };

  const handleFormDataSubmit = async (data) => {
    console.log("DATA", data);
    const finalData = {
      ...data,
      topics: data?.topics?.map((topic) => topic?._id),
    };
    console.log(finalData);
    handleAddSubject({ data: finalData });
  };

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
            <form onSubmit={handleSubmit(handleFormDataSubmit)} noValidate>
              <Box>
                <ElevatedSectionWrapper>
                  <SubjectInfoSection />
                </ElevatedSectionWrapper>
              </Box>
              <DevTool control={control} />
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
                disabled={
                  Object.keys(errors).length !== 0 ||
                  !dirtyFields?.code ||
                  !dirtyFields?.title
                }
                onClickHandler={() => {
                  handleSubmit(handleFormDataSubmit)();
                  if (Object.keys(errors).length === 0) {
                    setOpen(false);
                  }
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
