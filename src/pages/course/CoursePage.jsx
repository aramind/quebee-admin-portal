import { Container } from "@mui/material";
import React from "react";

import AddCoursePage from "../add-course-page/AddCoursePage";
import ManageCoursePage from "../manage-course-page/ManageCoursePage";
import ManageSubjectsTab from "./ManageSubjectsTab";
import ManageTopicsTab from "./ManageTopicsTab";
import TabsContainer from "../../containers/TabsContainer";

const coursesTabs = [
  { label: "Add Course", component: <AddCoursePage /> },
  { label: "Manage Courses", component: <ManageCoursePage /> },
  { label: "Manage Subjects", component: <ManageSubjectsTab /> },
  { label: "Manage Topics", component: <ManageTopicsTab /> },
];

const CoursePage = () => {
  return (
    <Container component="main" maxWidth="xl" disableGutters>
      <TabsContainer tabs={coursesTabs} />
    </Container>
  );
};

export default CoursePage;
