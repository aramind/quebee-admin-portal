import React from "react";

import { Tooltip, Zoom } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useGlobalState } from "../../context/ContextProvider";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";
import "./navbar.css";

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

  // return (
  //   <AppBar position="static" color="primary" sx={{ height: 60 }}>
  //     <Toolbar sx={{ justifyContent: "space-between" }}>
  //       <NavLink to="/">
  //         <Typography variant="h6">eTHERIA</Typography>
  //       </NavLink>
  //       <Stack
  //         alignItems="center"
  //         direction="row"
  //         spacing={2}
  //         divider={
  //           <Divider
  //             orientation="vertical"
  //             flexItem
  //             sx={{ backgroundColor: "gray" }}
  //           />
  //         }
  //       >
  //         {pages &&
  //           pages.map((page) => {
  //             return (
  //               <NavLink
  //                 to={page.link}
  //                 key={page.link}
  //                 exact
  //                 className="nav-link"
  //                 activeClassName="active"
  //               >
  //                 {page.navLabel?.toUpperCase()}
  //               </NavLink>
  //             );
  //           })}
  //         <NavLink to="/" onClick={handleLogOut}>
  //           <ExitToAppTwoToneIcon />
  //         </NavLink>
  //       </Stack>
  //     </Toolbar>
  //   </AppBar>
  // );
  return (
    <nav>
      <div className="nav__logo">
        <NavLink to="/">
          <h1>eTHERIA</h1>
        </NavLink>
      </div>
      <div className="nav__nav-links">
        {pages &&
          pages.map((page) => {
            return (
              <div className="nav-link">
                <NavLink
                  to={page.link}
                  key={page.link}
                  exact
                  className="nav-link"
                  activeClassName="active"
                >
                  <p className="nav-link__text">
                    {page.navLabel?.toUpperCase()}
                  </p>
                </NavLink>
              </div>
            );
          })}
        <Tooltip
          placement="left-start"
          TransitionComponent={Zoom}
          title="Log out"
          enterDelay={100}
          leaveDelay={100}
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -25],
                  },
                },
              ],
            },
          }}
        >
          <NavLink className="nav__logout" to="/" onClick={handleLogOut}>
            <ExitToAppTwoToneIcon sx={{ fontSize: "3rem" }} />
          </NavLink>
        </Tooltip>
      </div>
    </nav>
  );
};

export default NavBar;
