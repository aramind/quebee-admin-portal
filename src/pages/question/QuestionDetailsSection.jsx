import React from "react";
import useFetchData from "../../hooks/api/useFetchData";
import useDialog from "../../hooks/useDialog";
import AddTopicDialog from "../course/AddTopicDialog";
import { Box, Button, Stack, Typography } from "@mui/material";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import ControlledTextField from "../../components/form-controlled/ControlledTextField";
import { red, teal } from "@mui/material/colors";
import constants from "../../configs/constants";
import ContMultiSelectToTable from "../../components/form-controlled/ContMultiSelectToTable";
import ContRadGroup from "../../components/form-controlled/ContRadGroup";
import DifficultySection from "./DifficultySection";
import QSection from "./QSection";
import ChoicesSection from "./ChoicesSection";
import ControlledChipMultiAutoComp from "../../components/form-controlled/ControlledChipMultiAutoComp";
import { useFormContext } from "react-hook-form";
import useFetchTopics from "../../hooks/api/useFetchTopics";

const QuestionDetailsSection = () => {
  const { topicsList } = useFetchTopics("live-topics", `/trimmed?status=live`);
  const { tagsList } = useFetchData();
  const { errors } = useFormContext();

  const { handleOpen, renderDialog } = useDialog(AddTopicDialog);

  return (
    <Stack spacing={1.5} direction="row" alignItems="flex-start">
      <Stack flex={1} spacing={1.5}>
        <ElevatedSectionWrapper flex={1}>
          <ControlledTextField name="code" label="code (required)" />
        </ElevatedSectionWrapper>
        <ElevatedSectionWrapper>
          <Stack
            width="100%"
            alignItems="flex-end"
            sx={{ marginBottom: "-4px 0" }}
          >
            <Typography
              variant="body"
              color={red["A100"]}
              fontSize="0.8rem"
              sx={{ margin: "-8px 0" }}
            >
              Topic not in the list?
            </Typography>

            <Button
              variant="text"
              size="small"
              onClick={() => handleOpen({ title: "Add New Topic" })}
              sx={{
                textDecoration: "underline",
                fontSize: "0.7rem",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: teal[800],
                  textDecoration: "underline",
                },
              }}
            >
              Create Topic
            </Button>
          </Stack>
          <ContMultiSelectToTable
            objOptionsWithTitles={topicsList?.data || []}
            nameForController="topics"
            label="Topic(s) (At least one)"
          />
        </ElevatedSectionWrapper>
        <Stack direction="row" spacing={1.5}>
          <ElevatedSectionWrapper flex={1}>
            <ContRadGroup
              label="access (required)"
              name="access"
              options={constants?.ACCESS}
            />
          </ElevatedSectionWrapper>
          <ElevatedSectionWrapper flex={1}>
            <ContRadGroup
              name="type"
              label="type (required)"
              options={constants?.QUESTION_TYPE}
            />
          </ElevatedSectionWrapper>
        </Stack>

        <Stack flex={2}>
          <DifficultySection />
        </Stack>
      </Stack>
      <Stack flex={3} spacing={1.5}>
        <ElevatedSectionWrapper>
          <QSection />
          <ChoicesSection />
          <Box height="1.3rem" pl="1.5rem" mt={1}>
            {errors?.correctAnswer ? (
              <Typography color={red[700]} sx={{ fontWeight: "bold" }}>
                Select one correct answer!
              </Typography>
            ) : (
              ""
            )}
          </Box>
        </ElevatedSectionWrapper>
        <ElevatedSectionWrapper>
          <ControlledTextField
            label="information"
            name="information"
            tfProps={{ multiline: true, minRows: 4 }}
          />
        </ElevatedSectionWrapper>
        <ElevatedSectionWrapper>
          <ControlledChipMultiAutoComp
            name="tags"
            label="add tag(s) (required)"
            options={tagsList?.data || []}
            free
          />
        </ElevatedSectionWrapper>
        <ElevatedSectionWrapper>
          <ControlledTextField label="remarks" name="remarks" />
        </ElevatedSectionWrapper>
      </Stack>
      {renderDialog()}
    </Stack>
  );
};

export default QuestionDetailsSection;
