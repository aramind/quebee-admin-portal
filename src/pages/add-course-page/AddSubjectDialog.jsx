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
import AddTopicDialog from "./AddTopicDialog";
import useTopicReq from "../../hooks/api/useTopicReq";

import useApiGet from "../../hooks/api/useApiGet";
import LoadingPage from "../LoadingPage";

import useApiSend from "../../hooks/api/useApiSend";
import useSubjReq from "../../hooks/api/useSubReq";
import useErrorHandlerUnAuthReq from "../../hooks/api/useErrorHandlerUnAuthReq";
import SubjectInfoSection from "../course/SubjectInfoSection";

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
  const [openAddTopic, setOpenAddTopic] = useState(false);
  const styles = useStyles();
  const { fetchTopics } = useTopicReq();
  const { addSubject } = useSubjReq();
  const handleUnAuthError = useErrorHandlerUnAuthReq();

  const { mutate: handleAddSubject } = useApiSend(
    addSubject,
    (data) => console.log("Success", data),
    (err) => console.log("Error", err),
    ["subjects"]
  );

  const {
    data: fetchedTopics,
    isLoading,
    error,
  } = useApiGet(
    "topics",
    () => fetchTopics({ params: "/trimmed?fields=code,title,acronym" }),
    {
      refetchOnWindowFocus: true,
      retry: 3,
    }
  );

  const { handleSubmit, control } = useForm({
    mode: "onTouched",
  });

  const handleClose = (e) => {
    e.stopPropagation();
  };

  const onSubmit = async (data) => {
    const selectedTopics = data?.topics?.map((topic) => topic?.title);
    console.log({ ...data, topics: selectedTopics });
    const finalData = { ...data, topics: selectedTopics };
    console.log(finalData);
    handleAddSubject({ data: finalData });
    alert("SUBMITTED");
  };

  const onError = (err) => {
    alert("Encountered an error. Try again.");
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    handleUnAuthError(error);
  }

  return (
    <>
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
          <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
            <Box>
              <ElevatedSectionWrapper>
                <SubjectInfoSection
                  control={control}
                  setOpenAddTopic={setOpenAddTopic}
                  options={fetchedTopics?.map((topic) => topic.title)}
                />
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
                handleSubmit(onSubmit, onError)();
                setOpen(false);
              }}
            />
          </DialogActionsContainer>
        </DialogActions>
      </Dialog>
      <AddTopicDialog
        open={openAddTopic}
        setOpen={setOpenAddTopic}
        title="Add New Topic"
      />
    </>
  );
};

export default AddSubjectDialog;
