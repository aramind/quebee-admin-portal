import React from "react";
import FormActionsContainer from "../../containers/FormActionsContainer";
import FormActionButton from "../../components/form/FormActionButton";

const FormActions = ({
  selected,
  status,
  handleUpload,
  handleConfirmDelete,
  handleUndo,
  handleFormDataSubmit,
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
        disabled={!selected || status === "deleted"}
      />
      <FormActionButton
        label="undo"
        onClickHandler={handleUndo}
        variant="outlined"
        disabled={!selected || !isDirty}
      />
      <FormActionButton
        label="save"
        onClickHandler={handleFormDataSubmit}
        variant="contained"
        disabled={!selected || !isDirty || Object.keys(errors).length !== 0}
      />
    </FormActionsContainer>
  );
};

export default FormActions;
