import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";

import ControlledTextField from "../../components/form-controlled/ControlledTextField";
import { useFieldArray } from "react-hook-form";
import ControlledAutocomplete from "../../components/form-controlled/ControlledAutocomplete";

const dummyTopics = [
  { code: "A001", label: "Calculus" },
  { code: "A002", label: "Science" },
  { code: "A003", label: "Algebra" },
];

const SubjectInfoSection = ({ control, setOpenAddTopic }) => {
  const {
    fields: topics,
    append: appendTopic,
    remove: removeTopic,
  } = useFieldArray({ control, name: "topic" });

  return (
    <Stack direction="row" spacing={4}>
      <Stack flex={2} spacing={1} justifyContent="flex-start">
        <ControlledTextField
          control={control}
          name="code"
          label="subject code"
        />
        <ControlledTextField control={control} name="acronym" label="acronym" />
        <ControlledTextField control={control} name="title" label="title" />
        <ControlledTextField
          control={control}
          name="description"
          label="description"
          tfProps={{ multiline: true, minRows: 2 }}
        />
        <Box height="100%" />
      </Stack>

      <Stack flex={3} spacing={1.5}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>Topics</Typography>
          <Stack direction="row" alignItems="center">
            <Typography>Topic not in the list?</Typography>
            <Button onClick={setOpenAddTopic}>Add</Button>
          </Stack>
        </Stack>
        <Stack spacing={1}>
          {topics.map((topic, topicIndex) => (
            <Stack direction="row" key={topic.id} spacing={1}>
              <ControlledAutocomplete
                control={control}
                name={`topics[${topicIndex}.title]`}
                options={dummyTopics.map((t) => t.label)}
              />
              <Button onClick={() => removeTopic(topicIndex)}>Remove</Button>
            </Stack>
          ))}
          <Button onClick={() => appendTopic({ name: "" })}>Add Topic</Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default SubjectInfoSection;
