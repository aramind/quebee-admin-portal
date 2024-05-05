import { useQuery } from "react-query";

const API_URL = `${process.env.REACT_APP_API_URL}/users`;

const fetchUsers = async (axiosPriv) => {
  const response = await axiosPriv.get(API_URL);
  const data = response?.data?.data;
  return data;
};

const useFetchUsers = (axiosPriv, onSuccess, onError) => {
  return useQuery("users", () => fetchUsers(axiosPriv), {
    onSuccess,
    onError,
  });
};

export default useFetchUsers;
