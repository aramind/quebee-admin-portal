import React from "react";
import { useGlobalState } from "../context/GlobalStatesContextProvider";
import { Stack, Typography } from "@mui/material";
import mockDB from "../mockDB/mockDB";
import DashBoardCard from "../components/dashBoardCard/dashBoardCard";
import useFetchData from "../hooks/api/useFetchData";
import useApiGet from "../hooks/api/useApiGet";
import useQuestionReq from "../hooks/api/useQuestionReq";

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

  const { getQuestionsCount } = useQuestionReq();

  const { data: pendingCount } = useApiGet("pendingCount", () =>
    getQuestionsCount({ query: `status=pending` })
  );
  const { data: liveCount } = useApiGet("liveCount", () =>
    getQuestionsCount({ query: `status=live` })
  );
  const { data: deletedCount } = useApiGet("deletedCount", () =>
    getQuestionsCount({ query: `status=deleted` })
  );

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
        <DashBoardCard title="Live Questions" value={liveCount?.data} />
        <DashBoardCard title="Pending Questions" value={pendingCount?.data} />
        <DashBoardCard title="Trashed Questions" value={deletedCount?.data} />
        <DashBoardCard
          title="Total Questions"
          value={liveCount?.data + pendingCount?.data + deletedCount?.data}
        />
      </Stack>
    </>
  );
};

export default DashBoardPage;
