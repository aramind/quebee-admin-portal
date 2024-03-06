import { grey, teal } from "@mui/material/colors";

const useStyles = () => {
  const styles = {
    form: {
      inputLabel: {
        textAlign: "left",
        fontSize: "0.8rem",
        px: "5px",
        color: "font.black",
        fontWeight: "bold",
      },
      primaryActionButton: {
        px: 5,
        fontSize: "1rem",
        "&:hover": {
          backgroundColor: "tertiary.main",
          color: "font.black",
        },
      },
      cardBorder: {
        borderTop: `15px solid ${teal["100"]}`,
        borderBottom: `2px solid ${teal["100"]}`,
        borderLeft: `2px solid ${teal["100"]}`,
        borderRight: `2px solid ${teal["100"]}`,
      },
    },
    mainContainer: {
      minHeight: "calc(100vh - 60px)",
      backgroundColor: grey["100"],
      py: 3,
      px: 6,
    },
  };
  return styles;
};

export default useStyles;
