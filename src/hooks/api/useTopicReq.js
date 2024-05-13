import constants from "../../components/configs/constants";
import useRequest from "./useRequest";

const url = constants?.API_URL?.TOPIC;

const useTopicReq = () => {
  const request = useRequest();

  const topicReq = {
    fetchTopics: ({ params }) =>
      request({
        url: `${url}${params}`,
        method: "GET",
      }),
    add: ({ data }) =>
      request({
        url,
        method: "POST",
        data,
      }),
  };
  return topicReq;
};

export default useTopicReq;
