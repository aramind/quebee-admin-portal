import axios from "axios";
import { useMutation } from "react-query";

const API_URL = `${process.env.REACT_APP_API_URL}/questions`;

const addQuestion = (question) => {
  return axios.post(API_URL, question);
};

export const useAddQuestion = (onSuccess, onError) => {
  return useMutation(addQuestion, {
    onSuccess,
    onError,
  });
};
