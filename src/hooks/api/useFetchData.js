import LoadingPage from "../../pages/LoadingPage";
import useApiGet from "./useApiGet";
import useErrorHandlerUnAuthReq from "./useErrorHandlerUnAuthReq";
import useSubjReq from "./useSubReq";
import useTopicReq from "./useTopicReq";

const useFetchData = () => {
  const handleUnAuthError = useErrorHandlerUnAuthReq();
  const { fetchTopics } = useTopicReq();
  const { fetchSubjects } = useSubjReq();

  const {
    data: topicsList,
    isLoading: isLoadingInTopic,
    error: isErrorInTopic,
  } = useApiGet("topics", () => fetchTopics({ params: "/trimmed" }), {
    refetchOnWindowFocus: false,
    retry: 3,
    staleTime: Infinity,
  });

  const {
    data: subjectsList,
    isLoading: isLoadingInSubject,
    error: isErrorInSubject,
  } = useApiGet("subjects", () => fetchSubjects({ params: "/trimmed" }), {
    refetchOnWindowFocus: true,
    retry: 3,
  });

  if (isLoadingInTopic || isLoadingInSubject) {
    return <LoadingPage />;
  }

  if (isErrorInTopic || isErrorInSubject) {
    const error = isErrorInTopic || isErrorInSubject;
    handleUnAuthError(error);
  }

  return { topicsList, subjectsList };
};

export default useFetchData;
