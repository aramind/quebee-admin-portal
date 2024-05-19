import { Container } from "@mui/material";
import React from "react";

import ManageSubjectsTab from "./ManageSubjectsTab";
import ManageTopicsTab from "./ManageTopicsTab";
import TabsContainer from "../../containers/TabsContainer";
import AddCourseTab from "./AddCourseTab";
import ManageCourseTab from "./ManageCourseTab";

const coursesTabs = [
  { label: "Add Course", component: <AddCourseTab /> },
  { label: "Manage Courses", component: <ManageCourseTab /> },
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
