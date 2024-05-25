import LoadingPage from "../../pages/LoadingPage";
import useApiGet from "./useApiGet";
import useErrorHandlerUnAuthReq from "./useErrorHandlerUnAuthReq";
import useQuestionReq from "./useQuestionReq";
import useSubjReq from "./useSubReq";
import useTopicReq from "./useTopicReq";

const useFetchData = () => {
  const handleUnAuthError = useErrorHandlerUnAuthReq();
  const { fetchTopics } = useTopicReq();
  const { fetchSubjects } = useSubjReq();
  const { getTags } = useQuestionReq();

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

  const {
    data: tagsList,
    isLoading: isLoadingInTags,
    error: isErrorInTags,
  } = useApiGet("tags", getTags, {
    refetchOnWindowFocus: false,
    retry: 3,
    staleTime: Infinity,
  });

  if (isLoadingInTopic || isLoadingInSubject || isLoadingInTags) {
    return <LoadingPage />;
  }

  if (isErrorInTopic || isErrorInSubject) {
    const error = isErrorInTopic || isErrorInSubject || isErrorInTags;
    handleUnAuthError(error);
  }

  return { topicsList, subjectsList, tagsList };
};

export default useFetchData;
