import constants from "../../components/configs/constants";
import useRequest from "./useRequest";

const QUESTION_URL = constants?.API_URL?.QUESTION;

const useQuestionReq = () => {
  const request = useRequest();

  const questionReq = {
    get: () =>
      request({
        url: QUESTION_URL,
        method: "GET",
      }),
  };

  return questionReq;
};

export default useQuestionReq;
