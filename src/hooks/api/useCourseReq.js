import constants from "../../configs/constants";
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

    patch: ({ id, data }) =>
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

  return courseReq;
};

export default useCourseReq;
