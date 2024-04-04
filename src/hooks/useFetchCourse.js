import axios from "axios";
import { useQuery } from "react-query";

const API_URL = `${process.env.REACT_APP_API_URL}/courses`;

const fetchCourses = async (reqParams) => {
  //   console.log(`${API_URL}${reqParams}`);
  try {
    const response = await axios.get(`${API_URL}${reqParams}`);
    console.log(response.data.data);
    return response.data.data; // Return the data from the response
  } catch (error) {
    throw new Error("Failed to fetch courses");
  }
};

export const useFetchCourse = (reqParams, onSuccess, onError) => {
  return useQuery("courses", fetchCourses(reqParams), {
    onSuccess,
    onError,
  });
};
