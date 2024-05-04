import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const REFRESH_URL = `${process.env.REACT_APP_API_URL}/auth/refresh`;
const useRefreshToken = () => {
  const { setAuth } = useContext(AuthContext);

  const refresh = async () => {
    console.log("Click refreshtoken");
    const response = await axios.get(REFRESH_URL, {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response?.data);
      console.log(response?.data?.data?.token);
      return { ...prev, accessToken: response?.data?.data?.token };
    });
    return response?.data?.data?.token;
  };
  return refresh;
};

export default useRefreshToken;
