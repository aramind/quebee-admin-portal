import React, { useContext } from "react";
import { useGlobalState } from "../../context/GlobalStatesContextProvider";
import { Box, Stack, Typography } from "@mui/material";

import DashBoardCard from "../../components/dashBoardCard/dashBoardCard";

import useApiGet from "../../hooks/api/useApiGet";

import { teal } from "@mui/material/colors";
import useRootReq from "../../hooks/api/useRootReq";
import { AuthContext } from "../../context/AuthProvider";

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

const RowWrapper = ({ children }) => (
  <Stack direction="row" gap={4} flex justifyContent="center" flexWrap="wrap">
    {children}
  </Stack>
);

const DashBoardPage = () => {
  const { auth } = useContext(AuthContext);
  const { getCounts } = useRootReq();

  const { data: counts } = useApiGet("counts", getCounts);

  return (
    <>
      <Typography variant="body1" color="initial" align="left" mx={5} my={2}>
        {/* Hello {currentUser?.name?.firstName}! Happy {currentDay} of{" "}
        {currentDate} */}
        {/* {auth} */}
      </Typography>

      {["questions", "courses", "subjects", "topics"].map((group, index) => (
        <>
          <Box my={2} py={1} sx={{ bgcolor: teal[50] }}>
            <Typography
              textAlign="center"
              textTransform="uppercase"
              fontSize="1.2rem"
            >
              {group.toUpperCase()}
              <Typography
                sx={{ display: "inline" }}
                fontWeight="bold"
                fontSize="inherit"
                pl={2}
              >
                (
                {counts &&
                  Object.values(counts?.data?.[group]).reduce(
                    (total, count) => total + count,
                    0
                  )}
                )
              </Typography>
            </Typography>
          </Box>
          <RowWrapper>
            {["live", "pending", "deleted"].map((status, index) => (
              <DashBoardCard
                title={status.toUpperCase()}
                value={counts?.data?.[group]?.[status] || 0}
              />
            ))}
          </RowWrapper>
        </>
      ))}
      <br />
    </>
  );
};

export default DashBoardPage;
