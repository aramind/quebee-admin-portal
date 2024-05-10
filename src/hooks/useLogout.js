import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthProvider";

const API_URL = `${process.env.REACT_APP_API_URL}/v1/logout`;

const useLogout = () => {
  const { setAuth } = useContext(AuthContext);

  const logout = async () => {
    setAuth({});
    try {
      const response = await axios.delete(API_URL, { withCredentials: true });
      console.log(response);
      //   if (response?.status === 204) {
      //     alert("You have been logged out!");
      //   }
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  return logout;
};

export default useLogout;
