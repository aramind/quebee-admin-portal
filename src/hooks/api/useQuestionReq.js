import constants from "../../configs/constants";
import useRequest from "./useRequest";

const QUESTION_URL = constants?.API_URL?.QUESTION;

const useQuestionReq = () => {
  const request = useRequest();

  const questionReq = {
    get: (params) =>
      request({
        url: `${QUESTION_URL}${params}`,
        method: "GET",
      }),

    add: (data) =>
      request({
        url: QUESTION_URL,
        method: "POST",
        data,
      }),

    addBulk: (data) =>
      request({
        url: `${QUESTION_URL}/bulk`,
        method: "POST",
        data,
      }),

    edit: ({ id, data }) =>
      request({
        url: `${QUESTION_URL}/${id}`,
        method: "PATCH",
        data,
      }),
    simpleUpdate: ({ id, data }) =>
      request({
        url: `${QUESTION_URL}/simpleUpdate/${id}`,
        method: "PATCH",
        data,
      }),
    getById: ({ id }) =>
      request({
        url: `${QUESTION_URL}/${id}?`,
        method: "GET",
      }),

    getTags: () =>
      request({
        url: `${QUESTION_URL}/tags`,
        method: "GET",
      }),

    getSources: () =>
      request({
        url: `${QUESTION_URL}/sources`,
        method: "GET",
      }),

    getQuestionsCount: ({ query }) =>
      request({
        url: `${QUESTION_URL}/count?${query}`,
        method: "GET",
      }),
  };

  return questionReq;
};

export default useQuestionReq;
