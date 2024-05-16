import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { useState } from "react";

// values must be in format of [{component: <Component>, label: <String>}]
const TabsContainer = ({ tabs }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (e, newTabValue) => {
    setTabValue((pv) => newTabValue);
  };

  return (
    <TabContext value={tabValue}>
      <Box sx={localStyle.tabListContainer}>
        <TabList onChange={handleTabChange} centered sx={localStyle.tabList}>
          {tabs &&
            tabs.map((tab, index) => (
              <Tab key={index} label={tab.label} value={index} />
            ))}
        </TabList>
      </Box>
      {tabs &&
        tabs.map((tab, index) => (
          <TabPanel key={index} value={index}>
            {tab.component}
          </TabPanel>
        ))}
    </TabContext>
  );
};

export default TabsContainer;

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
    width: "100%",
  },
};
