import { useMutation, useQuery } from "react-query";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/users`;

const addUser = (user) => {
  console.log(API_URL);
  return axios.post(API_URL, user);
};

const fetchUsers = () => {
  return axios.get(API_URL);
};

const editUser = (updatedUserData) => {
  const url = `${API_URL}/${updatedUserData.employeeId}`;
  return axios.patch(url, updatedUserData);
};
// hooks
export const useAddUser = () => {
  return useMutation(addUser);
};

export const useFetchUsers = (onSuccess, onError) => {
  return useQuery("users", fetchUsers, {
    onSuccess,
    onError,
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
  });
};

export const useEditUser = (onSuccess, onError) => {
  return useMutation(editUser);
};
