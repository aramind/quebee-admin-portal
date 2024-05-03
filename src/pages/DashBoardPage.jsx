import React from "react";
import { useGlobalState } from "../context/ContextProvider";
import { Stack, Typography } from "@mui/material";
import mockDB from "../mockDB/mockDB";
import DashBoardCard from "../components/dashBoardCard/dashBoardCard";

const currentDate = new Date().toLocaleDateString("en-PH", {
  timeZone: "Asia/Manila",
  month: "long",
  day: "numeric",
  year: "numeric",
});

const currentDay = new Date().toLocaleString("en-PH", {
  timeZone: "Asia/Manila",
  weekday: "long",
});

const DashBoardPage = () => {
  const {
    globalState: { currentUser },
  } = useGlobalState();
  return (
    <>
      <Typography variant="body1" color="initial" align="left" mx={5} my={2}>
        Hello {currentUser?.name?.firstName}! Happy {currentDay} of{" "}
        {currentDate}
      </Typography>
      <Stack
        direction="row"
        gap={4}
        flex
        justifyContent="center"
        flexWrap="wrap"
      >
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
