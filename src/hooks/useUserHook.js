import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/users`;

const addUser = (user) => {
  return axios.post(API_URL, user);
};

const fetchUsers = () => {
  return axios.get(API_URL);
};

const editUser = (updatedUserData) => {
  const url = `${API_URL}/${updatedUserData.employeeId}`;
  console.log("editing user");
  return axios.patch(url, updatedUserData);
};
// hooks
export const useAddUser = (onSuccess, onError) => {
  const queryClient = useQueryClient();
  return useMutation(addUser, {
    onSuccess: async () => {
      queryClient.invalidateQueries("users");
    },
  });
};

export const useFetchUsers = (onSuccess, onError) => {
  return useQuery("users", fetchUsers, {
    onSuccess,
    onError,
  });
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

export const useDeleteUserByEmpId = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (employeeId) => {
      console.log(employeeId);
      const url = `${API_URL}/${employeeId}`;
      const response = await axios.delete(url);

      return response;
    },
    {
      onSuccess: async (response) => {
        queryClient.invalidateQueries("users");
        console.log(response);
        setTimeout(() => {
          alert(response.data.message);
        }, 1000);
      },
      onError: () => {
        alert("Error deleting user. Try again.");
      },
    }
  );
};
