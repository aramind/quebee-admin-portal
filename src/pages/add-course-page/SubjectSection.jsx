import { Box, Button, Stack } from "@mui/material";
import React, { Fragment } from "react";
import ControlledSimpleSelect from "../../components/form-controlled/ControlledSimpleSelect";
import ControlledTextField from "../../components/form-controlled/ControlledTextField";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import { useFieldArray } from "react-hook-form";

const dummySubjects = [
  { code: "A001", name: "Engineering" },
  { code: "A002", name: "Science and Tech" },
  { code: "A003", name: "Humanities" },
];

const SubjectSection = ({ control }) => {
  const {
    fields: subjects,
    append: appendSubject,
    remove: removeSubject,
  } = useFieldArray({
    control,
    name: "subjects",
  });

  const {
    fields: topics,
    append: appendTopic,
    remove: removeTopic,
  } = useFieldArray({
    control,
    name: "topic",
  });

  return (
    <ElevatedSectionWrapper>
      {subjects.map((subject, subjectIndex) => (
        <Fragment key={subject.id}>
          <Stack direction="row">
            <Box flex="1">
              <ControlledSimpleSelect
                label="Subject Code"
                name={`subjects[${subjectIndex}].code`}
                control={control}
                options={dummySubjects?.map((s) => s.code)}
              />
            </Box>
            <Box flex={4}>
              <ControlledSimpleSelect
                label="Subject title"
                name={`subjects[${subjectIndex}].title`}
                control={control}
                options={dummySubjects?.map((s) => s.name)}
              />
            </Box>
            <Button onClick={() => removeSubject(subjectIndex)}>
              Remove Subject
            </Button>
          </Stack>

          <Box ml="4rem">
            {topics.map((topic, topicIndex) => {
              if (topic.index === subjectIndex) {
                return (
                  <Stack direction="row" key={topic.id}>
                    <ControlledTextField
                      control={control}
                      name={`subjects[${subjectIndex}].topics[${topicIndex}].name`}
                      label={`Topic ${topicIndex + 1}`}
                    />
                    <Button onClick={() => removeTopic(topicIndex)}>
                      Remove Topic
                    </Button>
                  </Stack>
                );
              }
              return null;
            })}
            <Button onClick={() => appendTopic({ index: subjectIndex })}>
              Add Topic
            </Button>
          </Box>
        </Fragment>
      ))}
      <Button onClick={() => appendSubject()}>Add Subject</Button>
    </ElevatedSectionWrapper>
  );
};

export default SubjectSection;
