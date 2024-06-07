import { useGlobalState } from "../../context/GlobalStatesContextProvider";
import useAxiosPrivate from "./useAxiosPrivate";

const useRequest = () => {
  const { dispatch } = useGlobalState();

  const client = useAxiosPrivate();

  const request = async (options) => {
    const onSuccess = (res) => {
      if (res?.data?.message?.length > 1) {
        dispatch({
          type: "SHOW_MINOR_ALERT",
          payload: {
            open: true,
            severity: res?.data?.success ? "success" : "error",
            message: res?.data?.message,
          },
        });
      }

      // console.log(res?.data);
      return res?.data;
      // return res;
    };

    const onError = (err) => {
      // console.log(err.response?.data);
      dispatch({
        type: "SHOW_MINOR_ALERT",
        payload: {
          open: true,
          severity: "error",
          message: err?.message,
        },
      });
      return Promise.reject(err.response?.data || err);
    };

    return client(options).then(onSuccess).catch(onError);
  };

  return request;
};

export default useRequest;
