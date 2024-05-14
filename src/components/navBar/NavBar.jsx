import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";
import "./navbar.css";
import TooltipWrapper from "../../wrappers/TooltipWrapper";
import NavMenu from "../NavMenu";
import useLogout from "../../hooks/useLogout";

const pages = [
  { link: "/dashboard", navLabel: "Dashboard" },
  { link: "/course", navLabel: "Courses" },
  { link: "/add-question", navLabel: "Add Question" },
  { link: "/manage-course", navLabel: "Manage Course" },
  { link: "/manage-question", navLabel: "Manage Question" },
  { link: "/manage-user", navLabel: "Manage User" },
];

const NavBar = () => {
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    console.log("CLICKED LOG OUT");
    navigate("/login");
    logout();
  };

  const theme = useTheme();

  const isMdAndUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      {isMdAndUp ? (
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
                  <div className="nav-link" key={page.link}>
                    <NavLink
                      to={page.link}
                      exact="true"
                      className="nav-link"
                      // activeclassname="active"
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
      ) : (
        <nav>
          <div className="nav__logo">
            <NavLink to="/">
              <h1>eTHERIA</h1>
            </NavLink>
          </div>
          <NavMenu pages={pages} />
        </nav>
      )}
    </>
  );
};

export default NavBar;
