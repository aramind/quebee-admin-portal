import React from "react";
import { Button, useMediaQuery, useTheme } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";
import "./navbar.css";
import TooltipWrapper from "../../wrappers/TooltipWrapper";
import NavMenu from "../NavMenu";
import useLogout from "../../hooks/useLogout";

const pages = [
  { link: "/dashboard", navLabel: "Dashboard" },
  { link: "/courses", navLabel: "Courses" },
  { link: "/questions", navLabel: "Questions" },
  { link: "/users", navLabel: "Users" },
];

const NavBar = () => {
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    console.log("CLICKED LOG OUT");
    logout();
    navigate("/login");
  };

  const theme = useTheme();

  const isMdAndUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      {isMdAndUp ? (
        <nav>
          <div className="nav__logo">
            <NavLink to="/">
              <h1>queBEE</h1>
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
              {/* <NavLink className="nav__logout" to="/" onClick={handleLogOut}>
                <ExitToAppTwoToneIcon sx={{ fontSize: "2.5rem" }} />
              </NavLink>1 */}
              <Button className="nav__logout" to="/" onClick={handleLogOut}>
                <ExitToAppTwoToneIcon sx={{ fontSize: "2.5rem" }} />
              </Button>
            </TooltipWrapper>
          </div>
        </nav>
      ) : (
        <nav>
          <div className="nav__logo">
            <NavLink to="/">
              <h1>queBEE</h1>
            </NavLink>
          </div>
          <NavMenu pages={pages} />
        </nav>
      )}
    </>
  );
};

export default NavBar;
