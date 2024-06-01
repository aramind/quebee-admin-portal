import React, { useState } from "react";
import useStyles from "../../hooks/useStyles";
import { Box, IconButton, Stack } from "@mui/material";
import HttpsTwoToneIcon from "@mui/icons-material/HttpsTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";

const genIcons = (n) => {
  let icons = [
    <HttpsTwoToneIcon sx={{ fontSize: "1rem", color: "font.gray" }} />,
  ];
  for (let i = 0; i < n - 1; i++) {
    icons.push(
      <HttpsTwoToneIcon sx={{ fontSize: "1rem", color: "font.gray" }} />
    );
  }
  return icons;
};

const RenderPassword = React.memo(({ row }) => {
  const [showPassword, setShowPassword] = useState(false);
  const styles = useStyles();

  const togglePWVisibility = () => {
    setShowPassword((prevPW) => !prevPW);
  };

  const passwordValue = showPassword ? (
    row.password
  ) : (
    <Stack direction="row" sx={{ justifyContent: "left" }}>
      {genIcons(4).map((icon, index) => (
        <div key={index}>{icon}</div>
      ))}
    </Stack>
  );

  return (
    <>
      <Stack
        direction="row"
        height="1"
        sx={{ width: 1, justifyContent: "space-between", px: 0 }}
      >
        <Box flex={3} sx={localStyle.box.password}>
          {passwordValue}
        </Box>
        <Box flex={2} width={1} sx={localStyle.box.password}>
          <IconButton onClick={togglePWVisibility} sx={styles.iconButton}>
            {showPassword ? (
              <VisibilityOffTwoToneIcon sx={localStyle.iconButton} />
            ) : (
              <VisibilityTwoToneIcon sx={localStyle.iconButton} />
            )}
          </IconButton>
        </Box>
      </Stack>
    </>
  );
});

export default RenderPassword;

//local sx styles
// @type {import("@mui/material").SxProps}
const localStyle = {
  box: {
    password: {
      display: "flex",
      py: "auto",
      height: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  },
};
