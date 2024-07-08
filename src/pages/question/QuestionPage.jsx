import React from "react";
import AddQuestionTab from "./AddQuestionTab";
import ManageQuestionTab from "./ManageQuestionTab";
import { Container } from "@mui/material";
import TabsContainer from "../../containers/TabsContainer";
import ImportQuestionTab from "./ImportQuestionTab";

const questionTabs = [
  { label: "manage question", component: <ManageQuestionTab /> },
  { label: "import questions", component: <ImportQuestionTab /> },
  { label: "add question", component: <AddQuestionTab /> },
];
const QuestionPage = () => {
  return (
    <Container component="main" maxWidth="xl" disableGutters>
      <TabsContainer tabs={questionTabs} />
    </Container>
  );
};

export default QuestionPage;
