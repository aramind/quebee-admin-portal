import LoadingPage from "../../pages/LoadingPage";
import useApiGet from "./useApiGet";
import useCourseReq from "./useCourseReq";
import useErrorHandlerUnAuthReq from "./useErrorHandlerUnAuthReq";
import useQuestionReq from "./useQuestionReq";
import useSubjReq from "./useSubReq";
import useTopicReq from "./useTopicReq";
import useUserReq from "./useUserReq";

const useFetchData = () => {
  const handleUnAuthError = useErrorHandlerUnAuthReq();
  const { fetchTopics } = useTopicReq();
  const { fetchSubjects } = useSubjReq();
  const { getTags, getSources, get: getQ } = useQuestionReq();
  const { get } = useCourseReq();
  const { get: fetchUsers } = useUserReq();

  const {
    data: coursesList,
    isLoading: isLoadingInCourse,
    error: isErrorInCourse,
  } = useApiGet("courses", () => get("/trimmed"), {
    refetchOnWindowFocus: true,
    retry: 3,
  });

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
    data: questionsList,
    isLoading: isLoadingInQuestions,
    error: isErrorInQuestions,
  } = useApiGet("questions", () => getQ("/trimmed"), {
    retry: 3,
  });

  const {
    data: sourcesList,
    isLoading: isLoadingInSources,
    error: isErrorInSources,
  } = useApiGet("sources", getSources, {
    refetchOnWindowFocus: true,
    retry: 3,
    staleTime: Infinity,
  });

  const {
    data: tagsList,
    isLoading: isLoadingInTags,
    error: isErrorInTags,
  } = useApiGet("tags", getTags, {
    refetchOnWindowFocus: true,
    retry: 3,
    staleTime: Infinity,
  });

  const {
    data: usersList,
    isLoading: isLoadingInUsers,
    error: isErrorInUsers,
    refetch: refetchUsers,
  } = useApiGet("users", fetchUsers, {
    refetchOnWindowFocus: true,
    retry: 3,
  });

  // const {
  //   data: questionsCount,
  //   isLoading: isLoadingInCount,
  //   error: isErrorInCount,
  // } = useApiGet("questionsCount", (query) => getQuestionsCount({ query }), {
  //   refetchOnWindowFocus: true,
  //   retry: 3,
  // });

  if (
    isLoadingInCourse ||
    isLoadingInTopic ||
    isLoadingInSubject ||
    isLoadingInQuestions ||
    isLoadingInTags ||
    isLoadingInSources ||
    isLoadingInUsers
  ) {
    return <LoadingPage />;
  }

  if (
    isErrorInCourse ||
    isErrorInTopic ||
    isErrorInSubject ||
    isErrorInQuestions ||
    isErrorInTags ||
    isErrorInSources ||
    isErrorInUsers
  ) {
    const error =
      isErrorInCourse ||
      isErrorInTopic ||
      isErrorInSubject ||
      isErrorInQuestions ||
      isErrorInTags ||
      isErrorInSources ||
      isErrorInUsers;
    handleUnAuthError(error);
  }

  return {
    coursesList,
    topicsList,
    subjectsList,
    questionsList,
    sourcesList,
    tagsList,
    usersList,
    refetchUsers,
  };
};

export default useFetchData;
