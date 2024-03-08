import { Box, Button, Divider, Drawer, List } from "@mui/material";
import React, { useState } from "react";

const SideBar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <p>Dashboard</p>
        <Divider />
        <p>Add Course</p>
        <Divider />
        <p>Add Question</p>
        <Divider />
        <p>Manage Course</p>
        <Divider />
        <p>Manage Question</p>
        <Divider />
        <p>Manage User</p>
        <Divider />
        <p>Log out</p>
      </List>
    </Box>
  );
  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default SideBar;
