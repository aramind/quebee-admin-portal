import { useGlobalState } from "../../context/GlobalStatesContextProvider";
import useAxiosPrivate from "./useAxiosPrivate";

const useRequest = () => {
  const { dispatch } = useGlobalState();

  const client = useAxiosPrivate();

  const request = async (options) => {
    const onSuccess = (res) => {
      // console.log(res?.data);
      // console.log(res?.data?.message);

      dispatch({
        type: "SHOW_MINOR_ALERT",
        payload: {
          open: true,
          severity: res?.data?.success ? "success" : "error",
          message: res?.data?.message,
        },
      });
      return res?.data?.data;
      // return res;
    };

    const onError = (err) => {
      // return Promise.reject(err.response?.data);
      // alert(err.response?.data?.message);
      dispatch({
        type: "SHOW_MINOR_ALERT",
        payload: {
          open: true,
          severity: "error",
          message: err?.message,
        },
      });
    };

    return client(options).then(onSuccess).catch(onError);
  };

  return request;
};

export default useRequest;
