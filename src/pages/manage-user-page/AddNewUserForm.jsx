import React, { useState } from "react";
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

const initialValues = {
  role: constants.ROLES?.[0], // Initial value for role select
  status: constants.STATUS?.[0], // Initial value for status select
  password: constants.DEFAULT_PASSWORD,
};

const AddNewUserForm = ({ successFn }) => {
  const { register } = useUserReq();
  const [forceRender, setForceRender] = useState(false);

  const { mutate: registerUser } = useApiSend(
    register,
    () => {
      successFn();
      alert("New User added successfully");
    },
    (err) => {
      console.log(err);
      alert("Encountered an error adding the new user. Try again later", err);
    },
    ["users"],
    {}
  );
  //   form
  const { handleSubmit, reset, control } = useForm({
    resolver: zodResolver(userSchema),
    mode: "onTouched",
    defaultValues: initialValues,
  });

  const onSubmit = async (data) => {
    registerUser(data);
  };

  // handlers
  // todo
  const handleClear = () => {
    reset();
    setForceRender((prevState) => !prevState);
    return forceRender;
  };

  const onError = (error) => {
    console.log("Error submitting form", error);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <ElevatedSectionWrapper>
          <UserInfoSection control={control} title="Add New User" />
          <br />
          <FormActionsContainer justify="flex-end">
            <FormActionButton
              label="clear"
              onClickHandler={handleClear}
              variant="outlined"
            />
            <FormActionButton label="save" variant="contained" type="submit" />
          </FormActionsContainer>
        </ElevatedSectionWrapper>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default AddNewUserForm;
