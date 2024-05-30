import { useMutation, useQueryClient } from "react-query";
import { useGlobalState } from "../../context/GlobalStatesContextProvider";
import { showAckNotification } from "../../utils/showAckNotification";

const useApiSend = (fn, invalidateKey, successFn, errorFn, options) => {
  const queryClient = useQueryClient();
  const {
    globalState: { ackAlert },
    dispatch,
  } = useGlobalState();

  return useMutation({
    mutationFn: fn,
    onSuccess: (data) => {
      invalidateKey &&
        invalidateKey.forEach((key) => queryClient.invalidateQueries(key));
      successFn
        ? successFn(data)
        : showAckNotification({ dispatch, success: true, data, ackAlert });
    },
    onError: (err) =>
      errorFn
        ? errorFn(err)
        : showAckNotification({
            dispatch,
            success: false,
            data: err,
            ackAlert,
          }),
    retry: 0,
    ...options,
  });
};

export default useApiSend;
