import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { Divider, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useGlobalState } from "../../context/ContextProvider";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";

const pages = [
  { link: "/dashboard", navLabel: "Dashboard" },
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
    localStorage.removeItem("user");
  };

  return (
    <AppBar position="static" color="primary" sx={{ height: 60 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <NavLink to="/">
          <Typography variant="h6">eTHERIA</Typography>
        </NavLink>
        <Stack
          direction="row"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
        >
          {pages &&
            pages.map((page) => {
              return (
                <NavLink to={page.link} key={page.link}>
                  {page.navLabel}
                </NavLink>
              );
            })}
          <NavLink to="/" onClick={handleLogOut}>
            <ExitToAppTwoToneIcon />
          </NavLink>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
