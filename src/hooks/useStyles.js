import { grey, teal } from "@mui/material/colors";

const useStyles = () => {
  const styles = {
    form: {
      inputLabel: {
        textAlign: "left",
        fontSize: "0.8rem",
        px: "5px",
        color: "#333",
        fontWeight: "bold",
      },
      primaryActionButton: {
        my: "1rem",
        py: "0.5rem",
        fontSize: "1.5rem",
        fontWeight: "bold",

        "&:hover": {
          backgroundColor: "tertiary.main",
          color: "black",
        },
      },
      primaryActionIcon: {
        fontSize: "2rem",
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
      py: 4,
      px: 6,
    },
    iconButton: {
      color: teal[300],
      "&:hover": {
        // backgroundColor: teal["100"],
        backgroundColor: "rgba(242, 215, 125, 0.6)",
        color: "primary.dark",
      },
    },
  };
  return styles;
};

export default useStyles;
