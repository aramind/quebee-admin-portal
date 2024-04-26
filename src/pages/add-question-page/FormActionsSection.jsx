import React from "react";
import FormActionsContainer from "../../containers/FormActionsContainer";
import FormActionButton from "../../components/form/FormActionButton";

const FormActionsSection = ({ handleClear, handleUpload }) => {
  return (
    <>
      <FormActionsContainer justify={{ sm: "flex-end", xs: "center" }}>
        <FormActionButton
          label="clear"
          onClickHandler={handleClear}
          variant="outlined"
        />
        {/* <FormActionButton
          label="upload"
          onClickHandler={handleUpload}
          variant="outlined"
        /> */}
        <FormActionButton type="submit" label="save" variant="contained" />
      </FormActionsContainer>
    </>
  );
};

export default FormActionsSection;
