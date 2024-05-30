import React from "react";
import useStyles from "../../hooks/useStyles";
import { useForm } from "react-hook-form";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import Draggable from "react-draggable";
import { grey, red } from "@mui/material/colors";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import DialogActionsContainer from "../../containers/DialogActionsContainer";
import DialogActionButton from "../../components/form/DialogActionButton";
import TopicInfoSection from "./TopicInfoSection";
import useTopicReq from "../../hooks/api/useTopicReq";
import useApiSend from "../../hooks/api/useApiSend";
// import useFormSubmit from "../../hooks/useFormSubmit";
import FormWrapper from "../../wrappers/FormWrapper";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import topicSchema from "../../schemas/topic";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";

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

const AddTopicDialog = ({ open, onClose, title = "", data }) => {
  const styles = useStyles();

  const { add } = useTopicReq();

  const { mutate: addTopic } = useApiSend(add, ["topics"]);

  const {
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(topicSchema),
  });

  const formMethods = { control, errors, dirtyFields };

  const handleClose = (e) => {
    e.stopPropagation();
  };

  const handleFormDataSubmit = async (data) => {
    addTopic({ data: data });
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
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              {title}
              <IconButton onClick={() => onClose()}>
                <CloseTwoToneIcon />
              </IconButton>
            </Stack>
          </DialogTitle>
          <DialogContent>
            {/* <SnackbarComponent /> */}
            <form onSubmit={handleSubmit(handleFormDataSubmit)} noValidate>
              <Box>
                <ElevatedSectionWrapper>
                  <TopicInfoSection />
                </ElevatedSectionWrapper>
              </Box>
              <DevTool control={control} />
            </form>
          </DialogContent>
          <DialogActions>
            <DialogActionsContainer>
              <DialogActionButton label="cancel" onClickHandler={onClose} />
              <DialogActionButton
                label="save"
                disabled={
                  Object.keys(errors).length !== 0 ||
                  !dirtyFields?.code ||
                  !dirtyFields?.title
                }
                onClickHandler={() => {
                  handleSubmit(handleFormDataSubmit)();
                }}
              />
            </DialogActionsContainer>
          </DialogActions>
        </Dialog>
      </FormWrapper>
    </>
  );
};

export default AddTopicDialog;
