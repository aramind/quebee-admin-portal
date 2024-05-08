import React, { useState } from "react";
import useStyles from "../../hooks/useStyles";
import { IconButton } from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import ConfirmActionDialog from "../ConfirmActionDialog";
import DeleteUserDialogContent from "../../pages/manage-user-page/DeleteUserDialogContent";
import useUserReq from "../../hooks/api/useUserReq";
import useApiSend from "../../hooks/api/useApiSend";
import EditUserModal from "../../pages/manage-user-page/EditUserModal";

const RenderAction = ({ row }) => {
  const [openDialogEditUser, setOpenDialogEditUser] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const styles = useStyles();
  const { deleteById } = useUserReq();

  const { mutate: deleteUser, isLoading } = useApiSend(
    deleteById,
    () => {
      alert("Successfully deleted user");
    },
    (err) => {
      alert("Encountered an error deleting user. Please try again later.", err);
    },
    ["users"],
    {}
  );

  const handleDeleteUser = (id) => {
    deleteUser(id);
  };

  return (
    <>
      <IconButton
        aria-label="edit"
        sx={styles.iconButton}
        onClick={() => setOpenDialogEditUser(true)}
      >
        <EditTwoToneIcon />
      </IconButton>

      <IconButton
        aria-label="delete"
        sx={styles.iconButton}
        disabled={isLoading}
        onClick={() => setOpenConfirmDelete(true)}
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
        handleConfirm={() => handleDeleteUser(row.employeeId)}
      />
    </>
  );
};

export default RenderAction;
