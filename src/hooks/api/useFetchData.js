import LoadingPage from "../../pages/LoadingPage";
import useApiGet from "./useApiGet";
import useErrorHandlerUnAuthReq from "./useErrorHandlerUnAuthReq";
import useTopicReq from "./useTopicReq";

const useFetchData = () => {
  const handleUnAuthError = useErrorHandlerUnAuthReq();
  const { fetchTopics } = useTopicReq();

  const {
    data: topicsList,
    isLoading,
    error,
  } = useApiGet(["topics"], () => fetchTopics({ params: "/trimmed" }), {
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

  return { topicsList };
};

export default useFetchData;
