import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/users`;

const editUser = (updatedUserData) => {
  const url = `${API_URL}/${updatedUserData.employeeId}`;
  console.log("editing user");
  return axios.patch(url, updatedUserData);
};

export const useEditUser = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(editUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      alert("User updated successfully");
    },
    onError: () => {
      alert("Error updating user. Try again");
    },
  });
};
