import React from "react";
import { useGlobalState } from "../context/ContextProvider";

const DashBoardPage = () => {
  const {
    globalState: { currentUser },
    dispatch,
  } = useGlobalState();
  return (
    <>
      <div>DashBoardPage</div>
      <div>Hello {currentUser}! Happy Monday!</div>
    </>
  );
};

export default DashBoardPage;
