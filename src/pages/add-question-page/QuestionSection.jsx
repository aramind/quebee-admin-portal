import React from "react";
import ElevatedSectionWrapper from "../../wrappers/ElevatedSectionWrapper";
import { Stack } from "@mui/material";

import QSection from "../question/QSection";
import ChoicesSection from "../question/ChoicesSection";
const QuestionSection = ({ control, defaultValues }) => {
  return (
    <ElevatedSectionWrapper fullW>
      <Stack>
        <QSection />
        <ChoicesSection defaultValues={defaultValues} />
      </Stack>
    </ElevatedSectionWrapper>
  );
};

export default QuestionSection;
