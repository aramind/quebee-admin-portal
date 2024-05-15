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
import Draggable from "react-draggable";
import { grey } from "@mui/material/colors";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import DialogActionsContainer from "../../containers/DialogActionsContainer";
import DialogActionButton from "../../components/form/DialogActionButton";
import TopicInfoSection from "../course/TopicInfoSection";
import useTopicReq from "../../hooks/api/useTopicReq";
import useApiSend from "../../hooks/api/useApiSend";

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

const AddTopicDialog = ({ open, setOpen, title = "", data }) => {
  const styles = useStyles();

  const { add } = useTopicReq();

  const { mutate: addTopic } = useApiSend(
    add,
    (data) => console.log(data?.message),
    (err) => console.log(err),
    ["topics"]
  );

  const { handleSubmit, control } = useForm({
    mode: "onTouched",
  });

  const handleClose = (e) => {
    e.stopPropagation();
  };

  const onSubmit = async (data) => {
    console.log(data);
    alert("SUBMITTED");
    addTopic({ data: data });
  };

  const onError = (err) => {
    alert("Encountered an error. Try again.");
  };

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
                <TopicInfoSection control={control} />
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
    </>
  );
};

export default AddTopicDialog;
