import { useMutation } from "react-query";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/users`;

const addUser = (user) => {
  console.log(API_URL);
  return axios.post(API_URL, user);
};

export const useAddUser = () => {
  return useMutation(addUser);
};
