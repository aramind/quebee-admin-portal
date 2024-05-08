import constants from "../../components/configs/constants";
import useRequest from "./useRequest";

const COURSE_URL = constants?.API_URL?.COURSE;

const useCourseReq = () => {
  const request = useRequest();

  const courseReq = {
    get: (params) =>
      request({
        url: `${COURSE_URL}${params}`,
        method: "GET",
      }),
  };

  return courseReq;
};

export default useCourseReq;
