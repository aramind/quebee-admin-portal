import React, { useCallback, useEffect, useState } from "react";
import useStyles from "../../hooks/useStyles";
import useTopicReq from "../../hooks/api/useTopicReq";
import { useForm } from "react-hook-form";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import { Box, Container, Stack } from "@mui/material";
import { DevTool } from "@hookform/devtools";
import TopicInfoSection from "./TopicInfoSection";
import useApiSend from "../../hooks/api/useApiSend";
import FormWrapper from "../../wrappers/FormWrapper";
import AutocompleteSelector from "../../components/AutocompleteSelector";
import ACSandDOS from "./ACSandDOS";
import useFetchData from "../../hooks/api/useFetchData";
import { zodResolver } from "@hookform/resolvers/zod";
import topicSchema from "../../schemas/topic";
import useConfirmActionDialog from "../../hooks/useConfirmActionDialog";
import FormActions from "./FormActions";

const ManageTopicsTab = () => {
  const [selected, setSelected] = useState(null);
  const [initialValues, setInitialValues] = useState({});

  const styles = useStyles();

  const { patchTopic, simpleUpdate } = useTopicReq();
  const { topicsList } = useFetchData();

  const { mutate: handleUpdate } = useApiSend(patchTopic, ["topics"]);
  const { mutate: handleSimpleUpdate } = useApiSend(simpleUpdate, ["topics"]);

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { isDirty, errors },
  } = useForm({
    mode: "onTouched",
    resolver: zodResolver(topicSchema),
    defaultValues: initialValues,
  });

  const formMethods = { handleSubmit, control, reset, errors };

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

  const handleFormDataSubmit = useCallback(() => {
    const rawData = getValues();
    const formattedData = {
      code: rawData?.code,
      acronym: rawData?.acronym,
      title: rawData?.title,
      description: rawData?.description,
      status: rawData?.status,
      remarks: rawData?.remarks,
      isHidden: rawData?.isHidden === "yes",
    };

    const _id = selected?._id;
    if (!_id) {
      alert("No topic selected");
    } else {
      handleUpdate({ data: formattedData, _id });
    }
  }, [getValues, handleUpdate, selected?._id]);

  const handleUndo = useCallback(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const handleUpload = useCallback(() => {
    handleSimpleUpdate({
      id: selected?._id,
      data: { status: "live" },
    });
  }, [handleSimpleUpdate, selected?._id]);

  const handleDelete = useCallback(() => {
    handleSimpleUpdate({
      id: selected?._id,
      data: { status: "deleted" },
    });
  }, [handleSimpleUpdate, selected?._id]);

  const { handleOpen: handleConfirmDelete, renderConfirmActionDialog } =
    useConfirmActionDialog(
      "Delete this Topic?",
      {
        code: selected?.code,
        acronym: selected?.acronym,
        title: selected?.title,
        description: selected?.description,
        "  ": "",
        status: selected?.status,
        isHidden: selected?.isHidden ? "yes" : "no",
        " ": "",
        remarks: selected?.remarks,
      },
      handleDelete
    );

  const renderFormActions = () => (
    <FormActions
      selected={selected?._id}
      status={selected?.status}
      handleUpload={handleUpload}
      handleConfirmDelete={handleConfirmDelete}
      handleUndo={handleUndo}
      handleFormDataSubmit={handleFormDataSubmit}
      isDirty={isDirty}
      errors={errors}
    />
  );

  return (
    <>
      <FormWrapper formMethods={formMethods}>
        <Container
          component="main"
          maxWidth="xl"
          sx={styles.tabContainer}
          disableGutters
          width="100vw"
        >
          <form noValidate>
            <Stack direction="row" spacing={1}>
              <Box width="100%" pt={0.4}>
                <AutocompleteSelector
                  value={selected}
                  setValue={setSelected}
                  options={topicsList?.data}
                  label="topics"
                />
              </Box>
              {renderFormActions()}
            </Stack>
            <br />
            {selected?._id && (
              <Stack direction="row" spacing={1.5}>
                <ElevatedSectionWrapper
                  flex={1}
                  px={{ xs: "20px", md: "50px" }}
                >
                  <TopicInfoSection />
                </ElevatedSectionWrapper>
                <Stack spacing={1.5} justifyContent="flex-start" width="180px">
                  <ACSandDOS values={initialValues} />
                </Stack>
              </Stack>
            )}
            <br />
            <DevTool control={control} />
            {selected?._id && renderFormActions()}
          </form>
        </Container>
      </FormWrapper>
      {renderConfirmActionDialog(selected || [])}
    </>
  );
};

export default ManageTopicsTab;
