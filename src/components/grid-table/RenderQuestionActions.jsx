import { IconButton } from "@mui/material";
import React from "react";
import useStyles from "../../hooks/useStyles";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";

const setContent = (row) => {
  const { _id, IS_HIDDEN, id, ...questionDetails } = row;
  return questionDetails;
};
const RenderQuestionActions = ({ row }) => {
  const styles = useStyles();

  const handleEdit = () => {
    alert(row?._id);
  };

  const handleDelete = () => {
    alert(row?._id);
  };
  const { handleOpen: handleConfirmDelete, renderConfirmActionDialog } =
    useConfirmActionDialog(
      "Delete this Question?",
      setContent(row),
      handleDelete
    );

  console.log(row);
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
      {/* <EditUserModal
        open={openDialogEditUser}
        setOpen={setOpenDialogEditUser}
        title="Edit User Information"
        row={row}
      /> */}
      {/* <ConfirmActionDialog
        open={openConfirmDelete}
        setOpen={setOpenConfirmDelete}
        title="Delete this user?"
        content={<DeleteUserDialogContent userDetails={row} />}
        handleConfirm={handleDeleteUser}
        row={row}
      /> */}
      {renderConfirmActionDialog(row)}
    </>
  );
};

export default RenderQuestionActions;
