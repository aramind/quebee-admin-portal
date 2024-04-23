import axios from "axios";
import { useQuery } from "react-query";

const API_URL = `${process.env.REACT_APP_API_URL}/questions`;

const fetchQuestions = async (params) => {
  try {
    const response = await axios.get(`${API_URL}${params}`);
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch questions");
  }
};

export const useFetchQUestions = ({
  params,
  onSuccess,
  onError,
  staleTime,
}) => {
  return useQuery("questions", () => fetchQuestions(params), {
    onSuccess,
    onError,
    staleTime,
  });
};
