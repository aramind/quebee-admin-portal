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
import TopicInfoSection from "./TopicInfoSection";
import useTopicReq from "../../hooks/api/useTopicReq";
import useApiSend from "../../hooks/api/useApiSend";
import useFormSubmit from "../../hooks/useFormSubmit";
import FormWrapper from "../../wrappers/FormWrapper";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import topicSchema from "../../schemas/topic";

const setIsDisabled = (errors, dirtyFields) => {
  if (!dirtyFields?.code || !dirtyFields?.title) return true;
  if (Object.keys(errors).length !== 0) return true;
  return false;
};
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

  const { mutate: addTopic } = useApiSend(
    add,
    (data) => console.log(data?.message),
    (err) => console.log(err),
    ["topics"]
  );

  const {
    handleSubmit,
    control,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(topicSchema),
  });

  const formMethods = { control, errors, dirtyFields };

  const handleClose = (e) => {
    e.stopPropagation();
  };

  const handleFormDataSubmit = async (data) => {
    addTopic({ data: data });
  };

  const handleFormSubmit = useFormSubmit(handleFormDataSubmit);

  console.log(dirtyFields);
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
                disabled={setIsDisabled(errors, dirtyFields)}
                onClickHandler={() => {
                  handleSubmit(handleFormSubmit)();
                  // setOpen(false);
                  if (Object.keys(errors).length === 0) {
                    onClose();
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

export default AddTopicDialog;
