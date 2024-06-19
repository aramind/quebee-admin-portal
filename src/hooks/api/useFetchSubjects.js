import React from "react";
import useErrorHandlerUnAuthReq from "./useErrorHandlerUnAuthReq";
import useSubjReq from "./useSubReq";
import useApiGet from "./useApiGet";
import LoadingPage from "../../pages/LoadingPage";

const useFetchSubjects = (key, params) => {
  const handleUnAuthError = useErrorHandlerUnAuthReq();
  const { fetchSubjects } = useSubjReq();

  const {
    data: subjectsList,
    isLoading,
    error,
  } = useApiGet(key, () => fetchSubjects({ params: params }), {
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
    subjectsList,
  };
};

export default useFetchSubjects;
