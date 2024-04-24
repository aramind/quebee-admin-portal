import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const API_URL = `${process.env.REACT_APP_API_URL}/questions`;

const patchQuestion = async ({ params, patchData }) => {
  try {
    const response = await axios.patch(`${API_URL}/${params}`, patchData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const usePatchQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation(patchQuestion, {
    onSuccess: (data) => {
      queryClient.setQueryData("questions", (oldQueryData) => {
        const updatedQuestion = data.data; // Assuming data contains the updated question
        const updatedData = oldQueryData.map((question) => {
          if (question._id === updatedQuestion._id) {
            return updatedQuestion;
          }
          return question;
        });
        return updatedData;
      });
    },
    onError: (error) => {
      console.error("ERROR", error);
    },
  });
};
