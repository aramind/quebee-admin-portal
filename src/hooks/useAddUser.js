import { useMutation } from "react-query";
import axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL;

const addUser = (user) => {
  //   console.log(API_URL);
  return axios.post("http://localhost:5000/users", user);
};

export const useAddUser = () => {
  return useMutation(addUser);
};
