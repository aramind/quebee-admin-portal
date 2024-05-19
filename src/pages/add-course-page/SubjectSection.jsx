import { Button, Stack, Typography } from "@mui/material";
import React from "react";

import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import { useFieldArray } from "react-hook-form";

import ControlledAutocompleteV2 from "../../components/form-controlled/ControlledAutocompleteV2";

const MIN_HEIGHT = "170px";

const SubjectSection = ({ control, subjectsList }) => {
  const {
    fields: subjects,
    append: appendSubject,
    remove: removeSubject,
  } = useFieldArray({
    control,
    name: "subjects",
  });

  return (
    <ElevatedSectionWrapper>
      <Typography mb={2}>SUBJECT(S)</Typography>
      <Stack direction="row" flexWrap="wrap" justifyContent="space-between">
        {subjects.map((subject, subjectIndex) => (
          <Stack
            key={subject.id}
            mb={4}
            p={2}
            width={{ sx: "100%", md: "48%" }}
            sx={{
              outline: "1px solid gray",
              borderRadius: "10px",
              minHeight: { MIN_HEIGHT },
            }}
            spacing={1.5}
            // alignItems="flex-start"
          >
            <Button onClick={() => removeSubject(subjectIndex)} variant="text">
              Remove this subject
            </Button>

            <ControlledAutocompleteV2
              // control={control}
              name={`subjects[${subjectIndex}].title`}
              subjects={subjectsList}
            />
          </Stack>
        ))}

        <Stack
          mb={4}
          // p={2}
          width={{ sx: "100%", md: "48%" }}
          sx={{ borderRadius: "10px" }}
          spacing={1.5}
        >
          <Button
            sx={{
              minHeight: "100%",
            }}
            // height="100%"
            borderRadius="50px"
            className="fullW"
            onClick={() => appendSubject()}
          >
            Add Subject
          </Button>
        </Stack>
      </Stack>
    </ElevatedSectionWrapper>
  );
};

export default SubjectSection;
