import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Box, Button, Divider, Stack, Tab } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useGlobalState } from "../../context/ContextProvider";

const pages = [
  { link: "/", navLabel: "Dashboard" },
  { link: "/add-course", navLabel: "Add Course" },
  { link: "/add-question", navLabel: "Add Question" },
  { link: "/manage-course", navLabel: "Manage Course" },
  { link: "/manage-question", navLabel: "Manage Question" },
  { link: "/manage-user", navLabel: "Manage User" },
];

const NavBar = () => {
  const {
    globalState: { currentUser },
    dispatch,
  } = useGlobalState();

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <NavLink to="/dashboard">
          <Typography variant="h6">eTHERIA</Typography>
        </NavLink>
        <Stack
          direction="row"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
        >
          {pages &&
            pages.map((page) => {
              return <NavLink to={page.link}>{page.navLabel}</NavLink>;
            })}
          <NavLink to="/" onClick={handleLogOut}>
            {currentUser}
            <div>LOGOUT</div>
          </NavLink>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
