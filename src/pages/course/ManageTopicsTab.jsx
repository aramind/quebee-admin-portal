import React, { useEffect, useState } from "react";
import useStyles from "../../hooks/useStyles";
import useTopicReq from "../../hooks/api/useTopicReq";
import useApiGet from "../../hooks/api/useApiGet";
import { useForm } from "react-hook-form";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import { grey } from "@mui/material/colors";
import { Container, Stack } from "@mui/material";
import { DevTool } from "@hookform/devtools";
import TopicInfoSection from "./TopicInfoSection";
import FormActionsContainer from "../../containers/FormActionsContainer";
import FormActionButton from "../../components/form/FormActionButton";
import useApiSend from "../../hooks/api/useApiSend";
import useFormSubmit from "../../hooks/useFormSubmit";
import FormWrapper from "../../wrappers/FormWrapper";
import AutocompleteSelector from "../../components/AutocompleteSelector";
import ACSandDOS from "./ACSandDOS";

const ManageTopicsTab = () => {
  const [selected, setSelected] = useState(null);
  const [initialValues, setInitialValues] = useState({});

  const styles = useStyles();

  const { fetchTopics, patchTopic } = useTopicReq();

  const {
    data: topicsList,
    // isLoading,
    // error,
  } = useApiGet("topics", () => fetchTopics({ params: "/trimmed" }), {
    refetchOnWindowFocus: true,
    retry: 3,
  });

  const { mutate: handleUpdate } = useApiSend(
    patchTopic,
    () => console.log("Topic updated successfully"),
    (err) => console.log("Encountered an error updating.Try again.", err)
  );

  const { handleSubmit, control, reset } = useForm({
    mode: "onTouched",
    defaultValues: initialValues,
  });

  const formMethods = { handleSubmit, control, reset };

  useEffect(() => {
    setInitialValues({
      code: selected?.code,
      acronym: selected?.acronym,
      title: selected?.title,
      description: selected?.description,
      status: selected?.status,
      isHidden: selected?.isHidden ? "yes" : "no",
      creator: selected?.creator,
      createdAt: selected?.createdAt,
      version: selected?.version,
      remarks: selected?.remarks,
      questions: selected?.questions,
    });
  }, [selected]);

  useEffect(() => {
    // Update form values when initialValues change
    reset(initialValues);
  }, [initialValues, reset]);

  const handleFormDataSubmit = (rawData) => {
    const convertedIsHidden = rawData?.isHidden === "yes";
    const updatedData = {
      ...rawData,
      isHidden: convertedIsHidden,
      _id: selected?._id,
    };

    const _id = selected?._id;
    if (!_id) {
      alert("No topic selected");
    } else {
      handleUpdate({ data: updatedData, _id });
      alert("Request sent.");
    }
  };

  const handleUndo = () => {
    console.log("CLICKED UNDO");
  };

  const handleFormSubmit = useFormSubmit(handleFormDataSubmit);

  return (
    <FormWrapper formMethods={formMethods}>
      <Container
        component="main"
        maxWidth="xl"
        sx={styles.tabContainer}
        disableGutters
        width="100vw"
      >
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
          <ElevatedSectionWrapper bgcolor={grey[200]} px="30%" py="8px">
            <AutocompleteSelector
              value={selected}
              setValue={setSelected}
              options={topicsList}
              label="topics"
            />
          </ElevatedSectionWrapper>
          <br />
          <Stack direction="row" spacing={1.5}>
            <ElevatedSectionWrapper flex={1} px={{ xs: "20px", md: "50px" }}>
              <TopicInfoSection

              // control={control}
              />
            </ElevatedSectionWrapper>
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
        </form>
      </Container>
    </FormWrapper>
  );
};

export default ManageTopicsTab;
