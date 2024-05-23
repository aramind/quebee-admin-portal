import React, { useCallback, useState } from "react";

const useDialog = (DialogComponent) => {
  const [open, setOpen] = useState(false);
  const [dialogProps, setDialogProps] = useState({});

  const handleOpen = useCallback((props = {}) => {
    setDialogProps(props);
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setDialogProps({});
  }, []);

  const renderDialog = useCallback(
    () => (
      <DialogComponent open={open} onClose={handleClose} {...dialogProps} />
    ),
    [open, handleClose, dialogProps]
  );

  return {
    open,
    handleOpen,
    handleClose,
    renderDialog,
  };
};

export default useDialog;
