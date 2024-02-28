import { createTheme } from "@mui/material";
import { amber, cyan, grey, purple, teal } from "@mui/material/colors";

const auroraTheme = createTheme({
  palette: {
    primary: {
      main: teal["700"],
      dark: teal["900"],
      light: teal["A100"],
    },
    secondary: {
      main: purple["600"],
      dark: purple["800"],
      light: purple["A200"],
    },
    tertiary: {
      main: amber["600"],
      dark: amber["900"],
      light: amber["A200"],
    },
    info: {
      main: teal["300"],
      dark: teal["500"],
      light: teal["100"],
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: teal["900"],
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: teal["900"],
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
