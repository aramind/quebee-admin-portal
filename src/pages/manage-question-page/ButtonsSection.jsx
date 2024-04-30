import React from "react";
import FormActionsContainer from "../../containers/FormActionsContainer";
import FormActionButton from "../../components/form/FormActionButton";

const ButtonsSection = ({
  currentQuestion,
  handlePrevious,
  handleDelete,
  handleEdit,
  handleUpload,
  handleNext,
}) => {
  return (
    <FormActionsContainer justify={{ sm: "center", xs: "center" }} sticky>
      <FormActionButton
        label="previous"
        onClickHandler={handlePrevious}
        variant="outlined"
      />
      <FormActionButton
        label="delete question"
        onClickHandler={handleDelete}
        variant="contained"
        disabled={currentQuestion?.status === "deleted"}
      />
      <FormActionButton
        label="edit question"
        onClickHandler={handleEdit}
        variant="contained"
      />
      <FormActionButton
        label="upload question"
        onClickHandler={handleUpload}
        variant="contained"
        disabled={currentQuestion?.status === "approved"}
      />
      <FormActionButton
        label="next"
        onClickHandler={handleNext}
        variant="outlined"
      />
    </FormActionsContainer>
  );
};

export default ButtonsSection;
