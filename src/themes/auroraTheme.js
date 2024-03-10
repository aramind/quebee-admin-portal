import { createTheme } from "@mui/material";
import { grey, purple, teal } from "@mui/material/colors";

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
    lightest: "#F8E8B5",
  },
  info: {
    main: teal["300"],
    dark: teal["500"],
    light: teal["100"],
  },
  font: {
    black: "#333",
    white: "#eee",
    gray: grey[800],
  },
  bg: {
    light: {
      lightest: grey[50],
      lighter: grey[100],
      main: grey[300],
      darker: grey[400],
      darkest: grey[500],
    },
    dark: {
      lightest: teal[300],
      lighter: teal[500],
      main: teal[700],
      darker: teal[800],
      darkest: teal[900],
    },
  },
};
// theme
const auroraTheme = createTheme({
  palette: {
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    tertiary: COLORS.tertiary,
    info: COLORS.info,
    font: COLORS.font,
    bg: COLORS.bg,
  },
  typography: {
    // fontSize: "1rem",
    fontFamily: `"Inter", "Nunito", "Roboto", "sans-serif"`,
    exo: "Exo 2",
    prompt: "Prompt",
    poppins: "Poppins",
    abel: "Abel",
    inter: "Inter",
    roboto: "Roboto",
    nunito: "Nunito",
    chip: "Inter",
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: teal[300],
          "&:hover": {
            backgroundColor: "rgba(242, 215, 125, 0.6)",
            color: COLORS.primary.dark,
          },
        },
      },
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
    MuiGrid: {
      styleOverrides: {
        root: {
          margin: 0,
        },
      },
    },
  },
});

export default auroraTheme;
