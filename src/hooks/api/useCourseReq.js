import constants from "../../components/configs/constants";
import useRequest from "./useRequest";

const url = constants?.API_URL?.COURSE;

const useCourseReq = () => {
  const request = useRequest();

  const courseReq = {
    get: (params) =>
      request({
        url: `${url}${params}`,
        method: "GET",
      }),

    getById: ({ id, params }) =>
      request({
        url: `${url}/${id}${params}`,
        method: "GET",
      }),

    addCourse: ({ data }) =>
      request({
        url,
        method: "POST",
        data,
      }),
  };

  return courseReq;
};

export default useCourseReq;
