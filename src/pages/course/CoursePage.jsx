import { Box, Container, Tab } from "@mui/material";
import React, { useState } from "react";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import AddCoursePage from "../add-course-page/AddCoursePage";
import ManageCoursePage from "../manage-course-page/ManageCoursePage";

const CoursePage = () => {
  const [tabValue, setTabValue] = useState("1");

  const handleTabChange = (e, newTabValue) => {
    setTabValue((pv) => newTabValue);
  };
  return (
    <Container component="main" maxWidth="xl" disableGutters>
      <TabContext value={tabValue}>
        <Box sx={localStyle.tabListContainer}>
          <TabList onChange={handleTabChange} centered sx={localStyle.tabList}>
            <Tab label="Add Course" value="1" />
            <Tab label="Manage Courses" value="2" />
            <Tab label="Manage Subjects" value="3" />
            <Tab label="Manage Topics" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <AddCoursePage />
        </TabPanel>
        <TabPanel value="2">
          <ManageCoursePage />
        </TabPanel>
        <TabPanel value="3">Manage Subjects</TabPanel>
        <TabPanel value="4">Manage Topics</TabPanel>
      </TabContext>
    </Container>
  );
};

export default CoursePage;

const localStyle = {
  tabList: {
    width: "100%",
    ".MuiTabs-indicator": {
      height: "0px",
    },
    ".Mui-selected": {
      fontWeight: "bold",
    },
  },
  tabListContainer: {
    position: "sticky",
    top: "60px",
    zIndex: 999,
    backgroundColor: (theme) => theme.palette.bg.light.lighter,
    borderBottom: 1,
    borderColor: (theme) => theme.palette.bg.light.lighter,
    // borderColor: "divider",
    maxHeight: "48px",
    display: "flex",
    justifyContent: "space-between",
    width: "100vw",
  },
};
