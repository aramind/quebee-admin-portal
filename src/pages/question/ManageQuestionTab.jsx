import React, { useEffect, useState } from "react";
import ManageQuestionPage from "../manage-question-page/ManageQuestionPage";
import useQuestionReq from "../../hooks/api/useQuestionReq";
import useApiGet from "../../hooks/api/useApiGet";
import { useForm } from "react-hook-form";
import FormWrapper from "../../wrappers/FormWrapper";
import { Container, Stack } from "@mui/material";
import useStyles from "../../hooks/useStyles";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import AutocompleteSelector from "../../components/AutocompleteSelector";
import useFormSubmit from "../../hooks/useFormSubmit";
import { grey } from "@mui/material/colors";
import ACSandDOS from "../course/ACSandDOS";
import FormActionsContainer from "../../containers/FormActionsContainer";
import FormActionButton from "../../components/form/FormActionButton";
import { DevTool } from "@hookform/devtools";
import QuestionDetails from "./QuestionDetails";

const ManageQuestionTab = () => {
  const { get } = useQuestionReq();
  const [initialValues, setInitialValues] = useState({});
  const [value, setValue] = useState(null);
  const styles = useStyles();

  const { data: questionsList } = useApiGet(
    "questions",
    () => get("/trimmed"),
    {
      retry: 3,
    }
  );

  const { control, handleSubmit, reset } = useForm({
    mode: "onTouched",
    defaultValues: initialValues,
  });

  const formMethods = { control, handleSubmit, reset };

  useEffect(() => {
    setInitialValues({
      ...value,
    });
  }, [value]);

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const handleUndo = () => {
    console.log("CLICKED UNDO");
  };

  console.log(questionsList);
  const handleFormDataSubmit = async (rawData) => {
    alert("CLICKED SUBMIT with", rawData);
  };

  const handleFormSubmit = useFormSubmit(handleFormDataSubmit);
  return (
    <FormWrapper formMethods={formMethods}>
      <Container
        component="main"
        maxWidth="xl"
        sx={styles.tabContainer}
        disableGutters
      >
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <ElevatedSectionWrapper bgcolor={grey[200]} px="30%" py="8px">
            <AutocompleteSelector
              value={value}
              setValue={setValue}
              options={questionsList}
              label="courses"
            />
          </ElevatedSectionWrapper>
          <br />
          <Stack direction="row" spacing={1.5}>
            <Stack flex={1}>
              <QuestionDetails />
            </Stack>
            <Stack spacing={1.5} justifyContent="flex-start" width="180px">
              <ACSandDOS
                // control={control}
                values={initialValues}
              />
            </Stack>
          </Stack>

          <br />

          {/* <DevTool control={control} /> */}
          <FormActionsContainer justify={{ sm: "flex-end", xs: "center" }}>
            <FormActionButton
              label="undo changes"
              onClickHandler={handleUndo}
              variant="outlined"
            />
            <FormActionButton
              type="submit"
              label="save changes"
              variant="contained"
            />
          </FormActionsContainer>
          <DevTool control={control} />
        </form>
      </Container>
    </FormWrapper>
  );
};

export default ManageQuestionTab;
