import constants from "../../configs/constants";
import useRequest from "./useRequest";

const ROOT_URL = constants?.API_URL?.ROOT;

const useRootReq = () => {
  const request = useRequest();

  const rootReq = {
    logout: () =>
      request({
        url: `${ROOT_URL}/logout`,
        method: "DELETE",
      }),
    getCounts: () =>
      request({
        url: `${ROOT_URL}/counts`,
        method: "GET",
      }),
  };
  return rootReq;
};

export default useRootReq;
