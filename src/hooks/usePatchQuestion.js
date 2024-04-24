import axios from "axios";
import { useMutation } from "react-query";

const API_URL = `${process.env.REACT_APP_API_URL}/questions`;

const patchQuestion = ({ params, patchData }) => {
  console.log(`${API_URL}/${params}`);
  console.log(patchData);
  return axios.patch(`${API_URL}/${params}`, patchData);
};

export const usePatchQuestion = (onSuccess, onError) => {
  return useMutation(patchQuestion, {
    onSuccess,
    onError,
  });
};
