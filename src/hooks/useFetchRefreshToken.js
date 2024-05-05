import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const REFRESH_URL = `${process.env.REACT_APP_API_URL}/auth/refresh`;

const useFetchRefreshToken = () => {
  //   const { auth, setAuth } = useContext(AuthContext);

  //   console.log(auth);

  const refresh = async () => {
    // console.log("CLICKED REFRESH (FETCH)");

    try {
      const response = await fetch(REFRESH_URL, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await response.data;
      console.log(data);

      return data?.data?.token;
    } catch (error) {
      //   console.log("ERRROR", error);
      throw error;
    }
  };
  return refresh;
};

export default useFetchRefreshToken;
