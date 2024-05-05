import { useQuery } from "react-query";

const API_URL = `${process.env.REACT_APP_API_URL}/questions`;

const fetchQuestions = async (axiosPriv, params) => {
  try {
    const response = await axiosPriv.get(`${API_URL}${params}`);
    const data = response?.data?.data;
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const useFetchQUestions = ({
  axiosPriv,
  params,
  onSuccess,
  onError,
  staleTime,
}) => {
  return useQuery("questions", () => fetchQuestions(axiosPriv, params), {
    onSuccess,
    onError,
    staleTime,
  });
};
