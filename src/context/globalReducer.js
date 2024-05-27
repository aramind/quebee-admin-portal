const globalReducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };

    case "SHOW_MINOR_ALERT":
      return {
        ...state,
        alert: action.payload,
      };

    default:
      throw new Error("No matched action");
  }
};

export default globalReducer;
