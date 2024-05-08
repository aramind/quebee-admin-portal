import constants from "../../components/configs/constants";
import useRequest from "./useRequest";

const QUESTION_URL = constants?.API_URL?.QUESTION;

const useQuestionReq = () => {
  const request = useRequest();

  const questionReq = {
    get: (params) =>
      request({
        url: `${QUESTION_URL}/${params}`,
        method: "GET",
      }),

    add: (data) =>
      request({
        url: QUESTION_URL,
        method: "POST",
        data,
      }),

    edit: ({ id, data }) =>
      request({
        url: `${QUESTION_URL}/${id}`,
        method: "PATCH",
        data,
      }),

    getById: (id) =>
      request({
        url: `${QUESTION_URL}/${id}`,
        method: "GET",
      }),
  };

  return questionReq;
};

export default useQuestionReq;
