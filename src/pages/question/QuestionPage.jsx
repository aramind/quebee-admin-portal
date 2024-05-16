import React from "react";
import AddQuestionTab from "./AddQuestionTab";
import ManageQuestionTab from "./ManageQuestionTab";
import { Container } from "@mui/material";
import TabsContainer from "../../containers/TabsContainer";

const questionTabs = [
  { label: "add question", component: <AddQuestionTab /> },
  { label: "manage question", component: <ManageQuestionTab /> },
];
const QuestionPage = () => {
  return (
    <Container component="main" maxWidth="xl" disableGutters>
      <TabsContainer tabs={questionTabs} />
    </Container>
  );
};

export default QuestionPage;
