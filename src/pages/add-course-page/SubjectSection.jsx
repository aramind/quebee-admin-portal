import { Box, Button, Stack, Typography } from "@mui/material";
import React, { Fragment } from "react";
import ControlledSimpleSelect from "../../components/form-controlled/ControlledSimpleSelect";
import ControlledTextField from "../../components/form-controlled/ControlledTextField";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import { useFieldArray } from "react-hook-form";
import ControlledChipMultiAutoComp from "../../components/form-controlled/ControlledChipMultiAutoComp";
import ControlledAutocomplete from "../../components/form-controlled/ControlledAutocomplete";

const dummySubjects = [
  { code: "A001", label: "Engineering" },
  { code: "A002", label: "Science and Tech" },
  { code: "A003", label: "Humanities" },
];

const dummyTopics = [
  { code: "A001", label: "Calculus" },
  { code: "A002", label: "Science" },
  { code: "A003", label: "Algebra" },
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
      <Stack
        direction="row"
        flexWrap="wrap"
        // className="outlined2"
        justifyContent="space-between"
      >
        {subjects.map((subject, subjectIndex) => (
          <Stack
            key={subject.id}
            className="outlined"
            mb={4}
            p={2}
            width={{ sx: "100%", md: "48%" }}
          >
            {/* <Box flex={4}>
              <ControlledSimpleSelect
                label="Subject title"
                name={`subjects[${subjectIndex}].title`}
                control={control}
                options={dummySubjects?.map((s) => s.name)}
              />
            </Box> */}
            {/* <Button onClick={() => removeSubject(subjectIndex)}>
              Remove Subject
            </Button> */}

            <Button onClick={() => removeSubject(subjectIndex)}>
              Remove This Subject
            </Button>

            <ControlledAutocomplete
              control={control}
              name={`subjects[${subjectIndex}].title`}
              options={dummySubjects.map((s) => s.label)}
            />

            <Typography mt={1} ml={1}>
              Topics
            </Typography>

            <Box ml="3rem">
              {topics.map((topic, topicIndex) => {
                if (topic.index === subjectIndex) {
                  return (
                    <Stack direction="row" key={topic.id}>
                      {/* <ControlledTextField
                      control={control}
                      name={`subjects[${subjectIndex}].topics[${topicIndex}].name`}
                      //   label={`Topic ${topicIndex + 1}`}
                    /> */}
                      <ControlledAutocomplete
                        control={control}
                        name={`subjects[${subjectIndex}].topics[${topicIndex}].title`}
                        options={dummyTopics.map((s) => s.label)}
                      />
                      <Button onClick={() => removeTopic(topicIndex)}>
                        Remove
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
          </Stack>
        ))}

        <Button fullWidth onClick={() => appendSubject()}>
          Add Subject
        </Button>
      </Stack>
    </ElevatedSectionWrapper>
  );
};

export default SubjectSection;
