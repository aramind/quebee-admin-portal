import { IconButton, Stack } from "@mui/material";
import React from "react";
import useStyles from "../../hooks/useStyles";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";
import QuestionDetailsSection from "../../pages/question/QuestionDetailsSection";
import ACSandDOS from "../../pages/course/ACSandDOS";
import DeleteDialogContent from "../dialog/DeleteDialogContent";

const setDeleteContent = (row) => {
  const { _id, IS_HIDDEN, id, ...questionDetails } = row;
  return <DeleteDialogContent data={questionDetails} />;
};

const setEditContent = (id) => {
  console.log("setting content");
  return (
    <Stack direction="row" spacing={1.5}>
      <Stack flex={1}>
        <QuestionDetailsSection />
      </Stack>
      {/* <Stack spacing={1.5} justifyContent="flex-start" width="180px">
          <ACSandDOS values={initialValues} />
        </Stack> */}
    </Stack>
  );
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
      setDeleteContent(row),
      handleDelete
    );

  const {
    handleOpen: showEditDialog,
    renderConfirmActionDialog: renderEditDialog,
  } = useConfirmActionDialog(
    "Editing Question Information",
    setEditContent(row?._id),
    handleEdit
  );
  console.log(row);
  return (
    <>
      <IconButton
        aria-label="edit"
        sx={styles.iconButton}
        onClick={showEditDialog}
      >
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
      {renderEditDialog(row)}
    </>
  );
};

export default RenderQuestionActions;
