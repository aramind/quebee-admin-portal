import React from "react";
import FormActionsContainer from "../../containers/FormActionsContainer";
import FormActionButton from "../../components/form/FormActionButton";

const FormActionsSection = ({ handleSubmit, handleClear }) => {
  return (
    <>
      <FormActionsContainer justify={{ sm: "flex-end", xs: "center" }}>
        <FormActionButton
          label="clear"
          onClickHandler={handleClear}
          variant="outlined"
        />
        <FormActionButton
          type="submit"
          label="save"
          variant="contained"
          onClickHandler={handleSubmit}
        />
      </FormActionsContainer>
    </>
  );
};

export default FormActionsSection;
