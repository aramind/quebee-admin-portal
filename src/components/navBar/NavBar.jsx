import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Box, Divider, Stack, Tab } from "@mui/material";
import { NavLink } from "react-router-dom";

const pages = [
  { link: "/dashboard", navLabel: "Dashboard" },
  { link: "/add-course", navLabel: "Add Course" },
  { link: "/add-question", navLabel: "Add Question" },
  { link: "/manage-course", navLabel: "Manage Course" },
  { link: "/manage-question", navLabel: "Manage Question" },
  { link: "/", navLabel: "Logout" },
];

const NavBar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">eTHERIA</Typography>
        <Stack
          direction="row"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
        >
          {pages &&
            pages.map((page) => {
              return <NavLink to={page.link}>{page.navLabel}</NavLink>;
            })}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
