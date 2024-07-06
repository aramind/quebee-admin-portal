import { IconButton } from "@mui/material";
import React from "react";
import useStyles from "../../hooks/useStyles";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";
import DeleteDialogContent from "../dialog/DeleteDialogContent";

import useQuestionReq from "../../hooks/api/useQuestionReq";

const setDeleteContent = (row) => {
  const { _id, IS_HIDDEN, id, ...questionDetails } = row;
  return <DeleteDialogContent data={questionDetails} />;
};

const RenderQuestionActions = ({ row, setFetchValues }) => {
  const styles = useStyles();
  const { getById } = useQuestionReq();

  const handleEdit = async () => {
    try {
      const question = await getById({ id: row?._id });
      setFetchValues(question?.data);
      // Scroll to the top of the screen
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = () => {
    alert(row?._id);
  };
  const { handleOpen: handleConfirmDelete, renderConfirmActionDialog } =
    useConfirmActionDialog(
      "Delete this Question?",
      setDeleteContent(row),
      handleDelete
    );

  return (
    <>
      <IconButton aria-label="edit" sx={styles.iconButton} onClick={handleEdit}>
        <EditTwoToneIcon />
      </IconButton>

      <IconButton
        aria-label="delete"
        sx={styles.iconButton}
        onClick={handleConfirmDelete}
      >
        <DeleteTwoToneIcon />
      </IconButton>
      {renderConfirmActionDialog(row)}
    </>
  );
};

export default RenderQuestionActions;
