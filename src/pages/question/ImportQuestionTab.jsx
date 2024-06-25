import React from "react";
import ExcelImportTool from "../../components/ExcelImportTool";
import useStyles from "../../hooks/useStyles";
import { Container } from "@mui/material";

const ImportQuestionTab = () => {
  const styles = useStyles();

  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={styles.tabContainer}
      disableGutters
    >
      <>
        <ExcelImportTool />
      </>
    </Container>
  );
};

export default ImportQuestionTab;
