import useAxiosPrivate from "./useAxiosPrivate";

const useRequest = () => {
  const client = useAxiosPrivate();

  const request = async (options) => {
    const onSuccess = (res) => {
      return res?.data?.data;
    };

    const onError = (err) => {
      return Promise.reject(err.response?.data);
    };

    return client(options).then(onSuccess).catch(onError);
  };

  return request;
};

export default useRequest;
