import constants from "../../components/configs/constants";
import useRequest from "./useRequest";

const USER_URL = constants?.API_URL?.USER;

const useUserReq = () => {
  const request = useRequest();

  const userReq = {
    get: () =>
      request({
        url: USER_URL,
        method: "GET",
      }),

    register: (data) => {
      request({
        url: `${USER_URL}/register`,
        method: "POST",
        data: data,
      });
    },

    deleteById: (id) => {
      request({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      });
    },

    edit: (data) => {
      request({
        url: `${USER_URL}/${data?.employeeId}`,
        method: "PATCH",
        data,
      });
    },
  };

  return userReq;
};

export default useUserReq;
