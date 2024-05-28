export const showAckNotification = ({ dispatch, success, data, ackAlert }) => {
  dispatch({
    type: "SHOW_ACK_NOTIFICATION",
    payload: {
      ...ackAlert,
      open: true,
      severity: success ? (data?.success ? "success" : "error") : "error",
      message: data?.message,
    },
  });
};
