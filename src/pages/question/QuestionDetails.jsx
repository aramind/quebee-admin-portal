import { Button, Stack, Typography } from "@mui/material";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import ControlledTextField from "../../components/form-controlled/ControlledTextField";
import { red, teal } from "@mui/material/colors";
import ContMultiSelectToTable from "../../components/form-controlled/ContMultiSelectToTable";
import ContRadGroup from "../../components/form-controlled/ContRadGroup";
import constants from "../../configs/constants";
import DifficultySection from "./DifficultySection";
import QSection from "./QSection";
import ChoicesSection from "./ChoicesSection";
import ControlledChipMultiAutoComp from "../../components/form-controlled/ControlledChipMultiAutoComp";
import AddTopicDialog from "../course/AddTopicDialog";
import useDialog from "../../hooks/useDialog";
import useFetchData from "../../hooks/api/useFetchData";

const QuestionDetails = () => {
  const { topicsList, tagsList } = useFetchData();

  const { handleOpen, renderDialog } = useDialog(AddTopicDialog);

  console.log("TL", tagsList);
  return (
    <Stack spacing={1.5} direction="row" alignItems="flex-start">
      <Stack flex={1} spacing={1.5}>
        <ElevatedSectionWrapper flex={1}>
          <ControlledTextField name="code" label="code" />
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
            objOptionsWithTitles={topicsList || []}
            nameForController="topics"
            label="Topic(s)"
          />
        </ElevatedSectionWrapper>
        <Stack direction="row" spacing={1.5}>
          <ElevatedSectionWrapper flex={1}>
            <ContRadGroup
              label="access"
              name="access"
              options={constants?.ACCESS}
            />
          </ElevatedSectionWrapper>
          <ElevatedSectionWrapper flex={1}>
            <ContRadGroup
              name="type"
              label="type"
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
            label="select tag(s)"
            options={tagsList || []}
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

export default QuestionDetails;
