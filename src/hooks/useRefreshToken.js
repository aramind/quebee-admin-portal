import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const REFRESH_URL = `${process.env.REACT_APP_API_URL}/v1/refresh`;

const useRefreshToken = () => {
  const { setAuth } = useContext(AuthContext);

  const refresh = async () => {
    const response = await axios.get(REFRESH_URL, { withCredentials: true });
    const userInfo = response?.data?.data;
    const newAccessToken = response?.data?.data?.token;

    setAuth((prev) => {
      return { ...prev, ...userInfo, token: newAccessToken };
    });

    return newAccessToken;
  };

  return refresh;
};

export default useRefreshToken;
