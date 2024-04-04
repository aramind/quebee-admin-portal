import axios from "axios";
import { useMutation } from "react-query";

const API_URL = `${process.env.REACT_APP_API_URL}/courses`;

const addCourse = (course) => {
  return axios.post(API_URL, course);
};

export const useAddCourse = (onSuccess, onError) => {
  return useMutation(addCourse, {
    onSuccess,
    onError,
  });
};
