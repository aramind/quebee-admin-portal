import React from "react";
import useErrorHandlerUnAuthReq from "./useErrorHandlerUnAuthReq";
import useApiGet from "./useApiGet";
import LoadingPage from "../../pages/LoadingPage";
import useQuestionReq from "./useQuestionReq";

const useFetchQuestions = (key, params) => {
  const handleUnAuthError = useErrorHandlerUnAuthReq();
  const { get } = useQuestionReq();

  const {
    data: questionsList,
    isLoading,
    error,
  } = useApiGet(key, () => get({ params: params }), {
    refetchOnWindowFocus: false,
    retry: 3,
    staleTime: Infinity,
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    handleUnAuthError(error);
  }

  return {
    questionsList,
  };
};

export default useFetchQuestions;
