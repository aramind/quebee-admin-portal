import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";
import { useGlobalState } from "../context/GlobalStatesContextProvider";
import { showAckNotification } from "../utils/showAckNotification";

const API_URL = `${process.env.REACT_APP_API_URL}/v1/logout`;

const useLogout = () => {
  const {
    globalState: { ackAlert },
    dispatch,
  } = useGlobalState();

  const { setAuth } = useContext(AuthContext);

  const logout = async () => {
    console.log("Calling log out");
    setAuth({});
    try {
      const response = await axios.delete(API_URL, { withCredentials: true });
      console.log(response);
      if (response?.status === 204) {
        showAckNotification({
          dispatch,
          success: true,
          data: { success: true, message: "Logging out successful." },
          ackAlert,
        });
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  return logout;
};

export default useLogout;
