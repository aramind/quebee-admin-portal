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
import SubjectInfoSection from "./SubjectInfoSection";
import AddTopicDialog from "./AddTopicDialog";
import useTopicReq from "../../hooks/api/useTopicReq";
import { useLocation, useNavigate } from "react-router-dom";
import useApiGet from "../../hooks/api/useApiGet";
import LoadingPage from "../LoadingPage";
import RequestErrorPage from "../RequestErrorPage";
import useApiSend from "../../hooks/api/useApiSend";
import useSubjReq from "../../hooks/api/useSubReq";

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
  const { add } = useSubjReq();

  const { mutate: addSubject } = useApiSend(
    add,
    (data) => console.log("Success", data),
    (err) => console.log("Error", err),
    ["subjects"]
  );

  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: fetchedTopics,
    onLoading,
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
    console.log(data);
    const selectedTopics = data?.topics?.map((topic) => topic?.title);
    console.log({ ...data, topics: selectedTopics });
    addSubject({ data: { ...data, topics: selectedTopics } });
    alert("SUBMITTED");
  };

  const onError = (err) => {
    alert("Encountered an error. Try again.");
  };

  if (onLoading) {
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
