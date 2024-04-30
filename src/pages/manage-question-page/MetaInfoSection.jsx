import { Stack } from "@mui/material";
import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import Label from "./Label";
import Value from "./Value";
import { formatDate } from "../../utils/formatDate";

const SCREEN_FLEX_PROPORTIONS = ["30%", "70%"];

const StackItem = ({ label, values, direction = "row", inChip }) => (
  <Stack direction={direction} spacing={1}>
    <Label label={label} />
    <Value values={values} inChip={inChip} />
  </Stack>
);

const MetaInfoSection = ({ currentQuestion }) => {
  return (
    <>
      <ElevatedSectionWrapper fullW fullH>
        <Stack spacing={1}>
          <StackItem label="database" values={currentQuestion?.database} />
          <StackItem
            label="course(s)"
            values={currentQuestion?.courses}
            inChip
          />
          <StackItem
            label="subject(s)"
            values={currentQuestion?.subjects}
            inChip
          />
          <StackItem label="topic(s)" values={currentQuestion?.topics} inChip />
        </Stack>
      </ElevatedSectionWrapper>
      <Stack direction="row" spacing={1.5}>
        <ElevatedSectionWrapper fullW fullH flex={SCREEN_FLEX_PROPORTIONS[0]}>
          <Stack spacing={1}>
            <StackItem label="access" values={currentQuestion?.access} />
            <StackItem
              label="difficulty"
              values={`${currentQuestion?.difficulty}/5`}
            />
            <StackItem label="nature" values={currentQuestion?.nature} />
            <StackItem label="type" values={currentQuestion?.type} />
          </Stack>
        </ElevatedSectionWrapper>
        <ElevatedSectionWrapper fullW fullH flex={SCREEN_FLEX_PROPORTIONS[1]}>
          <Stack spacing={1}>
            <StackItem label="encoder" values="abc31" />
            <StackItem
              label="encoded"
              values={formatDate(currentQuestion?.createdAt)}
            />
            <StackItem label="status" values={currentQuestion?.status} />
          </Stack>
        </ElevatedSectionWrapper>
      </Stack>
    </>
  );
};

export default MetaInfoSection;
