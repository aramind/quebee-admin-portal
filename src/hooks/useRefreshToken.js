import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const REFRESH_URL = `${process.env.REACT_APP_API_URL}/auth/refresh`;

const useRefreshToken = () => {
  const { setAuth } = useContext(AuthContext);

  const refresh = async () => {
    const response = await axios.get(REFRESH_URL, { withCredentials: true });
    const newAccessToken = response?.data?.data?.token;

    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(newAccessToken);
      return { ...prev, accessToken: newAccessToken };
    });
    return newAccessToken;
  };

  return refresh;
};

export default useRefreshToken;
