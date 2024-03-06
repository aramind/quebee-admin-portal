import { createTheme } from "@mui/material";
import { purple, teal } from "@mui/material/colors";

// COLORS
const COLORS = {
  primary: {
    main: "#2C8C8A",
    dark: "#277C7B",
    light: "#85D5B4",
    semi: teal["400"],
  },
  secondary: {
    main: purple["600"],
    dark: purple["800"],
    light: purple["A200"],
  },
  tertiary: {
    main: "#E9BB1D",
    dark: "#CCA114",
    light: "#F2D77D",
  },
  info: {
    main: teal["300"],
    dark: teal["500"],
    light: teal["100"],
  },
};
const auroraTheme = createTheme({
  palette: {
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    tertiary: COLORS.tertiary,
    info: COLORS.info,
  },
  typography: {
    fontFamily: `"Nunito", "Roboto", "sans-serif"`,
  },
  components: {
    MuiGrid: {
      padding: 0,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(39, 124, 123, 0.8)",
          },
        },
        outlined: {
          backgroundColor: teal["50"],
          "&:hover": {
            backgroundColor: teal["100"],
          },
        },
        text: {
          "&:hover": {
            backgroundColor: "rgba(242, 215, 125, 0.6)",
          },
        },
      },
    },
  },
});

export default auroraTheme;
