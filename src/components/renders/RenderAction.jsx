import React, { useState } from "react";
import useStyles from "../../hooks/useStyles";
import { IconButton } from "@mui/material";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import DraggableFormDialog from "../form/DraggableFormDialog";
import { useDeleteUserByEmpId } from "../../hooks/useUserHook";
import ConfirmActionDialog from "../ConfirmActionDialog";
import DeleteUserDialogContent from "../../pages/manage-user-page/DeleteUserDialogContent";

const RenderAction = ({ row }) => {
  const [openDialogEditUser, setOpenDialogEditUser] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const styles = useStyles();

  const { mutate: deleteUser, isLoading } = useDeleteUserByEmpId();

  const handleDeleteUser = (employeeId) => {
    console.log("deleting user with ", employeeId);
    deleteUser(employeeId);
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
        // onClick={() => handleDeleteUser(row.employeeId)}
        onClick={() => setOpenConfirmDelete(true)}
      >
        <DeleteTwoToneIcon />
      </IconButton>
      <DraggableFormDialog
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
      {/* <DraggableDialog
        open={openDialogEditUser}
        setOpen={setOpenDialogEditUser}
        title="Edit User Information"
        row={row}
      /> */}
    </>
  );
};

export default RenderAction;
