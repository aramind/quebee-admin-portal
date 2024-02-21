import React from "react";
import { useGlobalState } from "../context/ContextProvider";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import mockDB from "../mockDB/mockDB";
import DashBoardCard from "../components/dashBoardCard/dashBoardCard";

const DashBoardPage = () => {
  const {
    globalState: { currentUser },
  } = useGlobalState();
  return (
    <>
      <Typography variant="body1" color="initial" align="left" mx={5} my={2}>
        Hello {currentUser}! Happy {mockDB.day} of {mockDB.date}
      </Typography>
      <Stack direction="row" spacing={4} flex justifyContent="center">
        <DashBoardCard
          title="Live Questions"
          value={mockDB.numOfLiveQuestions}
        />
        <DashBoardCard
          title="Pending Questions"
          value={mockDB.numberOfPendingQuestions}
        />
        <DashBoardCard
          title="Trashed Questions"
          value={mockDB.numberOfTrashedQuestions}
        />
      </Stack>
    </>
  );
};

export default DashBoardPage;
