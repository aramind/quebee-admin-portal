import React from "react";
import FormActionsContainer from "../../containers/FormActionsContainer";
import FormActionButton from "../../components/form/FormActionButton";

const FormActions = ({
  selected,
  status,
  handleUpload,
  handleConfirmDelete,
  handleUndo,
  isDirty,
  errors,
}) => {
  return (
    <FormActionsContainer justify={{ sm: "flex-end", xs: "center" }}>
      <FormActionButton
        label="upload"
        onClickHandler={handleUpload}
        variant="outlined"
        disabled={!selected || status === "live"}
      />
      <FormActionButton
        label="delete"
        onClickHandler={handleConfirmDelete}
        variant="outlined"
        disabled={!selected}
      />
      <FormActionButton
        label="undo"
        onClickHandler={handleUndo}
        variant="outlined"
        disabled={!selected || !isDirty}
      />
      <FormActionButton
        type="submit"
        label="save"
        variant="contained"
        disabled={!selected || !isDirty || Object.keys(errors).length !== 0}
      />
    </FormActionsContainer>
  );
};

export default FormActions;
