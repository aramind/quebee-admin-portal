import { createTheme } from "@mui/material";
import { amber, cyan, grey, purple, teal } from "@mui/material/colors";

const auroraTheme = createTheme({
  palette: {
    primary: {
      // main: teal["700"],
      main: "#2C8C8A",
      // dark: teal["900"],
      dark: "#277C7B",
      // light: teal["A100"],
      light: "#85D5B4",
      // light: teal["100"],
    },
    secondary: {
      main: purple["600"],
      dark: purple["800"],
      light: purple["A200"],
    },
    tertiary: {
      // main: amber["600"],
      main: "#E9BB1D",
      // dark: amber["900"],
      dark: "#CCA114",
      light: "#F2D77D",
      // light: amber["A200"],
    },
    info: {
      main: teal["300"],
      dark: teal["500"],
      light: teal["100"],
    },
  },
  typography: {
    fontFamily: `"Nunito", "Roboto", "sans-serif"`,
  },
  components: {
    MuiGrid: {
      padding: 0,
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1D5D5C",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#277C7B",
          },
        },
        // contained: {
        //   backgroundColor: teal["200"],
        //   color: grey["900"],
        // },
        outlined: {
          borderWidth: 0,
          backgroundColor: teal["50"],

          "&:hover": {
            backgroundColor: teal["100"],
            borderWidth: 0,
            borderColor: teal["A200"],
          },
        },
      },
    },
  },
});

export default auroraTheme;
