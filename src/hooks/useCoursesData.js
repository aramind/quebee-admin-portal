import axios from "axios";
import { useQuery } from "react-query";

const API_URL = `${process.env.REACT_APP_API_URL}/courses`;

const fetchCourses = () => {
  return axios.get(API_URL);
};

export const useCoursesData = (onSuccess, onError) => {
  return useQuery("courses", fetchCourses, {
    onSuccess,
    onError,
  });
};
