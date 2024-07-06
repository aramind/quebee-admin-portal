import React, { useCallback, useState } from "react";
import ConfirmActionDialog from "../components/ConfirmActionDialog";
import DeleteDialogContent from "../components/dialog/DeleteDialogContent";

const useConfirmActionDialog = (title, content, confirmCallback) => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleConfirm = useCallback(() => {
    confirmCallback();
    setOpen(false);
  }, [confirmCallback]);

  const renderConfirmActionDialog = useCallback(
    (selected) => (
      <ConfirmActionDialog
        open={open}
        setOpen={setOpen}
        title={title}
        // content={<DeleteDialogContent data={content} />}
        content={content}
        handleConfirm={handleConfirm}
      />
    ),
    [content, handleConfirm, open, title]
  );
  return { handleOpen, handleClose, renderConfirmActionDialog };
};

export default useConfirmActionDialog;
