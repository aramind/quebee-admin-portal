import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";

import FormActionsContainer from "../../containers/FormActionsContainer";
import FormActionButton from "../../components/form/FormActionButton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import userSchema from "../../schemas/user";

import useApiSend from "../../hooks/api/useApiSend";
import useUserReq from "../../hooks/api/useUserReq";
import { DevTool } from "@hookform/devtools";
import UserInfoSection from "../../components/form/form-sections/UserInfoSection";
import constants from "../../configs/constants";
import FormWrapper from "../../wrappers/FormWrapper";

const initialValues = {
  role: constants.ROLES?.[0], // Initial value for role select
  status: constants.STATUS?.[0], // Initial value for status select
  password: constants.DEFAULT_PASSWORD,
  employeeId: "",
  lastName: "",
  firstName: "",
  middleName: "",
  email: "",
  username: "",
};

const AddNewUserForm = () => {
  const { register } = useUserReq();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(userSchema),
    mode: "onTouched",
    defaultValues: initialValues,
  });

  const handleClear = () => {
    reset(initialValues);
  };

  const { mutate: registerUser } = useApiSend(register, ["users"], () =>
    reset(initialValues)
  );

  const formMethods = { handleSubmit, reset, control, errors };

  const handleFormDataSubmit = async (rawData) => {
    registerUser(rawData);
  };

  return (
    <>
      <FormWrapper formMethods={formMethods}>
        <form onSubmit={handleSubmit(handleFormDataSubmit)} noValidate>
          <ElevatedSectionWrapper>
            <UserInfoSection title="Add New User" />
            <br />
            <FormActionsContainer justify="flex-end">
              <FormActionButton
                label="clear"
                onClickHandler={handleClear}
                variant="outlined"
                disabled={!isDirty}
              />
              <FormActionButton
                label="save"
                variant="contained"
                type="submit"
                disabled={Object.keys(errors).length !== 0 || !isDirty}
              />
            </FormActionsContainer>
          </ElevatedSectionWrapper>
        </form>
        <DevTool control={control} />
      </FormWrapper>
    </>
  );
};

export default AddNewUserForm;
