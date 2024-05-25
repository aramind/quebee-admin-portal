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
    editSubject: ({ id, data }) => {
      request({
        url: `${url}/${id}`,
        method: "PATCH",
        data,
      });
    },
  };

  return subjReq;
};

export default useSubjReq;
