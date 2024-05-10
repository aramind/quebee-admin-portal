import useAxiosPrivate from "./useAxiosPrivate";

const useRequest = () => {
  const client = useAxiosPrivate();

  const request = async (options) => {
    const onSuccess = (res) => {
      console.log(res?.data?.data);
      return res?.data?.data;
      // return res;
    };

    const onError = (err) => {
      // return Promise.reject(err.response?.data);
      // alert(err.response?.data?.message);
      console.log(err);
    };

    return client(options).then(onSuccess).catch(onError);
  };

  return request;
};

export default useRequest;
