import React from "react";

import { Tooltip, Zoom } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useGlobalState } from "../../context/ContextProvider";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";
import "./navbar.css";
import TooltipWrapper from "../../wrappers/TooltipWrapper";

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
        <TooltipWrapper title="Log out">
          <NavLink className="nav__logout" to="/" onClick={handleLogOut}>
            <ExitToAppTwoToneIcon sx={{ fontSize: "2.5rem" }} />
          </NavLink>
        </TooltipWrapper>
      </div>
    </nav>
  );
};

export default NavBar;
