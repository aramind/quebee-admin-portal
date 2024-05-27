import { Box, Divider, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import MenuTwoToneIcon from "@mui/icons-material/MenuTwoTone";
import { NavLink } from "react-router-dom";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";
import { useGlobalState } from "../context/GlobalStatesContextProvider";

const NavMenu = ({ pages }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const {
    globalState: { currentUser },
    dispatch,
  } = useGlobalState();

  const handleLogOut = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <MenuTwoToneIcon sx={{ color: "font.white", fontSize: "3rem" }} />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          ".MuiPaper-root": {
            backgroundColor: "primary.main",
          },

          ".MuiMenuItem-root": {
            justifyContent: "center",
            fontSize: "1.5rem",
            py: 2,
          },

          ".MuiList-root": {
            py: 0,
          },
        }}
      >
        {pages.length > 0 ? (
          pages.map((page, index) => {
            return (
              <Box key={index}>
                <NavLink to={page.link}>
                  <MenuItem onClick={handleClose}>{page.navLabel}</MenuItem>
                </NavLink>

                <Divider sx={{ bgcolor: "font.white" }} />
              </Box>
            );
          })
        ) : (
          <MenuItem onClick={handleClose}>Back</MenuItem>
        )}

        <MenuItem onClick={handleClose} sx={{ color: "font.white" }}>
          <NavLink id="navlink-logout-router" to="/" onClick={handleLogOut}>
            Logout
            <ExitToAppTwoToneIcon sx={{ fontSize: "2.5rem" }} />
          </NavLink>
        </MenuItem>
      </Menu>
    </>
  );
};

export default NavMenu;
