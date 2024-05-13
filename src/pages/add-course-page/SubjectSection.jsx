import { Box, Button, Stack, Typography } from "@mui/material";
import React, { Fragment } from "react";
import ControlledSimpleSelect from "../../components/form-controlled/ControlledSimpleSelect";
import ControlledTextField from "../../components/form-controlled/ControlledTextField";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import { useFieldArray } from "react-hook-form";
import ControlledChipMultiAutoComp from "../../components/form-controlled/ControlledChipMultiAutoComp";
import ControlledAutocomplete from "../../components/form-controlled/ControlledAutocomplete";
import CancelPresentationTwoToneIcon from "@mui/icons-material/CancelPresentationTwoTone";
import AddBoxTwoToneIcon from "@mui/icons-material/AddBoxTwoTone";

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
      <Typography mb={2}>SUBJECT(S)</Typography>
      <Stack direction="row" flexWrap="wrap" justifyContent="space-between">
        {subjects.map((subject, subjectIndex) => (
          <Stack
            key={subject.id}
            // className="outlined"
            mb={4}
            p={2}
            width={{ sx: "100%", md: "48%" }}
            sx={{ outline: "1px solid gray", borderRadius: "10px" }}
            spacing={1.5}
          >
            <Button onClick={() => removeSubject(subjectIndex)}>
              Remove This Subject
            </Button>

            <ControlledAutocomplete
              control={control}
              name={`subjects[${subjectIndex}].title`}
              options={dummySubjects.map((s) => s.label)}
            />

            <Typography pl="1rem">Topics</Typography>

            <Stack pl="2rem" spacing={1}>
              {topics.map((topic, topicIndex) => {
                if (topic.index === subjectIndex) {
                  return (
                    <Stack direction="row" key={topic.id} spacing={1}>
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
            </Stack>
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
