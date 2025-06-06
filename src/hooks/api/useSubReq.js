import constants from "../../configs/constants";
import useRequest from "./useRequest";

const url = constants?.API_URL?.SUBJECT;

const useSubjReq = () => {
  const request = useRequest();

  const subjReq = {
    fetchSubjects: ({ params }) =>
      request({
        url: `${url}${params}`,
        method: "GET",
      }),
    addSubject: ({ data }) =>
      request({
        url,
        method: "POST",
        data,
      }),
    edit: ({ id, data }) =>
      request({
        url: `${url}/${id}`,
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

  return subjReq;
};

export default useSubjReq;
