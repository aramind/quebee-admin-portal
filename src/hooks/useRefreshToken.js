import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const REFRESH_URL = `${process.env.REACT_APP_API_URL}/v1/refresh`;

const useRefreshToken = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const refresh = async () => {
    const response = await axios.get(REFRESH_URL, { withCredentials: true });
    console.log(response?.data);
    const userInfo = response?.data?.data;
    const newAccessToken = response?.data?.data?.token;
    console.log(newAccessToken);
    console.log(userInfo);

    setAuth((prev) => {
      return { ...prev, ...userInfo, token: newAccessToken };
    });

    return newAccessToken;
  };

  console.log(auth);
  return refresh;
};

export default useRefreshToken;
