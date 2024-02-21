import { Button } from "@mui/material";
import React from "react";
import { useGlobalState } from "../context/ContextProvider";

const LoginPage = () => {
  const {
    globalState: { currentUser, isLoggedIn },
    dispatch,
  } = useGlobalState();

  const changeUser = (userName) => {
    dispatch({ type: "SET_USER", payload: userName });
  };

  return (
    <div>
      LoginPage
      <div>
        current user: <b>{currentUser}</b>
      </div>
      <div>
        <Button variant="outlined" onClick={() => changeUser("MON")}>
          MON
        </Button>
        <Button variant="outlined" onClick={() => changeUser("ROBIN")}>
          ROBIN
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
