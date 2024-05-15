import { grey, teal } from "@mui/material/colors";

const useStyles = () => {
  const styles = {
    dialog: {
      title: {
        cursor: "move",
        fontWeight: "bold",
        borderBottom: "2px solid",
        borderColor: "primary.light",
        mb: 2,
        py: 1,
      },
      actionButton: {
        "&:hover": {
          backgroundColor: "tertiary.main",
          color: "font.black",
        },
      },
    },
    form: {
      inputLabel: {
        textAlign: "left",
        fontSize: { sx: "10px", md: "12px" },
        px: "5px",
        color: "font.gray",
        // fontWeight: "bold",
        fontFamily: (theme) => theme.typography.prompt,
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
      py: { xs: 2, md: 3 },
      px: { xs: 1, md: 6 },
    },
    tabContainer: {
      minHeight: "calc(100vh - 110px)",
      backgroundColor: grey["100"],
      py: { xs: 1, md: 2 },
      px: { xs: 1, md: 3 },
    },
  };
  return styles;
};

export default useStyles;
