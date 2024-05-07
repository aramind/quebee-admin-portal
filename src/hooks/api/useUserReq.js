import useRequest from "./useRequest";

const BASE_URL = `${process.env.REACT_APP_API_URL}/users`;

const useUserReq = () => {
  const request = useRequest();

  const user = {
    get: () =>
      request({
        url: BASE_URL,
        method: "GET",
      }),

    register: (data) => {
      request({
        url: `${BASE_URL}/register`,
        method: "POST",
        data: data,
      });
    },
  };

  return user;
};

export default useUserReq;
