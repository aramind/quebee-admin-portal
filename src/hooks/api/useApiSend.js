import { useMutation, useQueryClient } from "react-query";

const useApiSend = (fn, successFn, errorFn, invalidateKey, options) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fn,
    onSuccess: (data) => {
      invalidateKey &&
        invalidateKey.forEach((key) => queryClient.invalidateQueries(key));
      successFn && successFn(data);
    },
    onError: (err) => errorFn(err),
    retry: 0,
    ...options,
  });
};

export default useApiSend;
