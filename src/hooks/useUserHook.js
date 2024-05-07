import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/users`;

// const addUser = (user) => {
//   console.log(user);
//   return axios.post(API_URL, user);
// };

const addUser = (axiosPriv, userData) => {
  // const url = `${API_URL}/register`;
  // console.log(user);
  // return axiosPriv.post(API_URL, user);
  // const response = await axiosPriv.post(url, user);
  // console.log(response?.data);
  // return response?.data;
  // try {
  //   const url = `${API_URL}/register`;
  //   console.log(userData);
  //   const response = await axiosPriv.post(url, userData);

  //   const data = response?.data;
  //   console.log(data);
  //   return data;
  // } catch (error) {
  //   throw error; // You might want to handle errors here as well
  // }
  const url = `${API_URL}/register`;
  return axiosPriv.post(url, { ...userData });
};

const editUser = (updatedUserData) => {
  const url = `${API_URL}/${updatedUserData.employeeId}`;
  console.log("editing user");
  return axios.patch(url, updatedUserData);
};
// hooks
// export const useAddUser = () => {
//   const queryClient = useQueryClient();
//   return useMutation(addUser, {
//     onSuccess: async () => {
//       queryClient.invalidateQueries("users");
//     },
//     onError: (error) => {
//       alert("error adding new user:", error);
//     },
//   });
// };

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

// export const useDeleteUserByEmpId = () => {
//   const queryClient = useQueryClient();
//   return useMutation(
//     async (employeeId) => {
//       console.log(employeeId);
//       const url = `${API_URL}/${employeeId}`;
//       const response = await axios.delete(url);

//       return response;
//     },
//     {
//       onSuccess: async (response) => {
//         queryClient.invalidateQueries("users");
//         console.log(response);
//         setTimeout(() => {
//           alert(response.data.message);
//         }, 1000);
//       },
//       onError: () => {
//         alert("Error deleting user. Try again.");
//       },
//     }
//   );
// };
