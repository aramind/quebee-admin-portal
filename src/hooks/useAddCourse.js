import axios from "axios";
import { useMutation } from "react-query";

const API_URL = `${process.env.REACT_APP_API_URL}/course`;

const addCourse = (course) => {
  //   console.log("executing call to add course to api");
  return axios.post(API_URL, course);
};

const onSuccess = () => {
  console.log("Course added successfully");
  return {
    message: "Course added successfully",
  };
};

const onError = () => {
  console.log("Error adding course");
  return {
    message: "Error adding course. Try again.",
  };
};

export const useAddCourse = () => {
  return useMutation(addCourse, {
    onSuccess,
    onError,
  });
};
