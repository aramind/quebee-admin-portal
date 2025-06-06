import constants from "../../configs/constants";
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
    patchTopic: ({ _id, data }) =>
      request({
        url: `${url}/${_id}`,
        method: "PATCH",
        data,
      }),
    simpleUpdate: ({ id, data }) =>
      request({
        url: `${url}/simpleUpdate/${id}`,
        method: "PATCH",
        data,
      }),
  };
  return topicReq;
};

export default useTopicReq;
