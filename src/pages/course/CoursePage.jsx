import { Box, Container, Tab, useTheme } from "@mui/material";
import React, { useState } from "react";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import AddCoursePage from "../add-course-page/AddCoursePage";
import ManageCoursePage from "../manage-course-page/ManageCoursePage";
import { red } from "@mui/material/colors";

const CoursePage = () => {
  const [tabValue, setTabValue] = useState("1");
  const theme = useTheme();

  const handleTabChange = (e, newTabValue) => {
    setTabValue((pv) => newTabValue);
  };
  return (
    <Container component="main" maxWidth="xl" disableGutters>
      <TabContext value={tabValue}>
        <Box
          //   sx={{ borderBottom: 1, borderColor: "divider", maxHeight: "48px" }}
          sx={{
            position: "sticky",
            top: "60px",
            zIndex: 999,
            backgroundColor: theme.palette.bg.light.lightest,
            borderBottom: 1,
            borderColor: "divider",
            maxHeight: "48px",
            display: "flex",
            justifyContent: "space-between",
            width: "100vw",
          }}

          //   backgroundColor={red[500]}
        >
          <TabList
            onChange={handleTabChange}
            // className="outlined"
            sx={{ width: "100%" }}
            centered
          >
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
