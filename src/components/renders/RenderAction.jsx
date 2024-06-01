import React, { useCallback, useState } from "react";
import useStyles from "../../hooks/useStyles";
import { IconButton } from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import ConfirmActionDialog from "../ConfirmActionDialog";
import DeleteUserDialogContent from "../../pages/manage-user-page/DeleteUserDialogContent";
import useUserReq from "../../hooks/api/useUserReq";
import useApiSend from "../../hooks/api/useApiSend";
import EditUserModal from "../../pages/manage-user-page/EditUserModal";

const RenderAction = React.memo(({ row }) => {
  const [openDialogEditUser, setOpenDialogEditUser] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const styles = useStyles();
  const { deleteById } = useUserReq();

  const { mutate: deleteUser } = useApiSend(deleteById, ["users"]);

  const handleDeleteUser = useCallback(() => {
    deleteUser(row?.id);
  }, [deleteUser, row?.id]);

  const handleEditUser = useCallback(() => {
    setOpenDialogEditUser(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    setOpenConfirmDelete(true);
  }, []);

  return (
    <>
      <IconButton
        aria-label="edit"
        sx={styles.iconButton}
        onClick={handleEditUser}
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
      <EditUserModal
        open={openDialogEditUser}
        setOpen={setOpenDialogEditUser}
        title="Edit User Information"
        row={row}
      />
      <ConfirmActionDialog
        open={openConfirmDelete}
        setOpen={setOpenConfirmDelete}
        title="Delete this user?"
        content={<DeleteUserDialogContent userDetails={row} />}
        handleConfirm={handleDeleteUser}
        row={row}
      />
    </>
  );
});

export default RenderAction;
